import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { SITE_ORIGIN, STUDIO_PATH } from './src/content/site';
import { HUMAN_OS_PATH } from './src/content/human-os';
import { buildVCard, founders, vcardPath } from './src/content/founders';

/* Indexable routes. Old routes redirect (vercel.json) and are left out. */
const ROUTES = ['/', HUMAN_OS_PATH, STUDIO_PATH, '/hive', '/customers', '/developers', '/demo'];

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

/* Founder contact cards (/aditya.vcf, /anushka.vcf), built from src/content/founders.ts with the photo embedded. */
const founderVCard = (slug: string) => {
  const f = founders.find((x) => x.slug === slug)!;
  const src = f.photo && (f.photo.contact ?? f.photo.src);
  const file = src && path.resolve(__dirname, 'public', src.replace(/^\//, ''));
  const photo =
    file && fs.existsSync(file)
      ? { base64: fs.readFileSync(file).toString('base64'), type: /\.png$/i.test(file) ? ('PNG' as const) : ('JPEG' as const) }
      : undefined;
  return buildVCard(f, photo);
};

const vcards = (): Plugin => ({
  name: 'nostavia-founder-vcards',
  configureServer(server) {
    founders.forEach((f) =>
      server.middlewares.use(vcardPath(f), (_req, res) => {
        res.setHeader('Content-Type', 'text/vcard; charset=utf-8');
        res.end(founderVCard(f.slug));
      }),
    );
  },
  generateBundle() {
    founders.forEach((f) => this.emitFile({ type: 'asset', fileName: vcardPath(f).slice(1), source: founderVCard(f.slug) }));
  },
});

export default defineConfig({
  plugins: [react(), sitemap(), vcards()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
