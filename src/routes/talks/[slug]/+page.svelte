<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.talk.title} - youssef ashraf</title>
</svelte:head>

<article class="talk">
	<header class="talk-header">
		<div class="talk-meta">
			<span class="label">"DATE"</span>
			<span class="value">{data.talk.date}</span>
		</div>
		<div class="talk-meta">
			<span class="label">"VENUE"</span>
			<span class="value">{data.talk.venue}</span>
		</div>
		<div class="talk-meta">
			<span class="label">"DURATION"</span>
			<span class="value">{data.talk.duration}</span>
		</div>
	</header>

	<h1 class="talk-title">{data.talk.title}</h1>

	<div class="talk-description">
		<span class="label">"DESCRIPTION"</span>
		<p>{data.talk.description}</p>
	</div>

	<div class="divider"></div>

	<section class="talk-content">
		{@html data.content}
	</section>

	<footer class="talk-footer">
		<button on:click={() => window.history.back()} class="back-link">← back</button>
	</footer>
</article>

<style>
	.talk {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem 1.5rem;
		min-height: 100vh;
		position: relative;
		z-index: 1;
	}

	.talk-header {
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}

	.talk-meta {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.label {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-fg);
		opacity: 0.7;
	}

	.value {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		font-weight: 400;
		color: var(--color-fg);
	}

	.talk-title {
		font-family: var(--font-sans);
		font-size: 2.5rem;
		font-weight: 700;
		line-height: 1.2;
		margin-bottom: 1.5rem;
		color: var(--color-fg);
		letter-spacing: -0.02em;
	}

	.talk-description {
		margin-bottom: 2rem;
	}

	.talk-description .label {
		display: block;
		margin-bottom: 0.5rem;
	}

	.talk-description p {
		font-family: var(--font-sans);
		font-size: 1.1rem;
		line-height: 1.6;
		color: var(--color-fg);
		opacity: 0.85;
	}

	.divider {
		width: 100%;
		height: 2px;
		background-color: var(--color-fg);
		margin: 2rem 0;
	}

	.talk-content {
		font-family: var(--font-sans);
		font-size: 1rem;
		line-height: 1.7;
		color: var(--color-fg);
	}

	/* Markdown content styling */
	.talk-content :global(h1),
	.talk-content :global(h2),
	.talk-content :global(h3),
	.talk-content :global(h4) {
		font-family: var(--font-sans);
		font-weight: 700;
		margin-top: 2rem;
		margin-bottom: 1rem;
		line-height: 1.3;
		letter-spacing: -0.01em;
	}

	.talk-content :global(h1) {
		font-size: 2rem;
		border-bottom: 3px solid var(--color-fg);
		padding-bottom: 0.5rem;
	}

	.talk-content :global(h2) {
		font-size: 1.5rem;
		margin-top: 3rem;
		position: relative;
	}

	.talk-content :global(h2)::before {
		content: '"';
		position: absolute;
		left: -1.5rem;
		color: var(--color-fg);
		opacity: 0.3;
		font-size: 2rem;
	}

	.talk-content :global(h3) {
		font-size: 1.2rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-family: var(--font-mono);
	}

	.talk-content :global(h4) {
		font-size: 1rem;
		font-weight: 600;
	}

	.talk-content :global(p) {
		margin-bottom: 1rem;
	}

	.talk-content :global(strong) {
		font-weight: 700;
		color: var(--color-fg);
	}

	.talk-content :global(em) {
		font-style: italic;
	}

	.talk-content :global(ul),
	.talk-content :global(ol) {
		margin-left: 1.5rem;
		margin-bottom: 1rem;
	}

	.talk-content :global(li) {
		margin-bottom: 0.5rem;
	}

	.talk-content :global(code) {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background-color: var(--color-fg);
		color: var(--color-bg);
		padding: 0.2em 0.4em;
		border-radius: 3px;
		cursor: none !important;
	}

	.talk-content :global(pre) {
		background-color: var(--color-fg);
		color: var(--color-bg);
		padding: 1.5rem;
		overflow-x: auto;
		margin-bottom: 1.5rem;
		border-left: 4px solid var(--color-accent);
		cursor: none !important;
	}

	/* Custom scrollbar styling */
	.talk-content :global(pre::-webkit-scrollbar) {
		width: 8px;
		height: 8px;
	}

	.talk-content :global(pre::-webkit-scrollbar-track) {
		background: transparent;
	}

	.talk-content :global(pre::-webkit-scrollbar-thumb) {
		background: var(--color-bg);
		border-radius: 4px;
	}

	.talk-content :global(pre::-webkit-scrollbar-thumb:hover) {
		background: var(--color-accent);
	}

	/* Firefox scrollbar */
	.talk-content :global(pre) {
		scrollbar-width: thin;
		scrollbar-color: var(--color-bg) transparent;
	}

	.talk-content :global(pre code) {
		background-color: transparent;
		padding: 0;
		color: var(--color-bg);
		font-size: 0.85rem;
		line-height: 1.5;
		cursor: none !important;
	}

	/* Dark mode code blocks */
	:root[data-theme='dark'] .talk-content :global(code) {
		background-color: #1a1a1a;
		color: #e0e0e0;
	}

	:root[data-theme='dark'] .talk-content :global(pre) {
		background-color: #1a1a1a;
		color: #e0e0e0;
		border-left-color: #4d94ff;
	}

	:root[data-theme='dark'] .talk-content :global(pre code) {
		color: #e0e0e0;
	}

	.talk-content :global(blockquote) {
		border-left: 4px solid var(--color-fg);
		padding-left: 1.5rem;
		margin: 1.5rem 0;
		font-style: italic;
		opacity: 0.9;
	}

	.talk-content :global(hr) {
		border: none;
		height: 2px;
		background-color: var(--color-fg);
		margin: 3rem 0;
		opacity: 0.2;
	}

	.talk-content :global(a) {
		color: var(--color-accent);
		text-decoration: underline;
		transition: opacity 0.2s;
	}

	.talk-content :global(a:hover) {
		opacity: 0.7;
	}

	.talk-footer {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 2px solid var(--color-fg);
	}

	.back-link {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: var(--color-fg);
		text-decoration: none;
		display: inline-block;
		transition: transform 0.2s;
		background: none;
		border: none;
		padding: 0;
		cursor: none;
	}

	.back-link:hover {
		transform: translateX(-4px);
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.talk {
			padding: 1.5rem 1rem;
		}

		.talk-title {
			font-size: 1.8rem;
			line-height: 1.3;
			margin-bottom: 1rem;
		}

		.talk-header {
			gap: 1rem;
			flex-direction: column;
			align-items: flex-start;
		}

		.talk-meta {
			gap: 0.2rem;
		}

		.label {
			font-size: 0.7rem;
		}

		.value {
			font-size: 0.85rem;
		}

		.talk-description {
			margin-bottom: 1.5rem;
		}

		.talk-description p {
			font-size: 1rem;
		}

		.divider {
			margin: 1.5rem 0;
		}

		.talk-content {
			font-size: 0.95rem;
		}

		.talk-content :global(h1) {
			font-size: 1.5rem;
		}

		.talk-content :global(h2) {
			font-size: 1.3rem;
			margin-top: 2rem;
		}

		.talk-content :global(h2)::before {
			display: none;
		}

		.talk-content :global(h3) {
			font-size: 1.05rem;
		}

		.talk-content :global(pre) {
			padding: 1rem;
			font-size: 0.8rem;
			border-left: 3px solid var(--color-accent);
		}

		.talk-content :global(pre code) {
			font-size: 0.8rem;
		}

		.talk-content :global(code) {
			font-size: 0.85em;
			word-break: break-word;
		}

		.talk-content :global(ul),
		.talk-content :global(ol) {
			margin-left: 1rem;
		}

		.talk-content :global(blockquote) {
			padding-left: 1rem;
			margin: 1rem 0;
		}

		.talk-footer {
			margin-top: 3rem;
			padding-top: 1.5rem;
		}

		.back-link {
			font-size: 0.85rem;
		}
	}

	/* Extra small mobile */
	@media (max-width: 480px) {
		.talk {
			padding: 1rem 0.75rem;
		}

		.talk-title {
			font-size: 1.5rem;
			line-height: 1.25;
		}

		.talk-description p {
			font-size: 0.95rem;
		}

		.talk-content {
			font-size: 0.9rem;
		}

		.talk-content :global(h1) {
			font-size: 1.3rem;
		}

		.talk-content :global(h2) {
			font-size: 1.15rem;
			margin-top: 1.5rem;
		}

		.talk-content :global(h3) {
			font-size: 0.95rem;
		}

		.talk-content :global(pre) {
			padding: 0.75rem;
			font-size: 0.75rem;
			margin-left: -0.75rem;
			margin-right: -0.75rem;
			border-left-width: 2px;
		}

		.talk-content :global(pre code) {
			font-size: 0.75rem;
			line-height: 1.4;
		}

		.talk-content :global(hr) {
			margin: 2rem 0;
		}
	}
</style>
