# Ember & Oak

Website for Ember & Oak, a small neighbourhood café and bakery.

Built with Vite, React and React Router. There is no backend: all content lives in local data files and forms only show a confirmation message.

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173. The port is fixed (`strictPort`), so if something else is already using 5173 the server will exit instead of picking a different port.

## Scripts

- `npm run dev` – start the development server on port 5173
- `npm run build` – create a production build in `dist/`
- `npm run preview` – serve the production build locally
