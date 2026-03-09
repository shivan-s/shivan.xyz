import { fetchPresentation } from '$lib/presentations';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { config } from '$lib/config';

export const load: PageLoad = async ({ params }) => {
	const presentation = fetchPresentation(params.slug);
	if (presentation === undefined) {
		console.error('Presentation not found');
		error(404);
	}
	return {
		pageTitle: `${params.slug} · ${config.title}`,
		content: presentation.default
	};
};
