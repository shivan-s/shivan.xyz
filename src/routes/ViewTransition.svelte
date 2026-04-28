<script lang="ts">
	import { onNavigate } from '$app/navigation';

	onNavigate((navigate) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigate.complete;
			});
		});
	});
</script>
