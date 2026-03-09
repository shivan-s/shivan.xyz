import { error } from '@sveltejs/kit';
import { PresentationSchema } from './schemas';

// NOTE: needs to be a string and start with `../` See: {@link https://vite.dev/guide/features#glob-import}
const paths = import.meta.glob('../../content/presentations/**/index.html', { eager: true });

/**
 * Fetch all presentations
 */
export function fetchAllPresentations() {
	const presentations = Object.entries(paths).map(([path, file]) => {
		const result = PresentationSchema.safeParse(file);
		if (result.success === false) {
			console.error(`Path error: ${path}`);
			console.error(result.error);
			error(500);
		}
		const slug = path.split('/').at(-2)!;
		return { slug, ...result.data };
	});
	return presentations;
}

/**
 * Fetch presentation - good for a single view
 */
export function fetchPresentation(slug: string) {
	const presentations = fetchAllPresentations();
	const presentation = presentations.find((p) => p.slug === slug);
	return presentation;
}
