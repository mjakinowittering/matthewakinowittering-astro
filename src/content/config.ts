// Import utilities from `astro:content`
import { defineCollection, reference, z } from 'astro:content'

// Define a `type` and `schema` for each collection
const events = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        organisationId: z.string(reference('organisation')),
        type: z.enum(['education', 'employment', 'training']),
        uri: z.string().url().nullish(),
        date: z
            .string()
            .datetime({ offset: true })
            .transform((str) => new Date(str))
            .nullish(),
        dateFrom: z
            .string()
            .datetime({ offset: true })
            .transform((str) => new Date(str))
            .nullish(),
        dateTo: z
            .string()
            .datetime({ offset: true })
            .transform((str) => new Date(str))
            .nullish()
    })
})

const organisations = defineCollection({
    type: 'data',
    schema: z.object({
        id: z.string(),
        name: z.string(),
        type: z.enum(['employer', 'trainer', 'university']),
        uri: z.string(),
        dateFrom: z
            .string()
            .datetime({ offset: true })
            .transform((str) => new Date(str)),
        dateTo: z
            .string()
            .datetime({ offset: true })
            .transform((str) => new Date(str))
            .nullish()
    })
})

const skills = defineCollection({
    type: 'content',
    schema: ({ image }) =>
        z.object({
            index: z.number(),
            title: z.string(),
            img: z.object({
                src: image(),
                alt: z.string()
            })
        })
})

// Export a single `collections` object to register your collection(s)
export const collections = {
    events,
    organisations,
    skills
}
