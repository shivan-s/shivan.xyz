import { fetchPostsGroupByYear } from '$lib/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const posts = await fetchPostsGroupByYear(fetch);
	return {
		posts
	};
};
