import { m } from '$i18n/messages';
import { fetchAllGalleries } from '$lib/gallery';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const galleries = fetchAllGalleries();
	return {
		pageTitle: m.gallery(),
		galleries
	};
};
