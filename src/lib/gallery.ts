import { dev } from '$app/environment';
import { GallerySchema } from './schemas';
import { error } from '@sveltejs/kit';

// NOTE: needs to be a string and start with `../` See: {@link https://vite.dev/guide/features#glob-import}
const paths = import.meta.glob('../../content/gallery/**/index.md', { eager: true });

/**
 * Fetch all galleries
 */
export function fetchAllGalleries() {
	const posts = Object.entries(paths)
		.map(([path, file]) => {
			const result = GallerySchema.safeParse(file);
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
			(a, b) =>
				Date.parse(b.metadata.startDate.toString()) - Date.parse(a.metadata.startDate.toString())
		);
	return posts;
}
