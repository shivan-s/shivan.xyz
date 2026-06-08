import { fetchAllGalleries } from '$lib/gallery';
import { fetchAllPost } from '$lib/posts';
import { fetchAllPresentations } from '$lib/presentations';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const [posts, presentations, gallaries] = await Promise.all([
		fetchAllPost(),
		fetchAllPresentations(),
		fetchAllGalleries()
	]);
	return json({
		totalPosts: posts.length,
		totalPresentations: presentations.length,
		totalGalleries: gallaries.length
	});
};
