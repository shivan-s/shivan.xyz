import { m } from '#lib';
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

const ToC = z.strictObject({
	headings: z.array(
		z.strictObject({
			depth: z.int(),
			id: z.string(),
			text: z.string(),
			position: z.strictObject({
				start: z.strictObject({
					offset: z.int(),
					line: z.int(),
					column: z.int()
				}),
				end: z.strictObject({
					offset: z.int(),
					line: z.int(),
					column: z.int()
				})
			})
		})
	)
});
const PluginDataSchema = z
	.strictObject({
		page: z.strictObject({
			minutes: z.number(),
			words: z.number(),
			edit_url: z.string(),
			last_modified: z.string().transform((data) => new Date(data))
		}),
		toc: ToC.optional()
	})
	.transform((data) => ({
		minutes: data.page.minutes,
		words: data.page.words,
		editUrl: data.page.edit_url,
		lastModified: data.page.last_modified,
		toc: data.toc
	}));

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
		atUri: z.string().optional()
	})
	.transform((data) => (data.draft === true ? { ...data, title: `[D]${data.title}` } : data));

export const PostSchema = z
	.strictObject({
		default: z.any(),
		metadata: PostMetaSchema,
		plugin_data: PluginDataSchema
	})
	.transform((data) => ({
		default: data.default,
		metadata: { ...data.metadata, ...data.plugin_data }
	}));

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
		draft: z.boolean().optional().default(true)
	})
	.transform((data) => (data.draft === true ? { ...data, title: `[D]${data.title}` } : data));

export const GallerySchema = z.strictObject({
	default: z.any(),
	metadata: GalleryMetaSchema,
	plugin_data: PluginDataSchema
});
