import { dev } from '$app/environment';
import { resolve } from '$app/paths';
import { PostWithSlugSchema } from '$lib/schemas';
import { error } from '@sveltejs/kit';

async function fetchAllPost(f: typeof fetch) {
	const response = await f(resolve('/api/posts'));
	const json = await response.json();
	const result = PostWithSlugSchema.array().safeParse(json);
	if (result.success === false) {
		console.error(result.error);
		error(500);
	}
	return result.data;
}

/**
 * Fetch post - good for a single view
 */
export async function fetchPost(slug: string, f: typeof fetch) {
	const posts = await fetchAllPost(f);
	const post = posts.find((p) => p.slug === slug);
	if (post === undefined || (post.metadata.draft === true && !dev)) error(404);
	return post;
}

export type PostsGroupByYear = Awaited<ReturnType<typeof fetchPostsGroupByYear>>;
/**
 * Fetch posts in a groupby for year - good for a list view
 */
export async function fetchPostsGroupByYear(f: typeof fetch) {
	const posts = await fetchAllPost(f);
	const postsGroupByYear = Object.groupBy(posts, ({ metadata }) => metadata.date.getFullYear());
	return postsGroupByYear;
}
