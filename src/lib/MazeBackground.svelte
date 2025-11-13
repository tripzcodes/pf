<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let canvas;
	let ctx;
	let maze = [];
	let cols, rows;
	let cellSize = 30;
	let animationFrame;
	let generationStack = [];
	let current;
	let isGenerating = true;
	let generationSpeed = 3; // cells per frame

	// Check if we're on a talk page
	$: isTalkPage = $page.url.pathname.startsWith('/talks/');

	class Cell {
		constructor(i, j) {
			this.i = i;
			this.j = j;
			this.walls = { top: true, right: true, bottom: true, left: true };
			this.visited = false;
		}

		draw(ctx, cellSize) {
			const x = this.i * cellSize;
			const y = this.j * cellSize;

			// Use appropriate color based on theme
			const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
			ctx.strokeStyle = isDark ? '#ffffff' : '#000000';
			ctx.lineWidth = 2;

			if (this.walls.top) {
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.lineTo(x + cellSize, y);
				ctx.stroke();
			}
			if (this.walls.right) {
				ctx.beginPath();
				ctx.moveTo(x + cellSize, y);
				ctx.lineTo(x + cellSize, y + cellSize);
				ctx.stroke();
			}
			if (this.walls.bottom) {
				ctx.beginPath();
				ctx.moveTo(x + cellSize, y + cellSize);
				ctx.lineTo(x, y + cellSize);
				ctx.stroke();
			}
			if (this.walls.left) {
				ctx.beginPath();
				ctx.moveTo(x, y + cellSize);
				ctx.lineTo(x, y);
				ctx.stroke();
			}
		}

		checkNeighbors() {
			const neighbors = [];
			const top = maze[this.i]?.[this.j - 1];
			const right = maze[this.i + 1]?.[this.j];
			const bottom = maze[this.i]?.[this.j + 1];
			const left = maze[this.i - 1]?.[this.j];

			if (top && !top.visited) neighbors.push(top);
			if (right && !right.visited) neighbors.push(right);
			if (bottom && !bottom.visited) neighbors.push(bottom);
			if (left && !left.visited) neighbors.push(left);

			if (neighbors.length > 0) {
				return neighbors[Math.floor(Math.random() * neighbors.length)];
			}
			return undefined;
		}
	}

	function removeWalls(current, next) {
		const x = current.i - next.i;
		const y = current.j - next.j;

		if (x === 1) {
			current.walls.left = false;
			next.walls.right = false;
		} else if (x === -1) {
			current.walls.right = false;
			next.walls.left = false;
		}

		if (y === 1) {
			current.walls.top = false;
			next.walls.bottom = false;
		} else if (y === -1) {
			current.walls.bottom = false;
			next.walls.top = false;
		}
	}

	function initMaze() {
		// Use fixed cell size regardless of zoom level
		const baseWidth = window.innerWidth;
		const baseHeight = window.innerHeight;
		cols = Math.ceil(baseWidth / cellSize);
		rows = Math.ceil(baseHeight / cellSize);

		maze = [];
		for (let i = 0; i < cols; i++) {
			maze[i] = [];
			for (let j = 0; j < rows; j++) {
				maze[i][j] = new Cell(i, j);
			}
		}

		current = maze[0][0];
		current.visited = true;
		generationStack = [];
		isGenerating = true;
	}

	function generateMazeStep() {
		// Generate multiple cells per frame for faster generation
		for (let step = 0; step < generationSpeed; step++) {
			if (!isGenerating) break;

			const next = current.checkNeighbors();
			if (next) {
				next.visited = true;
				generationStack.push(current);
				removeWalls(current, next);
				current = next;
			} else if (generationStack.length > 0) {
				current = generationStack.pop();
			} else {
				isGenerating = false;
				// Start over after a delay
				setTimeout(() => {
					initMaze();
				}, 3000);
			}
		}
	}

	let lastDrawTime = 0;
	const drawInterval = 1000 / 20; // Limit maze to 20 FPS for performance

	function draw(timestamp) {
		// Only draw maze at lower FPS to save performance
		if (timestamp - lastDrawTime >= drawInterval) {
			lastDrawTime = timestamp;

			// Match background color to theme
			const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
			ctx.fillStyle = isDark ? '#0a0a0a' : '#ffffff';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			for (let i = 0; i < cols; i++) {
				for (let j = 0; j < rows; j++) {
					maze[i][j].draw(ctx, cellSize);
				}
			}

			if (isGenerating) {
				generateMazeStep();
			}
		}

		animationFrame = requestAnimationFrame(draw);
	}

	let resizeTimeout;
	function handleResize() {
		// Debounce resize to avoid performance issues on zoom
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			const newWidth = window.innerWidth;
			const newHeight = window.innerHeight;

			// Only regenerate if actual viewport size changed significantly
			if (Math.abs(canvas.width - newWidth) > 50 || Math.abs(canvas.height - newHeight) > 50) {
				canvas.width = newWidth;
				canvas.height = newHeight;
				canvas.style.width = '100vw';
				canvas.style.height = '100vh';
				initMaze();
			}
		}, 150);
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		// Set canvas size based on viewport, not affected by zoom
		const width = window.innerWidth;
		const height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = '100vw';
		canvas.style.height = '100vh';

		initMaze();
		draw();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	});
</script>

<canvas bind:this={canvas} id="maze-canvas" class:blurred={isTalkPage}></canvas>

<style>
	#maze-canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		opacity: 0.05;
		pointer-events: none;
		transition: filter 0.3s ease;
	}

	#maze-canvas.blurred {
		filter: blur(0.5px);
	}

	:root[data-theme='dark'] #maze-canvas.blurred {
		filter: blur(3px);
	}
</style>
