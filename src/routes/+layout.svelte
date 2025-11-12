<script>
	import '../app.css';
	import MazeBackground from '$lib/MazeBackground.svelte';
	import DarkModeToggle from '$lib/DarkModeToggle.svelte';
	import CustomCursor from '$lib/CustomCursor.svelte';
	import ZoomWarning from '$lib/ZoomWarning.svelte';
</script>

<MazeBackground />
<DarkModeToggle />
<CustomCursor />
<ZoomWarning />

<slot />
