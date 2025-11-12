<script>
	import { onMount } from 'svelte';

	let darkMode = false;

	onMount(() => {
		// Check localStorage or system preference
		const savedMode = localStorage.getItem('darkMode');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		darkMode = savedMode ? savedMode === 'true' : prefersDark;
		applyTheme(darkMode);
	});

	function applyTheme(isDark) {
		document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
	}

	function toggleDarkMode() {
		darkMode = !darkMode;
		localStorage.setItem('darkMode', darkMode.toString());
		applyTheme(darkMode);
	}
</script>

<button
	class="dark-mode-toggle"
	on:click={toggleDarkMode}
	aria-label="Toggle dark mode"
>
	{#if darkMode}
		<!-- Sun Icon -->
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="12" cy="12" r="5"></circle>
			<line x1="12" y1="1" x2="12" y2="3"></line>
			<line x1="12" y1="21" x2="12" y2="23"></line>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
			<line x1="1" y1="12" x2="3" y2="12"></line>
			<line x1="21" y1="12" x2="23" y2="12"></line>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
		</svg>
	{:else}
		<!-- Moon Icon -->
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
		</svg>
	{/if}
</button>

<style>
	.dark-mode-toggle {
		position: fixed;
		top: 2rem;
		right: 2rem;
		width: 50px;
		height: 50px;
		background: transparent;
		border: 1px solid var(--color-fg);
		cursor: none;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.25s ease;
		padding: 0;
	}

	.dark-mode-toggle:hover {
		background: var(--color-fg);
		border-color: var(--color-fg);
	}

	.dark-mode-toggle svg {
		width: 20px;
		height: 20px;
		transition: all 0.25s ease;
		stroke: var(--color-fg);
	}

	.dark-mode-toggle:hover svg {
		stroke: var(--color-bg);
	}

	@media (max-width: 768px) {
		.dark-mode-toggle {
			top: 1rem;
			right: 1rem;
			width: 44px;
			height: 44px;
			cursor: pointer;
		}

		.dark-mode-toggle svg {
			width: 18px;
			height: 18px;
		}
	}
</style>
