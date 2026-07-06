import { getCollection, type CollectionEntry } from "astro:content";

export const allPages = await getCollection('docs');

/** Paths for all of our Markdown content we want to generate OG images for. */
const paths = process.env.SKIP_OG ? [] : allPages;

/** An object mapping file paths to file metadata. */
export const pages = Object.fromEntries(
    paths.map(
        ({ filePath, id, data }) =>
            [filePath, { data, id }] as [string, Pick<CollectionEntry<'docs'>, 'data' | 'id'>]
    )
);