import { feed } from '$lib/feed';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	return new Response(feed(), {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
};
