import { m } from '$i18n/messages';
import * as z from 'zod';

const IMAGE_DEFAULT = 'cover.png';
const CoverSchema = z.strictObject({
	image: z.string().default(IMAGE_DEFAULT),
	alt: z.string(),
	caption: z.string()
});
const AUDIO_SRC_DEFAULT = 'audio.mp3';
const AudioSchema = z.strictObject({
	src: z.string().default(AUDIO_SRC_DEFAULT),
	caption: z.string().default(m.listen_to_audio_version())
});
const ReadingTimeSchema = z.strictObject({
	text: z.string(),
	minutes: z.number(),
	time: z.number(),
	words: z.number()
});

export type Post = z.infer<typeof PostSchema>;
const PostMetaSchema = z
	.strictObject({
		title: z.string(),
		date: z
			.string()
			.transform((data) => new Date(data))
			.pipe(z.date()),
		summary: z.string(),
		draft: z.boolean().optional().default(true),
		cover: CoverSchema.optional(),
		audio: AudioSchema.optional(),
		readingTime: ReadingTimeSchema
	})
	.transform((data) => (data.draft === true ? { ...data, title: `[D]${data.title}` } : data));

export const PostSchema = z.strictObject({
	default: z.any(),
	metadata: PostMetaSchema
});

export type PostWithSchema = z.infer<typeof PostWithSlugSchema>;
export const PostWithSlugSchema = PostSchema.extend({ slug: z.string() });

const SvelteCompomentSchema = z
	.custom(
		(data) => data
		// typeof data === 'function' || (typeof data === 'object' && data !== null && '$svelte' in data)
	)
	.pipe(z.any().optional());

export const ImportMetaSchema = z.object({
	default: SvelteCompomentSchema
});
