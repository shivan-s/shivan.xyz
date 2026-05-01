import { m } from '$i18n/messages';
import { config } from '$lib/config';
import { fetchPostsGroupByYear } from '$lib/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const posts = fetchPostsGroupByYear();
	return {
		posts,
		pageTitle: `${m.posts()} · ${config.title}`
	};
};
