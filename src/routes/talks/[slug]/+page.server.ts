import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import type { PageServerLoad } from './$types';
import metadata from '$lib/content/talks/metadata.json';

// Use Vite's import.meta.glob to bundle markdown files at build time
// This works in serverless environments (Vercel, Netlify, etc.)
const markdownFiles = import.meta.glob('$lib/content/talks/*.md', {
	as: 'raw',
	eager: true
});

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	// Find talk metadata
	const talk = metadata.talks.find((t) => t.slug === slug);
	if (!talk) {
		throw error(404, 'talk not found');
	}

	try {
		// Get markdown content from bundled files
		const markdownPath = `/src/lib/content/talks/${slug}.md`;
		const markdown = markdownFiles[markdownPath];

		if (!markdown) {
			throw error(404, 'talk content not found');
		}

		// Configure marked for better rendering
		marked.setOptions({
			gfm: true,
			breaks: true,
		});

		// Convert markdown to HTML
		const rawHtml = await marked(markdown);

		// Sanitize HTML (allow code blocks, lists, etc.)
		const content = sanitizeHtml(rawHtml, {
			allowedTags: sanitizeHtml.defaults.allowedTags.concat([
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
				'pre',
				'code',
				'blockquote',
				'hr',
				'del',
				'ins',
				'mark',
				'kbd'
			]),
			allowedAttributes: {
				...sanitizeHtml.defaults.allowedAttributes,
				code: ['class'],
				pre: ['class']
			}
		});

		return {
			talk,
			content
		};
	} catch (err) {
		console.error('Error loading talk:', err);
		throw error(500, 'failed to load talk content');
	}
};
