<script>
	import { resolve } from '$app/paths';
	import { config } from '$lib/config';
	import Avatar from '$lib/assets/img/avatar.png';
	import { page } from '$app/state';
	import { Moon, Sun } from '@lucide/svelte';
	import { theme, DARK, LIGHT } from '$lib/state.svelte';
	import { sineInOut } from 'svelte/easing';
	import { blur } from 'svelte/transition';
</script>

<header id="top">
	<div>
		<span></span>
		<nav>
			<a href={resolve('/')} title={config.title}>
				<enhanced:img src={Avatar} alt="Logo with 'Shivan' in it as as form of a letter chart" />
				{#if page.url.pathname === '/'}
					<span>{config.title}</span>
				{/if}
			</a>
		</nav>
		{#key theme.current}
			<span in:blur={{ easing: sineInOut }}>
				{#if theme.current === DARK}
					<button onclick={() => theme.setTheme(LIGHT)}>
						<Moon />
					</button>
				{:else if theme.current === LIGHT}
					<button onclick={() => theme.setTheme(DARK)}>
						<Sun />
					</button>
				{/if}
			</span>
		{/key}
	</div>
</header>

<style>
	header#top {
		padding: var(--padding);
		& div {
			display: grid;
			place-content: center;
			grid-template-columns: 0 1fr auto;
			margin-inline: auto;
			max-width: var(--max-width);
			& nav {
				margin-inline: auto;
				margin-block: auto;
				& > a {
					font-family: 'Optician Sans', sans-serif;
					display: inline-flex;
					align-items: center;
					gap: var(--gap-small);
					& > span {
						display: inline-block;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					&:hover > enhanced\:img {
						box-shadow: var(--box-shadow);
					}
					& > enhanced\:img {
						border-radius: 50%;
						height: var(--font-size-large);
						animation: 2s ease-in-out spin;
						transition: box-shadow 0.3s ease-in-out;
						view-transition-name: logo;
					}
				}
			}
			& button {
				cursor: pointer;
				align-self: center;
				color: var(--primary-color);
				justify-self: end;
				background: none;
				padding: 0;
				border: none;
				height: fit-content;
				transition: color 0.3s ease-in-out;
				&:hover,
				:active {
					color: var(--alternative-color);
				}
			}
		}
	}

	@keyframes spin {
		to {
			transform: rotate(1turn);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		@keyframes spin {
			to {
				transform: rotate(0);
			}
		}
	}
</style>
