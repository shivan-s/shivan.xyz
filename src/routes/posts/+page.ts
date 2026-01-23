import { m } from '$i18n/messages';
import { fetchPostsGroupByYear } from '$lib/posts';
import { config } from '$lib/config';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const posts = await fetchPostsGroupByYear();
	return {
		posts,
		pageTitle: `${m.posts()} · ${config.title}`
	};
};
