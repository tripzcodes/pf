<script>
	import metadata from '$lib/content/talks/metadata.json';
	const talks = metadata.talks;
</script>

<svelte:head>
	<title>Youssef Ashraf - Developer & Esports Player</title>
	<meta name="description" content="Youssef Ashraf - Developer & Esports Player" />
</svelte:head>

<!-- HERO SECTION -->
<section id="hero">
	<div class="container">
		<div class="hero-content">
			<h1 class="hero-title">
				youssef<br />
				ashraf
			</h1>
			<p class="hero-subtitle mono">
				developer / esports player
			</p>
		</div>
	</div>
</section>

<!-- QUOTE SECTION -->
<section id="quote">
	<div class="container">
		<blockquote class="quote-text">
			birds who flock together,<br />
			stay together
		</blockquote>
	</div>
</section>

<!-- TALKS SECTION -->
<section id="talks">
	<div class="container">
		<div class="talks-content">
			<h2 class="talks-title">"TALKS"</h2>
			<div class="talks-list">
				{#each talks as talk}
					<a href="/talks/{talk.slug}" class="talk-item">
						<div class="talk-item-header">
							<h3 class="talk-item-title">{talk.title}</h3>
							<div class="talk-item-meta">
								<span class="meta-label">"DATE"</span>
								<span class="meta-value">{talk.date}</span>
								<span class="meta-divider">|</span>
								<span class="meta-label">"VENUE"</span>
								<span class="meta-value">{talk.venue}</span>
							</div>
						</div>
						<p class="talk-item-description">{talk.description}</p>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- CONTACT SECTION -->
<section id="contact">
	<div class="container">
		<div class="contact-content">
			<h2 class="contact-title">contact</h2>
			<nav class="contact-links">
				<a href="mailto:tripzcodes@gmail.com" class="contact-link mono">
					email
				</a>
				<a href="https://github.com/tripzcodes" target="_blank" rel="noopener noreferrer" class="contact-link mono">
					github
				</a>
				<a href="https://twitter.com/tripz_cs" target="_blank" rel="noopener noreferrer" class="contact-link mono">
					twitter
				</a>
				<a href="https://www.linkedin.com/in/youssefashraf-/" target="_blank" rel="noopener noreferrer" class="contact-link mono">
					linkedin
				</a>
			</nav>
			<p class="footer-note gray">
				&copy; 2025. Built with SvelteKit & Three.js
			</p>
		</div>
	</div>
</section>

<style>
	/* HERO SECTION */
	#hero {
		min-height: auto;
		padding: 2rem 0 1rem 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-content {
		text-align: left;
		max-width: 800px;
	}

	.hero-title {
		margin-bottom: 0.75rem;
		letter-spacing: -0.02em;
		margin-left: 0;
	}

	.hero-subtitle {
		font-size: clamp(0.875rem, 1.5vw, 1.125rem);
		letter-spacing: 0.03em;
		line-height: 1.6;
		margin-left: 0;
	}

	/* QUOTE SECTION */
	#quote {
		min-height: auto;
		padding: 1rem 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.quote-text {
		font-family: var(--font-sans);
		font-size: clamp(1.5rem, 3vw, 2.5rem);
		font-weight: 400;
		font-style: italic;
		line-height: 1.5;
		letter-spacing: -0.005em;
		color: var(--color-fg);
		text-align: left;
		margin: 0;
		margin-left: 0;
		padding: 0;
		max-width: 800px;
	}

	/* TALKS SECTION */
	#talks {
		min-height: auto;
		padding: 1rem 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.talks-content {
		text-align: left;
		max-width: 800px;
	}

	.talks-title {
		font-family: var(--font-mono);
		font-size: clamp(1rem, 2vw, 1.25rem);
		font-weight: 700;
		letter-spacing: 0.1em;
		margin-bottom: 1.5rem;
		margin-left: 0;
		text-transform: uppercase;
	}

	.talks-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.talk-item {
		display: block;
		padding: 1.5rem;
		border: 2px solid var(--color-fg);
		background-color: transparent;
		text-decoration: none;
		transition: all 0.3s ease;
		cursor: none;
	}

	.talk-item:hover {
		background-color: var(--color-fg);
		color: var(--color-bg);
		transform: translateX(8px);
	}

	.talk-item-header {
		margin-bottom: 0.75rem;
	}

	.talk-item-title {
		font-family: var(--font-sans);
		font-size: clamp(1.25rem, 2.5vw, 1.5rem);
		font-weight: 700;
		line-height: 1.3;
		margin-bottom: 0.5rem;
		color: inherit;
		letter-spacing: -0.01em;
	}

	.talk-item-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.meta-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		opacity: 0.6;
	}

	.meta-value {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 400;
	}

	.meta-divider {
		opacity: 0.3;
	}

	.talk-item-description {
		font-family: var(--font-sans);
		font-size: clamp(0.9rem, 1.5vw, 1rem);
		line-height: 1.6;
		opacity: 0.85;
		margin: 0;
	}

	.talk-item:hover .talk-item-title,
	.talk-item:hover .talk-item-description,
	.talk-item:hover .meta-label,
	.talk-item:hover .meta-value {
		color: var(--color-bg);
	}

	/* CONTACT SECTION */
	#contact {
		min-height: auto;
		padding: 1rem 0 2rem 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.contact-content {
		text-align: left;
		max-width: 800px;
	}

	.contact-title {
		margin-bottom: 1rem;
		letter-spacing: 0.05em;
		margin-left: 0;
	}

	.contact-links {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
		align-items: flex-start;
	}

	.contact-link {
		font-size: clamp(1.25rem, 2.5vw, 1.875rem);
		font-weight: 400;
		letter-spacing: 0.01em;
		border-bottom: 1px solid var(--color-fg);
		display: inline-block;
		transition: all 0.25s ease;
		cursor: none;
		line-height: 1.5;
		margin-left: 0;
	}

	.contact-link:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
		transform: translateX(8px);
	}

	.footer-note {
		font-size: 0.875rem;
		letter-spacing: 0.05em;
		font-family: var(--font-mono);
	}

	/* RESPONSIVE - MOBILE */
	@media (max-width: 768px) {
		#hero,
		#quote,
		#talks,
		#contact {
			padding: 1.5rem 0;
		}

		.hero-content,
		.talks-content,
		.contact-content,
		.quote-text {
			max-width: 100%;
		}

		.talk-item {
			padding: 1rem;
		}

		.talks-list {
			gap: 1rem;
		}

		.talk-item-title {
			font-size: clamp(1.125rem, 5vw, 1.25rem);
		}

		.hero-title {
			margin-bottom: 0.5rem;
		}

		.hero-subtitle {
			font-size: clamp(0.875rem, 4vw, 1rem);
		}

		.quote-text {
			font-size: clamp(1.25rem, 5vw, 1.75rem);
			line-height: 1.4;
		}

		.contact-title {
			margin-bottom: 0.75rem;
		}

		.contact-link {
			font-size: clamp(1.125rem, 5vw, 1.5rem);
		}

		.contact-links {
			gap: 0.75rem;
			margin-bottom: 1rem;
		}

		.footer-note {
			font-size: 0.75rem;
		}
	}

	/* EXTRA SMALL MOBILE */
	@media (max-width: 480px) {
		.quote-text {
			font-size: clamp(1.125rem, 6vw, 1.5rem);
		}
	}
</style>
