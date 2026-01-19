import { config } from '$lib/config';
import { Feed } from 'feed';
import { fetchAllPost } from './posts';

export const feed = new Feed({
	title: config.title,
	description: config.description,
	id: config.url,
	link: config.url,
	image: `${config.url}/shivan.png`,
	favicon: `${config.url}/favicon.ico`,
	feedLinks: {
		json: `${config.url}/json`,
		atom: `${config.url}/atom`
	},
	author: {
		name: config.author.name,
		email: config.author.email,
		link: config.url
	}
});

const posts = await fetchAllPost();
posts.forEach(({ slug, metadata }) => {
	feed.addItem({
		title: metadata.title,
		id: `${config.url}/posts/${slug}`,
		link: `${config.url}/posts/${slug}`,
		description: metadata.summary,
		// content,
		author: [
			{
				name: config.author.name,
				email: config.author.email,
				link: config.url
			}
		],
		date: metadata.date
		// image: metadata.cover?.image
	});
});
