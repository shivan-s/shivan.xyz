import { feed } from '$lib/feed';

export async function GET() {
	return new Response(feed.rss2(), {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
}
