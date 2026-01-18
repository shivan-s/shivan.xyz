import type { PageLoad } from './$types';
import { fetchPost } from '$lib/posts';
import { error } from '@sveltejs/kit';
import { PostSchema, ImportMetaSchema } from '$lib/schemas';

const markdowns = import.meta.glob('../../../../content/posts/**/*.md', { eager: true });
const images = import.meta.glob('../../../../content/posts/**/*.{jpg,png,gif,jpeg,webp,svg}', {
	query: '?url',
	eager: true
});
const audios = import.meta.glob('../../../../content/posts/**/*.{mp3,wav}', {
	query: '?url',
	eager: true
});

export const load: PageLoad = async ({ params, fetch }) => {
	// Post does not have content since it's not JSON-able, so we get it again
	const { metadata } = await fetchPost(params.slug, fetch);
	const rawPost = Object.entries(markdowns).find(([path]) => {
		const slug = path.split('/').at(-2);
		const fileName = path.split('/').at(-1);
		const INDEX_FILE = 'index.md';
		return slug === params.slug && fileName === INDEX_FILE;
	});
	const resultPost = PostSchema.safeParse(rawPost?.at(1));
	if (resultPost.success === false) {
		console.error(resultPost.error);
		error(500);
	}

	function getCover() {
		const rawCover = Object.entries(images).find(([path]) => {
			const slug = path.split('/').at(-2);
			const fileName = path.split('/').at(-1);
			return slug === params.slug && fileName === metadata.cover?.image;
		});
		const resultCover = ImportMetaSchema.safeParse(rawCover?.at(1));
		if (resultCover.success === false) {
			console.error('Invalid Cover image', resultCover.error);
			error(500);
		}
		return resultCover.data.default;
	}
	function getAudio() {
		const rawAudio = Object.entries(audios).find(([path]) => {
			const slug = path.split('/').at(-2);
			const fileName = path.split('/').at(-1);
			return slug === params.slug && fileName === metadata.audio?.src;
		});
		const resultAudio = ImportMetaSchema.safeParse(rawAudio?.at(1));
		if (resultAudio.success === false) {
			console.error('Invalid Audio', resultAudio.error);
			error(500);
		}
		return resultAudio.data.default;
	}
	return {
		content: resultPost.data.default,
		meta: {
			slug: params.slug,
			...metadata,
			...(metadata.cover !== undefined
				? {
						cover: {
							...metadata.cover,
							image: getCover()
						}
					}
				: {}),
			...(metadata.audio !== undefined
				? {
						audio: {
							...metadata.audio,
							src: getAudio()
						}
					}
				: {})
		}
	};
};
