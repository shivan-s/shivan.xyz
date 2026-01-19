import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import { PostSchema } from './schemas';

// NOTE: needs to be a string and start with `../` See: {@link https://vite.dev/guide/features#glob-import}
const paths = import.meta.glob('../../content/posts/**/index.md', { eager: true });

/**
 * Fetch all posts
 */
export async function fetchAllPost() {
	const posts = Object.entries(paths)
		.map(([path, file]) => {
			const result = PostSchema.safeParse(file);
			if (result.success === false) {
				console.error(`Path error: ${path}`);
				console.error(result.error);
				error(500);
			}
			const slug = path.split('/').at(-2)!;
			return { slug, ...result.data };
		})
		.filter(({ metadata: { draft } }) => draft === false || dev)
		.toSorted(
			(a, b) => Date.parse(b.metadata.date.toString()) - Date.parse(a.metadata.date.toString())
		);
	return posts;
}

/**
 * Fetch post - good for a single view
 */
export async function fetchPost(slug: string) {
	const posts = await fetchAllPost();
	const post = posts.find((p) => p.slug === slug);
	if (post === undefined || (post.metadata.draft === true && !dev)) error(404);
	return post;
}

export type PostsGroupByYear = Awaited<ReturnType<typeof fetchPostsGroupByYear>>;
/**
 * Fetch posts in a groupby for year - good for a list view
 */
export async function fetchPostsGroupByYear() {
	const posts = await fetchAllPost();
	const postsGroupByYear = Object.groupBy(posts, ({ metadata }) => metadata.date.getFullYear());
	return postsGroupByYear;
}
