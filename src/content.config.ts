// 1. Import utilities from `astro:content`
import { defineCollection, reference } from 'astro:content';

// 2. Import loader(s)
import { glob } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// Define a `type` and `schema` for each collection
const blurbs = defineCollection({
    loader: glob({ base: './src/content/blurbs', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        title: z.string(),
        subtitle: z.string().optional()
    })
});

const events = defineCollection({
    loader: glob({ base: './src/content/events', pattern: '**/*.json' }),
    schema: z.object({
        title: z.string(),
        organisationId: reference('organisations'),
        type: z.enum(['education', 'employment', 'training']),
        uri: z.url().nullable().optional(),
        dateFrom: z.iso.datetime({ offset: true }).transform((str) => new Date(str)),
        dateTo: z.iso
            .datetime({ offset: true })
            .transform((str) => new Date(str))
            .nullish()
    })
});

const organisations = defineCollection({
    loader: glob({ base: './src/content/organisations', pattern: '**/*.json' }),
    schema: z.object({
        id: z.string(),
        name: z.string(),
        type: z.enum(['employer', 'trainer', 'university']),
        uri: z.string(),
        dateFrom: z.iso
            .datetime({ offset: true })
            .transform((str) => new Date(str))
            .nullish(),
        dateTo: z.iso
            .datetime({ offset: true })
            .transform((str) => new Date(str))
            .nullish(),
        events: z.number().nullish()
    })
});

const skills = defineCollection({
    loader: glob({ base: './src/content/skills', pattern: '**/*.{md,mdx}' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            img: image(),
            alt: z.string(),
            index: z.number()
        })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
    blurbs,
    events,
    organisations,
    skills
};
