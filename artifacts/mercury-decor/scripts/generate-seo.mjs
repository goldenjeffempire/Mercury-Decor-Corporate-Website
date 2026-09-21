import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist/public');
const pages = JSON.parse(await readFile(path.join(root, 'src/seo-pages.json'), 'utf8'));
const siteUrl = (process.env.VITE_SITE_URL || process.env.RENDER_EXTERNAL_URL || 'http://localhost:4173').replace(/\/$/, '');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const setMeta = (html, selector, attribute, value) => {
  const escaped = escapeHtml(value);
  const pattern = new RegExp(`<meta (${selector}=\"${attribute}\")[^>]*>`, 'i');
  const replacement = `<meta ${selector}="${attribute}" content="${escaped}">`;
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace('</head>', `  ${replacement}\n  </head>`);
};

for (const [route, page] of Object.entries(pages)) {
  const canonical = `${siteUrl}${route === '/' ? '/' : route}`;
  const image = `${siteUrl}/og-image.jpg`;
  const breadcrumbs = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
    ...(route === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: page.eyebrow, item: canonical }])
  ];
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
      '@id': `${siteUrl}/#business`,
      name: 'Mercury Décor Limited',
      url: `${siteUrl}/`,
      image,
      logo: `${siteUrl}/icon-512.png`,
      telephone: '+2348082277274',
      email: 'silnice873@gmail.com',
      description: pages['/'].description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '131 Circular Road, Elekahia Housing Estate',
        addressLocality: 'Port Harcourt',
        addressRegion: 'Rivers State',
        addressCountry: 'NG'
      },
      areaServed: { '@type': 'AdministrativeArea', name: 'Rivers State, Nigeria' },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+2348082277274',
        contactType: 'customer service',
        availableLanguage: 'English'
      },
      sameAs: [`https://wa.me/2348082277274`]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: 'Mercury Décor Limited',
      publisher: { '@id': `${siteUrl}/#business` },
      inLanguage: 'en-NG'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs
    }
  ];
  if (route === '/') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Mercury Décor project walkthroughs',
      description: 'Video walkthroughs of interior finishes, decorative work, exterior surfaces and completed spaces.',
      thumbnailUrl: [`${siteUrl}/project-videos/video-03-poster.jpg`],
      contentUrl: `${siteUrl}/project-videos/video-03.mp4`,
      uploadDate: '2026-09-21T00:00:00+01:00'
    });
  }

  let html = template.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);
  html = setMeta(html, 'name', 'description', page.description);
  html = setMeta(html, 'property', 'og:title', page.title);
  html = setMeta(html, 'property', 'og:description', page.description);
  html = setMeta(html, 'property', 'og:url', canonical);
  html = setMeta(html, 'property', 'og:image', image);
  html = setMeta(html, 'name', 'twitter:title', page.title);
  html = setMeta(html, 'name', 'twitter:description', page.description);
  html = setMeta(html, 'name', 'twitter:image', image);
  html = html.replace('</head>', `  <link rel="canonical" href="${canonical}">\n  <script type="application/ld+json">${JSON.stringify(schemas)}</script>\n  </head>`);
  const target = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.entries(pages).map(([route, page]) => `  <url>\n    <loc>${siteUrl}${route === '/' ? '/' : route}</loc>\n    <lastmod>2026-09-21</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

let notFound = template.replace(/<title>.*?<\/title>/i, '<title>Page Not Found | Mercury Décor Limited</title>');
notFound = setMeta(notFound, 'name', 'description', 'The requested page could not be found.');
notFound = setMeta(notFound, 'name', 'robots', 'noindex, nofollow');
await writeFile(path.join(dist, '404.html'), notFound);

console.log(`Generated SEO pages for ${Object.keys(pages).length} routes at ${siteUrl}`);