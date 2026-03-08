import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = ({ image }: any) =>
    z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: image().optional(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().default(false),
    });

export const collections = {
    articles: defineCollection({
        loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
        schema: baseSchema,
    }),
    tutos: defineCollection({
        loader: glob({ base: './src/content/tutos', pattern: '**/*.{md,mdx}' }),
        schema: baseSchema,
    }),
    contes: defineCollection({
        loader: glob({ base: './src/content/contes', pattern: '**/*.{md,mdx}' }),
        schema: ({ image }) => baseSchema({ image }).extend({
            // Les contes ont un champ en plus
            univers: z.string().optional(), // ex: "fantastique", "fable", "sci-fi"
        }),
    }),
    reflexions: defineCollection({
        loader: glob({ base: './src/content/reflexions', pattern: '**/*.{md,mdx}' }),
        schema: ({ image }) => baseSchema({ image }).extend({
            // Réflexions courtes, pas forcément d'image
            humeur: z.string().optional(), // ex: "pensif", "enthousiaste"...
        }),
    }),
};