<script>
	// Add any dynamic functionality here
</script>

<svelte:head>
	<title>Youssef Ashraf - Developer & Esports Player</title>
	<meta name="description" content="Youssef Ashraf - Developer & Esports Player Portfolio" />
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
		#contact {
			padding: 1.5rem 0;
		}

		.hero-content,
		.contact-content,
		.quote-text {
			max-width: 100%;
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
