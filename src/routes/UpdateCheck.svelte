<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { updated } from '$app/state';

	beforeNavigate(({ willUnload, to, shallow, type }) => {
		if (shallow && type === 'goto') return;

		if (updated.current && !willUnload && to?.url) {
			location.href = to.url.href;
		}
	});
</script>
