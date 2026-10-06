// Screenshots the built site and compares it with the approved mock-ups in
// docs/design/reference/. Run through `npm run compare`, which builds first.
// Writes, per page and width, into .compare/:
//   <name>.png       the build, full page
//   <name>-side.png  reference | build | diff, side by side
//   <name>-diff.png  the pixelmatch diff on its own
// and the same three for each section, cropped from both pages by the section's
// box (measured from the reference .html, which renders the board exactly), so
// a shift in one section doesn't show as a diff in every section below it.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import pixelmatch from 'pixelmatch';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';

const port = 4329;
const origin = `http://127.0.0.1:${port}`;
const out = '.compare';
const reference = 'docs/design/reference';

// The reference boards are 900px tall at the viewport, so screenshots are too
const viewportHeight = 900;

const widths = { phone: 390, tablet: 1024, desktop: 1280 };

// Each section runs from its element's top to the next one's, and the last to
// the page's end; the header is just its own box. Selectors: [reference, build]
const pages = [
    {
        name: 'home',
        path: '/',
        sections: {
            header: ['header', 'header'],
            hero: ['#top', '#top'],
            projects: ['#projects', '#projects'],
            'how-i-work': ['#how', '#how-i-work'],
            career: ['#career', '#career'],
            learning: ['#learning', '#learning'],
            contact: ['section:last-of-type', '#contact']
        }
    },
    {
        name: '404',
        path: '/404',
        sections: { header: ['header', 'header'], main: ['main', 'main'] }
    }
];

// The mock freezes the progress bar at 35% (an intended difference, see the
// reference README); freeze the build's there too so it doesn't show in diffs
const freeze = `.scroll-progress { animation: none !important; transform: scaleX(0.35) !important; }`;

async function startServer() {
    const server = spawn(
        'npx',
        ['astro', 'preview', '--port', String(port), '--host', '127.0.0.1'],
        { stdio: 'ignore' }
    );
    for (let tries = 0; tries < 100; tries++) {
        try {
            if ((await fetch(origin)).ok) return server;
        } catch {
            // not listening yet
        }
        await new Promise((resolve) => setTimeout(resolve, 200));
    }
    server.kill();
    throw new Error(`astro preview did not start on ${origin}`);
}

async function screenshot(browser, url, width, selectors) {
    const page = await browser.newPage({
        viewport: { width, height: viewportHeight }
    });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: freeze });
    await page.evaluate(async () => {
        await document.fonts.ready;
        // Scroll every lazy image into view, then wait for each to decode
        for (let y = 0; y < document.body.scrollHeight; y += innerHeight) {
            scrollTo(0, y);
            await new Promise((resolve) => setTimeout(resolve, 50));
        }
        scrollTo(0, 0);
        await Promise.all(
            [...document.images].map((img) => img.decode().catch(() => {}))
        );
    });
    const png = PNG.sync.read(await page.screenshot({ fullPage: true }));
    const boxes = await page.evaluate((selectors) => {
        const tops = selectors.map((selector) => {
            const box = document
                .querySelector(selector)
                .getBoundingClientRect();
            return { top: box.top + scrollY, bottom: box.bottom + scrollY };
        });
        return tops.map(({ top, bottom }, i) => ({
            top: Math.round(top),
            bottom: Math.round(
                i === 0
                    ? bottom
                    : (tops[i + 1]?.top ??
                          document.documentElement.scrollHeight)
            )
        }));
    }, selectors);
    await page.close();
    return { png, boxes };
}

function crop(png, top, bottom) {
    const height = Math.max(1, Math.min(bottom, png.height) - top);
    const part = new PNG({ width: png.width, height });
    PNG.bitblt(png, part, 0, top, png.width, height, 0, 0);
    return part;
}

// Pads a pair to the same size with magenta, so a size difference shows as a
// diff, and counts the pixels that differ
function match(ref, build) {
    const w = Math.max(ref.width, build.width);
    const h = Math.max(ref.height, build.height);
    const magenta = [255, 0, 255, 255];
    const a = pad(ref, w, h, magenta);
    const b = pad(build, w, h, magenta);
    const diff = new PNG({ width: w, height: h });
    const mismatched = pixelmatch(a.data, b.data, diff.data, w, h, {
        threshold: 0.1
    });
    return { a, b, diff, w, h, mismatched };
}

// Writes the side-by-side and diff images for one pair; returns its row.
// `html` is the reference .html rendered here: the exported .png carries the
// exporting machine's text antialiasing, a floor of about 1% on every line of
// text, so `vsHtml` is the cleaner measure of what is really different.
async function compare(label, ref, build, html) {
    const { a, b, diff, w, h, mismatched } = match(ref, build);
    const vsHtml = match(html, build).mismatched;
    await writeFile(`${out}/${label}-diff.png`, PNG.sync.write(diff));
    await writeFile(
        `${out}/${label}-side.png`,
        PNG.sync.write(sideBySide([a, b, diff], 24))
    );
    return {
        label,
        reference: `${ref.width}×${ref.height}`,
        build: `${build.width}×${build.height}`,
        mismatched,
        percent: ((100 * mismatched) / (w * h)).toFixed(2),
        vsHtml: ((100 * vsHtml) / (w * h)).toFixed(2)
    };
}

// Copies an image onto a larger canvas filled with `fill`, top left
function pad(png, width, height, fill) {
    const canvas = new PNG({ width, height });
    for (let i = 0; i < canvas.data.length; i += 4) {
        canvas.data.set(fill, i);
    }
    PNG.bitblt(png, canvas, 0, 0, png.width, png.height, 0, 0);
    return canvas;
}

function sideBySide(images, gap) {
    const width =
        images.reduce((sum, img) => sum + img.width, 0) +
        gap * (images.length - 1);
    const height = Math.max(...images.map((img) => img.height));
    const canvas = pad(
        new PNG({ width: 1, height: 1 }),
        width,
        height,
        [128, 128, 128, 255]
    );
    let x = 0;
    for (const img of images) {
        PNG.bitblt(img, canvas, 0, 0, img.width, img.height, x, 0);
        x += img.width + gap;
    }
    return canvas;
}

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

const server = await startServer();
const browser = await chromium.launch();
const rows = [];

try {
    for (const { name, path, sections } of pages) {
        const names = Object.keys(sections);
        const refSelectors = names.map((section) => sections[section][0]);
        const buildSelectors = names.map((section) => sections[section][1]);
        for (const [size, width] of Object.entries(widths)) {
            const label = `${name}-${size}`;
            const build = await screenshot(
                browser,
                origin + path,
                width,
                buildSelectors
            );
            await writeFile(`${out}/${label}.png`, PNG.sync.write(build.png));

            const refHtml = `${process.cwd()}/${reference}/${label}.html`;
            if (!existsSync(refHtml)) {
                rows.push({ label, note: 'no reference board' });
                continue;
            }
            const ref = await screenshot(
                browser,
                `file://${refHtml}`,
                width,
                refSelectors
            );
            // The exported .png is the board; the .html is only measured
            const refPng = PNG.sync.read(
                await readFile(`${reference}/${label}.png`)
            );
            rows.push(await compare(label, refPng, build.png, ref.png));
            for (const [i, section] of names.entries()) {
                const r = ref.boxes[i];
                const b = build.boxes[i];
                rows.push(
                    await compare(
                        `${label}-${section}`,
                        crop(refPng, r.top, r.bottom),
                        crop(build.png, b.top, b.bottom),
                        crop(ref.png, r.top, r.bottom)
                    )
                );
            }
        }
    }
} finally {
    await browser.close();
    server.kill();
}

console.table(rows);
await writeFile(`${out}/report.json`, JSON.stringify(rows, null, 4));
