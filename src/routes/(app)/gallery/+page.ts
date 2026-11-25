import { m } from '#lib';
import { fetchAllGalleries } from '#lib/gallery.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const galleries = fetchAllGalleries();
	return {
		pageTitle: m.gallery(),
		galleries
	};
};
