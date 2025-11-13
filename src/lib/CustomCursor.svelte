<script>
	import { onMount } from 'svelte';

	let cursorX = 0;
	let cursorY = 0;
	let isHovering = false;
	let isVisible = false;
	let isInverted = false;

	// Helper function to calculate luminance of a color
	function getLuminance(r, g, b) {
		const a = [r, g, b].map((v) => {
			v /= 255;
			return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
		});
		return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
	}

	// Check if element is inside a code block
	function isOverCodeBlock(element) {
		if (!element) return false;

		// Check if inside a pre or code element
		const codeElement = element.closest('pre') || element.closest('code');
		return !!codeElement;
	}

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

			// Check if over code block
			isInverted = isOverCodeBlock(target);
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

<div class="cursor" style="left: {cursorX}px; top: {cursorY}px;" class:hovering={isHovering} class:visible={isVisible} class:inverted={isInverted}></div>

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

	/* Inverted cursor for dark backgrounds */
	.cursor.inverted {
		background: #ffffff;
	}

	.cursor.inverted.hovering {
		background: transparent;
		border-color: #ffffff;
	}

	@media (max-width: 768px) {
		.cursor {
			display: none;
		}
	}
</style>
