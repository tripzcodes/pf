# my portfolio

## what this is

a portfolio site with my name, a quote, and links to find me. kept it simple with clean typography and an animated maze background.

## running locally

install node.js, then:

```bash
npm install
npm run dev
```

open localhost:5173 in your browser.

## tech stack

- sveltekit
- canvas api for the maze (recursive backtracking algorithm)
- pure css
- inter and ibm plex mono fonts

## features

**dark mode** - toggle button in the top right. switches between light and dark themes. saves your preference.

**custom cursor** - a dot that expands when you hover over links. only shows on desktop.

**maze background** - generates slowly in the background. runs at 20fps for performance. automatically regenerates when done.

## customization

want to use this for your own portfolio? here's how:

**update your info** - edit `src/routes/+page.svelte` to change the name, quote, and contact links

**change colors** - theme colors are in `src/app.css` under the `:root[data-theme]` sections

**adjust the maze** - settings are in `src/lib/MazeBackground.svelte` (cell size, generation speed, fps)

## project structure

```
src/
  routes/
    +layout.svelte  - main wrapper with maze and cursor
    +page.svelte    - portfolio content
  lib/
    MazeBackground.svelte  - maze generation
    DarkModeToggle.svelte  - theme toggle
    CustomCursor.svelte    - custom cursor
    ZoomWarning.svelte     - zoom warning overlay
  app.css  - global styles
```

## performance

the maze renders at 20fps to keep things smooth. cursor runs at 60fps for responsiveness. resize events are debounced so the maze doesn't regenerate constantly.

## mobile support

fully responsive. custom cursor is hidden on mobile devices.

## links

- github: [@tripzcodes](https://github.com/tripzcodes)
- twitter: [@tripz_cs](https://twitter.com/tripz_cs)
- linkedin: [youssef ashraf](https://www.linkedin.com/in/youssefashraf-/)
- email: tripzcodes@gmail.com

---

built with sveltekit / 2025
