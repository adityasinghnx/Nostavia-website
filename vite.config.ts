import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { HUMAN_OS_PATH, SITE_ORIGIN, systemPath, systems } from './src/content/human-os';

/* Indexable routes. Aliases that render the same page (e.g. /solutions/voice-agents) are left out. */
const STATIC_ROUTES = [
  '/',
  '/platform',
  '/pricing',
  '/security',
  '/clinical',
  '/company',
  '/demo',
  '/industries/diagnostic-labs',
  '/industries/clinics',
  '/industries/hospitals',
  '/industries/supplements',
  '/solutions/engineering',
  '/solutions/storyhealth',
  '/solutions/gravity',
  '/solutions/front-desk',
  '/solutions/hospitals',
  '/solutions/comet',
];

const buildSitemap = () => {
  // Human OS routes come from the content file so new systems are picked up automatically.
  const routes = [...STATIC_ROUTES, HUMAN_OS_PATH, ...systems.map((s) => systemPath(s.slug))];
  const urls = routes.map((r) => `  <url><loc>${SITE_ORIGIN}${r}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

const sitemap = (): Plugin => ({
  name: 'nostavia-sitemap',
  configureServer(server) {
    server.middlewares.use('/sitemap.xml', (_req, res) => {
      res.setHeader('Content-Type', 'application/xml');
      res.end(buildSitemap());
    });
  },
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap() });
  },
});

export default defineConfig({
  plugins: [react(), sitemap()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
