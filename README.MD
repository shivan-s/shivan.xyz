<div style="text-align: center">
	<h1><a href="https://shivan.xyz">My Blog</a></h1>
</div>

[![Publish](https://github.com/shivan-s/shivan.xyz/actions/workflows/build.yml/badge.svg)](https://github.com/shivan-s/shivan.xyz/actions/workflows/build.yml)

This is source code for [my blog](https://shivan.xyz).

## SvelteKit

This uses [SvelteKit, as a static site generator](https://svelte.dev).

## Hosting

This is hosted using [Cloudflare Pages](https://pages.cloudflare.com/).

## Special Components in Markdown

### `<YouTube />` - YouTube videos

For displaying, playable embeded YouTube videos. Inspired by [hugo](https://gohugo.io).

```md
<script>
	import YouTube from "YouTube"
</script>

<YouTube id="<youtube-id>" />
```

### `<Figure />` - Images

```md
<script>
	import Figure from "Figure"
	import image from "./image.png" // Ficticious image imported
</script>

<Figure src={image} alt="Important alt to describe image" caption="Caption for image" />
```
