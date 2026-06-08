/**
 * @module RSS v2.0 Feed
 */
import { config } from '$lib/config';
import { fetchAllPost } from './posts';
import XMLBuilder from 'fast-xml-builder';

const posts = fetchAllPost();
const builder = new XMLBuilder();
const xml = (s: readonly string[], ...v: unknown[]) => String.raw({ raw: s }, ...v);

const items = posts.map(({ slug, metadata }) => ({
	title: metadata.title,
	description: metadata.summary,
	link: `${config.url}/posts/${slug}`,
	pubDate: metadata.date.toUTCString(),
	author: {
		name: config.author.name,
		email: config.author.email,
		link: config.url
	}
}));

const content = builder.build({
	channel: {
		title: config.title,
		description: config.description,
		link: config.url,
		image: `${config.url}/shivan.png`,
		favicon: `${config.url}/favicon.ico`,
		lastBuildDate: new Date().toUTCString(),
		webMaster: config.author.email,
		language: config.language
	},
	items
});

export const feed = () => xml`<rss version="2.0">
${content}
</rss>`;
