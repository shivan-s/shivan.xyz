import { fetchAllPresentations, fetchPresentation } from '$lib/presentations';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

/** Required for prerendering presentation without an index file */
export const entries = () => {
	const presentations = fetchAllPresentations();
	return presentations.map(({ slug }) => ({ slug }));
};

export const load: PageLoad = async ({ params }) => {
	const presentation = fetchPresentation(params.slug);
	if (presentation === undefined) {
		console.error('Presentation not found');
		error(404);
	}
	return {
		pageTitle: params.slug,
		content: presentation.default
	};
};
