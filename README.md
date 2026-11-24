# Kuji Digital — Multi-page website

A responsive digital agency website for Kuji Digital, an AI-powered digital services concept.

## Pages and files

- `index.html` — homepage, services, and project inquiry form
- `about.html` — studio mission and working principles
- `projects.html` — concept portfolio and interactive scripted chatbot demo
- `how-it-works.html` — project process and frequently asked questions
- `styles.css` — shared responsive visual system, glass styling, and animations
- `script.js` — mobile navigation, scroll reveals, inquiry email preparation, and quick-reply customer chatbot
- `assets/favicon.svg` — custom brand favicon

## Preview

Open `index.html` in a browser. For a public website, enable GitHub Pages in the repository settings or connect the repository to a static hosting provider.

## Before publishing

1. Confirm the contact email in `script.js`.
2. Review service descriptions and ensure they match the services actually offered.
3. The project cards are clearly marked as concept demonstrations; replace them with real work as the portfolio grows.
4. The floating customer chatbot uses a local FAQ knowledge base and replies after a short 550 ms typing indicator. It does not call a live AI model or send customer messages to a server.
5. The inquiry form opens a prefilled email in the visitor's email app; it does not store or submit form data to a server.
6. Test all pages and forms on mobile and desktop.
7. Connect a custom domain if desired.

## Brand tokens

- Obsidian: `#09090D`
- Graphite: `#191923`
- Violet: `#9274FF`
- Cloud: `#F8F8FC`
- Typeface: Inter

Tagline: **Your business. Automated.**
