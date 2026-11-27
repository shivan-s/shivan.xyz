/**
 * @module RSS v2.0 Feed
 *  NOTE: A builder is useful for escaping XML invalid characters like &
 */
import XMLBuilder, { type XmlBuilderOptions } from 'fast-xml-builder';
import { config, fetchAllPost } from '#lib';

const posts = fetchAllPost();
const opts: XmlBuilderOptions = {
	ignoreAttributes: false
};
const builder = new XMLBuilder(opts);

const item = posts.map(({ slug, metadata }) => ({
	title: metadata.title,
	description: metadata.summary,
	link: `${config.url}/posts/${slug}`,
	pubDate: metadata.date.toUTCString(),
	author: `${config.author.email} (${config.author.name})`,
	guid: `${config.url}/posts/${slug}`
}));

export const feed = () =>
	builder.build({
		rss: {
			'@_xmlns:atom': 'http://www.w3.org/2005/Atom',
			'@_version': '2.0',
			channel: {
				'atom:link': {
					'@_href': `${config.url}/feed.xml`,
					'@_rel': 'self',
					'@_type': 'application/rss+xml'
				},
				title: config.title,
				description: config.description,
				link: config.url,
				image: {
					url: `${config.url}/shivan.png`,
					title: 'Portrait of a man holding a microphone in a blue suit and tie',
					link: config.url
				},
				lastBuildDate: new Date().toUTCString(),
				webMaster: `${config.author.email} (${config.author.name})`,
				language: config.language,
				item
			}
		}
	});
