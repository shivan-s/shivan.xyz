import { ImportMetaSchema } from '$lib/schemas';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	// NOTE: needs to be a string and start with `../` See: {@link https://vite.dev/guide/features#glob-import}
	const file = import.meta.glob('../../../content/about/index.md', { eager: true });
	const about = ImportMetaSchema.parse(file['../../../content/about/index.md']);
	return {
		content: about.default
	};
};
