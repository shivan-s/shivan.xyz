import type { PageLoad } from './$types';
import { fetchPostsGroupByYear } from '$lib/posts';
import { ImportMetaSchema } from '$lib/schemas';

// NOTE: needs to be a string and start with `../` See: {@link https://vite.dev/guide/features#glob-import}
const file = import.meta.glob('../../content/about/index.md', {
	eager: true
});

export const load: PageLoad = async ({ fetch }) => {
	const about = ImportMetaSchema.parse(file['../../content/about/index.md']);
	const posts = await fetchPostsGroupByYear(fetch);
	return {
		content: about.default,
		posts
	};
};
