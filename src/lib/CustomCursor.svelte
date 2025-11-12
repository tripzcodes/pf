<script>
	import { onMount } from 'svelte';

	let cursorX = 0;
	let cursorY = 0;
	let isHovering = false;
	let isVisible = false;

	onMount(() => {
		// Initialize cursor at center of screen
		cursorX = window.innerWidth / 2;
		cursorY = window.innerHeight / 2;

		const handleMouseMove = (e) => {
			cursorX = e.clientX;
			cursorY = e.clientY;
			isVisible = true;

			// Check if hovering over interactive element
			const target = e.target;
			const isInteractive = target.closest('a, button, [role="button"]');
			isHovering = !!isInteractive;
		};

		const handleMouseEnter = () => {
			isVisible = true;
		};

		const handleMouseLeave = () => {
			isVisible = false;
		};

		window.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseenter', handleMouseEnter);
		document.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseenter', handleMouseEnter);
			document.removeEventListener('mouseleave', handleMouseLeave);
		};
	});
</script>

<div class="cursor" style="left: {cursorX}px; top: {cursorY}px;" class:hovering={isHovering} class:visible={isVisible}></div>

<style>
	.cursor {
		position: fixed;
		pointer-events: none;
		z-index: 9999;
		transform: translate(-50%, -50%);
		/* Only animate size/color, NOT position */
		transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
					height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
					background 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
					border 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
					opacity 0.2s ease;
		width: 12px;
		height: 12px;
		background: var(--color-fg);
		border: 0px solid var(--color-accent);
		border-radius: 50%;
		opacity: 0;
	}

	.cursor.visible {
		opacity: 1;
	}

	.cursor.hovering {
		width: 40px;
		height: 40px;
		background: transparent;
		border: 2px solid var(--color-accent);
	}

	@media (max-width: 768px) {
		.cursor {
			display: none;
		}
	}
</style>
