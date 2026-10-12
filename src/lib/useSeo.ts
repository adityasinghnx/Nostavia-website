import { useEffect } from 'react';
import { SITE_ORIGIN } from '../content/human-os';

interface SeoOptions {
  title: string;
  description: string;
  /** Path starting with "/", used for the canonical and og:url. */
  path: string;
  type?: 'website' | 'article';
}

const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  const previous = el?.getAttribute('content') ?? null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  return () => {
    if (previous === null) el?.remove();
    else el?.setAttribute('content', previous);
  };
};

/**
 * Sets per-page title, description, canonical and Open Graph tags, and restores
 * the index.html defaults on unmount so other routes keep their own metadata.
 */
export const useSeo = ({ title, description, path, type = 'website' }: SeoOptions) => {
  useEffect(() => {
    const url = `${SITE_ORIGIN}${path}`;
    const previousTitle = document.title;
    document.title = title;

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute('href') ?? null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const restores = [
      upsertMeta('name', 'description', description),
      upsertMeta('property', 'og:title', title),
      upsertMeta('property', 'og:description', description),
      upsertMeta('property', 'og:url', url),
      upsertMeta('property', 'og:type', type),
      upsertMeta('property', 'og:site_name', 'Nostavia Health'),
      upsertMeta('name', 'twitter:card', 'summary'),
      upsertMeta('name', 'twitter:title', title),
      upsertMeta('name', 'twitter:description', description),
    ];

    return () => {
      document.title = previousTitle;
      if (previousCanonical === null) canonical?.remove();
      else canonical?.setAttribute('href', previousCanonical);
      restores.forEach((restore) => restore());
    };
  }, [title, description, path, type]);
};
