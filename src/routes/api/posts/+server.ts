import { PostSchema } from '$lib/schemas';
import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';

// NOTE: needs to be a string and start with `../` See: {@link https://vite.dev/guide/features#glob-import}
const paths = import.meta.glob('../../../../content/posts/**/index.md', { eager: true });

async function getPosts() {
	const posts = Object.entries(paths)
		.map(([path, file]) => {
			const result = PostSchema.safeParse(file);
			if (result.success === false) {
				console.error(`Path error: ${path}`);
				console.error(result.error);
				error(500);
			}
			const slug = path.split('/').at(-2);
			return { slug, ...result.data };
		})
		.filter(({ metadata: { draft } }) => draft === false || dev)
		.toSorted(
			(a, b) => Date.parse(b.metadata.date.toString()) - Date.parse(a.metadata.date.toString())
		);
	return posts;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
