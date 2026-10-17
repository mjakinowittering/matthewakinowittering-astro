// Rebuilds the favicon files in public/ from the two drawings. Run through
// `npm run favicons` after changing either drawing, and commit what it writes.
//
// - public/favicon.svg is the 16-unit drawing, made for a 16px browser tab:
//   whole-pixel edges and a 1px shadow. It is a source and an output at once.
// - src/assets/favicon-64.svg is the 64-unit drawing, for 48px and up.
//
// Writes:
//   public/favicon.ico           16 and 32 from the 16-unit drawing, 48 from
//                                the 64-unit drawing
//   public/favicon-32.png        32 from the 16-unit drawing
//   public/apple-touch-icon.png  180, the 64-unit drawing at 80% of the
//                                canvas, centred on the page's base colour, so
//                                iOS's rounded mask never clips the outline
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const small = await readFile('public/favicon.svg');
const large = await readFile('src/assets/favicon-64.svg');

// The page's base colour (base in src/styles/global.css), hard-coded here
// because the icons are image files with no CSS
const base = '#f8f5ef';

// Render an SVG straight at the target size, rather than scaling a bitmap, so
// whole-unit edges in the drawing land on whole pixels
async function render(svg, units, size) {
    return sharp(svg, { density: (72 * size) / units })
        .resize(size, size)
        .png()
        .toBuffer();
}

// An ICO file holding PNG images, which every current browser reads
function ico(images) {
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0); // reserved
    header.writeUInt16LE(1, 2); // 1 = icon
    header.writeUInt16LE(images.length, 4);

    const entries = [];
    let offset = 6 + 16 * images.length;
    for (const { size, data } of images) {
        const entry = Buffer.alloc(16);
        entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
        entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
        entry.writeUInt8(0, 2); // no palette
        entry.writeUInt8(0, 3); // reserved
        entry.writeUInt16LE(1, 4); // colour planes
        entry.writeUInt16LE(32, 6); // bits per pixel
        entry.writeUInt32LE(data.length, 8);
        entry.writeUInt32LE(offset, 12);
        entries.push(entry);
        offset += data.length;
    }
    return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const png16 = await render(small, 16, 16);
const png32 = await render(small, 16, 32);
const png48 = await render(large, 64, 48);

await writeFile(
    'public/favicon.ico',
    ico([
        { size: 16, data: png16 },
        { size: 32, data: png32 },
        { size: 48, data: png48 }
    ])
);
await writeFile('public/favicon-32.png', png32);

const appleSize = 180;
const appleIcon = Math.round(appleSize * 0.8);
const appleInset = Math.round((appleSize - appleIcon) / 2);
await writeFile(
    'public/apple-touch-icon.png',
    await sharp({
        create: {
            width: appleSize,
            height: appleSize,
            channels: 4,
            background: base
        }
    })
        .composite([
            {
                input: await render(large, 64, appleIcon),
                left: appleInset,
                top: appleInset
            }
        ])
        .flatten({ background: base })
        .png()
        .toBuffer()
);

console.log(
    'Wrote public/favicon.ico, public/favicon-32.png and public/apple-touch-icon.png'
);
