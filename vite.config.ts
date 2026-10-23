import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { SITE_ORIGIN, STUDIO_PATH } from './src/content/site';
import { HUMAN_OS_PATH } from './src/content/human-os';

/* Indexable routes. Old routes redirect (vercel.json) and are left out. */
const ROUTES = ['/', '/superintelligence', '/hive', HUMAN_OS_PATH, STUDIO_PATH, '/customers', '/developers', '/demo'];

const buildSitemap = () => {
  const urls = ROUTES.map((r) => `  <url><loc>${SITE_ORIGIN}${r}</loc></url>`).join('\n');
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
