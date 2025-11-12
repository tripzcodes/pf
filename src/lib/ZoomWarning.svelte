<script>
	import { onMount } from 'svelte';

	let showWarning = false;
	let checkInterval;

	onMount(() => {
		const checkZoom = () => {
			// Detect zoom level by comparing window.innerWidth to document width
			const zoomLevel = window.devicePixelRatio || 1;
			const viewportWidth = window.innerWidth;

			// If viewport is extremely wide (zoomed way out), show warning
			// Typically >4000px means they're zoomed out to like 10-15%
			if (viewportWidth > 4000) {
				showWarning = true;
			} else {
				showWarning = false;
			}
		};

		// Check on load
		checkZoom();

		// Check on resize
		window.addEventListener('resize', checkZoom);

		// Periodic check (in case zoom changes without resize event)
		checkInterval = setInterval(checkZoom, 1000);

		return () => {
			window.removeEventListener('resize', checkZoom);
			clearInterval(checkInterval);
		};
	});
</script>

{#if showWarning}
	<div class="zoom-warning">
		<div class="warning-content">
			<p class="warning-text">
				zoom back in.<br />
				you're burning your gpu.
			</p>
		</div>
	</div>
{/if}

<style>
	.zoom-warning {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: var(--color-bg);
		z-index: 10000;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.warning-content {
		text-align: center;
		padding: 2rem;
	}

	.warning-text {
		font-family: var(--font-mono);
		font-size: clamp(1.5rem, 4vw, 3rem);
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: 0.02em;
		color: var(--color-fg);
		margin: 0;
	}
</style>
