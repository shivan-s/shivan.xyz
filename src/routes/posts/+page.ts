import { fetchPostsGroupByYear } from '$lib/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const posts = await fetchPostsGroupByYear();
	return {
		posts
	};
};
