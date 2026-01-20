import fs from 'fs/promises';
import path from 'path';

const now = new Date();
const date = now.toISOString().split('T')[0];

const slug = process.argv[2];
const title = slug
	.split('-')
	.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
	.join('\u0020');

const content = `
---
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
const fileName = 'index.md';
const filePath = path.join(dirPath, fileName);

await fs.mkdir(dirPath, { recursive: true });
await fs.writeFile(filePath, content);
