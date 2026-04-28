import fs from 'fs/promises';
import path from 'path';

const now = new Date();
const date = now.toISOString().split('T')[0];

const POST = 'post';
const PRESENTATION = 'presentation';
const GALLERY = 'gallery';
const OPTIONS = Object.freeze({
	POST,
	PRESENTATION,
	GALLERY
});
type Options = typeof OPTIONS;
type Option = Options[keyof Options];

function processOption() {
	const option: Option = process.argv[2];
	const slug: string = process.argv[3];
	const title = slug
		.split('-')
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join('\u0020');

	if (option === OPTIONS.POST) {
		const content = `---
title: ${title}
date: ${date}
summary: 
draft: true
cover:
  image: 
  alt: 
  caption: 
audio:
  src
  caption: 
---

<script>
	import YouTube from "YouTube"
	import Figure from "Figure"
	import BlockQuote from "BlockQuote"
</script>
`;
		const dirPath = path.join('content', 'posts', slug);
		return { dirPath, content };
	}
	if (option === OPTIONS.GALLERY) {
		const slug = process.argv[3] as string;
		const title = slug
			.split('-')
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join('\u0020');

		const content = `---
title: ${title}
startDate: ${date}
summary: 
draft: true
---

<script>
	import Figure from "Figure"
</script>
		`;
		const dirPath = path.join('content', 'gallery', slug);
		return { dirPath, content };
	}
	if (option === OPTIONS.PRESENTATION) {
		const slug = process.argv[3] as string;
		const title = slug
			.split('-')
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join('\u0020');

		const content = `---
title: ${title}
date: ${date}
summary: 
draft: true
cover:
  image: 
  alt: 
  caption: 
audio:
  src
  caption: 
---

<script>
	import YouTube from "YouTube"
	import Figure from "Figure"
	import BlockQuote from "BlockQuote"
</script>
		`;
		const dirPath = path.join('content', 'presentation', slug);
		return { dirPath, content };
	}
	throw Error('Invalid option');
}

const { dirPath, content } = processOption();

const fileName = 'index.md';
const filePath = path.join(dirPath, fileName);

await fs.mkdir(dirPath, { recursive: true });
await fs.writeFile(filePath, content);
