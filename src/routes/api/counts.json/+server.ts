import { fetchAllGalleries } from '#lib/gallery.ts';
import { fetchAllPost } from '#lib/posts.ts';
import { fetchAllPresentations } from '#lib/presentations.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const [posts, presentations, gallaries] = await Promise.all([
		fetchAllPost(),
		fetchAllPresentations(),
		fetchAllGalleries()
	]);
	return Response.json({
		totalPosts: posts.length,
		totalPresentations: presentations.length,
		totalGalleries: gallaries.length
	});
};
