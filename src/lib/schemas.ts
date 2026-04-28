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

const SvelteCompomentSchema = z.custom((data) => data).pipe(z.any().optional());

export const ImportMetaSchema = z.object({
	default: SvelteCompomentSchema
});

export const PresentationSchema = z.strictObject({
	default: z.any().optional()
});

export type Gallery = z.infer<typeof GallerySchema>;
const GalleryMetaSchema = z
	.strictObject({
		title: z.string(),
		startDate: z
			.string()
			.transform((data) => new Date(data))
			.pipe(z.date()),
		endDate: z
			.string()
			.transform((data) => new Date(data))
			.optional()
			.pipe(z.date().optional()),
		summary: z.string(),
		draft: z.boolean().optional().default(true),
		readingTime: ReadingTimeSchema
	})
	.transform((data) => (data.draft === true ? { ...data, title: `[D]${data.title}` } : data));

export const GallerySchema = z.strictObject({
	default: z.any(),
	metadata: GalleryMetaSchema
});
