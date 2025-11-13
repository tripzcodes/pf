import { error } from '@sveltejs/kit';
import { readFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import type { PageServerLoad } from './$types';
import metadata from '$lib/content/talks/metadata.json';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	// Find talk metadata
	const talk = metadata.talks.find((t) => t.slug === slug);
	if (!talk) {
		throw error(404, 'talk not found');
	}

	try {
		// Read markdown file
		const markdownPath = join(process.cwd(), 'src', 'lib', 'content', 'talks', `${slug}.md`);
		const markdown = readFileSync(markdownPath, 'utf-8');

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
