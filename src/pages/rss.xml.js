import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from '../consts';

export async function GET(context) {
    const [articles, contes, tutos, reflexions] = await Promise.all([
        getCollection('articles', ({ data }) => !data.draft),
        getCollection('contes', ({ data }) => !data.draft),
        getCollection('tutos', ({ data }) => !data.draft),
        getCollection('reflexions', ({ data }) => !data.draft),
    ]);

    // On agrège et trie par date
    const allItems = [
        ...articles.map(i => ({ ...i, section: 'articles' })),
        ...contes.map(i => ({ ...i, section: 'contes' })),
        ...tutos.map(i => ({ ...i, section: 'tutos' })),
        ...reflexions.map(i => ({ ...i, section: 'reflexions' })),
    ].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site ?? SITE_URL,
        items: allItems.map(item => ({
            title: item.data.title,
            description: item.data.description,
            pubDate: item.data.pubDate,
            link: `/${item.section}/${item.id}`,
        })),
    });
}