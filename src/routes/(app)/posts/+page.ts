import { m } from '#lib';
import { config } from '#lib/config.ts';
import { fetchPostsGroupByYear } from '#lib/posts.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const posts = fetchPostsGroupByYear();
	return {
		posts,
		pageTitle: `${m.posts()} · ${config.title}`
	};
};
