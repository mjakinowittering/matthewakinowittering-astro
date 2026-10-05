import { getCollection } from 'astro:content';

// The dateFrom of the one event marked `careerStart`, the start of every
// "years in product" figure. Throws on none or several, so a missing or
// doubled flag fails the build rather than showing a wrong number.
export async function getCareerStart(): Promise<Date> {
    const starts = await getCollection(
        'events',
        ({ data }) => data.careerStart
    );

    if (starts.length !== 1) {
        throw new Error(
            `Exactly one event must set careerStart: true; found ${starts.length}`
        );
    }

    return starts[0].data.dateFrom;
}
