import { getCollection, type CollectionEntry } from 'astro:content';

// Largest value first, the order the hero's stat cards show them in
export async function getAccomplishments(): Promise<
    CollectionEntry<'accomplishments'>[]
> {
    return (await getCollection('accomplishments')).sort(
        (a, b) => b.data.value - a.data.value
    );
}

// 1200 and '+' → "1,200+"
export function formatAccomplishment(value: number, suffix?: string) {
    return `${value.toLocaleString('en-GB')}${suffix ?? ''}`;
}
