import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist/public');
const basePages = JSON.parse(await readFile(path.join(root, 'src/seo-pages.json'), 'utf8'));
const content = JSON.parse(await readFile(path.join(root, 'src/seo-content.json'), 'utf8'));
const configuredUrl = process.env.VITE_SITE_URL?.replace(/\/+$/, '');
if (configuredUrl && (!/^https:\/\/[^/?#]+$/i.test(configuredUrl) || /replit\.dev|localhost|127\.0\.0\.1/i.test(configuredUrl))) {
  throw new Error('VITE_SITE_URL must be the verified HTTPS production origin, without a path.');
}
const origin = configuredUrl || '';
const verification = process.env.GOOGLE_SITE_VERIFICATION;
if (verification && !/^[A-Za-z0-9_-]+$/.test(verification)) throw new Error('Invalid Google Search Console verification value.');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#39;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const absolute = (route) => `${origin}${route}`;
const businessId = `${origin}/#business`;
const pages = new Map(Object.entries(basePages).map(([route, page]) => [route, {
  ...page, heading: route === '/' ? 'Mercury Décor Limited — Building Beautiful Spaces' : page.eyebrow,
  body: page.description, kind: 'base', label: page.eyebrow
}]));
pages.set('/port-harcourt', {
  title: 'Finishing Services in Port Harcourt | Mercury Décor',
  description: 'Visit Mercury Décor Limited in Elekahia, Port Harcourt. Explore finishing, POP ceilings, installation, building materials supply and project support.',
  heading: 'Mercury Décor in Port Harcourt',
  body: 'Mercury Décor Limited is based at 131 Circular Road, Elekahia Housing Estate, Port Harcourt, Rivers State, Nigeria. Explore local finishing, installation and materials support and discuss projects elsewhere in Nigeria.',
  label: 'Port Harcourt', kind: 'location'
});
for (const service of content.services) pages.set(`/services/${service.slug}`, {
  title: service.metaTitle, description: service.summary, heading: service.title,
  body: `${service.intro} ${service.details}`, label: service.title,
  image: `/project-gallery-watermarked/project-${String(service.imageIndex + 1).padStart(2, '0')}.webp`,
  kind: 'service', entry: service
});
for (const category of content.categories) pages.set(`/catalogs/${category.slug}`, {
  title: category.metaTitle, description: category.summary, heading: category.title,
  body: `${category.intro} ${category.details}`, label: category.title,
  image: `/project-gallery-watermarked/project-${String(category.imageIndex + 1).padStart(2, '0')}.webp`,
  kind: 'category', entry: category
});
for (const project of content.projects) pages.set(`/catalogs/project/${project.slug}`, {
  title: `${project.title} | Mercury Décor Limited`,
  description: `${project.summary} Explore the project reference and related Mercury Décor services.`,
  heading: project.title, body: `${project.summary} ${project.detail} ${project.consideration}`, label: project.title,
  image: `/featured-projects/${project.slug}.webp`,
  kind: 'project', entry: project
});

const link = (route, title) => `<a href="${escapeHtml(route)}">${escapeHtml(title)}</a>`;
const headMeta = (html, attribute, key, value) => {
  const replacement = `<meta ${attribute}="${key}" content="${escapeHtml(value)}">`;
  const pattern = new RegExp(`<meta ${attribute}="${key}"[^>]*>`, 'i');
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace('</head>', `${replacement}\n</head>`);
};
const breadcrumb = (route, page) => {
  if (route === '/') return [{ name: 'Home', route: '/' }];
  const parent = page.kind === 'service' ? '/services' : ['category', 'project'].includes(page.kind) ? '/catalogs' : null;
  const result = [{ name: 'Home', route: '/' }];
  if (parent) result.push({ name: parent === '/services' ? 'Services' : 'Catalogs', route: parent });
  if (page.kind === 'project') result.push({ name: content.categories.find((entry) => entry.slug === page.entry.category).title, route: `/catalogs/${page.entry.category}` });
  result.push({ name: page.label, route });
  return result;
};

for (const [route, page] of pages) {
  const crumbs = breadcrumb(route, page);
  const pageUrl = absolute(route);
  const graph = origin ? [
    {
      '@type': ['Organization', 'HomeAndConstructionBusiness'],
      '@id': businessId, name: 'Mercury Décor Limited', alternateName: 'Mercury Decor Limited',
      url: absolute('/'), logo: absolute('/icon-512.png'), image: absolute('/og-image.jpg'),
      telephone: '+2348082277274', email: 'silnice873@gmail.com',
      address: {
        '@type': 'PostalAddress', streetAddress: '131 Circular Road, Elekahia Housing Estate',
        addressLocality: 'Port Harcourt', addressRegion: 'Rivers State', addressCountry: 'NG'
      },
      areaServed: [{ '@type': 'City', name: 'Port Harcourt' }, { '@type': 'AdministrativeArea', name: 'Rivers State' }, { '@type': 'Country', name: 'Nigeria' }]
    },
    { '@type': 'WebSite', '@id': absolute('/#website'), name: 'Mercury Décor Limited', url: absolute('/'), publisher: { '@id': businessId }, inLanguage: 'en-NG' },
    {
      '@type': page.kind === 'category' ? 'CollectionPage' : 'WebPage', '@id': `${pageUrl}#webpage`,
      url: pageUrl, name: page.title, description: page.description, isPartOf: { '@id': absolute('/#website') },
      about: { '@id': businessId }, inLanguage: 'en-NG',
      breadcrumb: { '@id': `${pageUrl}#breadcrumb` }
    },
    {
      '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`,
      itemListElement: crumbs.map(({ name, route: crumbRoute }, index) => ({
        '@type': 'ListItem', position: index + 1, name, item: absolute(crumbRoute)
      }))
    }
  ] : [];
  if (origin && page.kind === 'service') graph.push({
    '@type': 'Service', '@id': `${pageUrl}#service`, name: page.entry.title,
    description: page.description, url: pageUrl, provider: { '@id': businessId },
    areaServed: { '@type': 'AdministrativeArea', name: 'Rivers State, Nigeria' }
  });
  if (origin && page.kind === 'project') graph.push({
    '@type': 'ImageObject', '@id': `${pageUrl}#image`, name: page.entry.title,
    description: page.entry.summary, contentUrl: absolute(page.image),
    creator: { '@id': businessId }
  });
  if (origin && route === '/catalogs') {
    const videoFiles = ['03', '02', '04', '05', '06', '01', '07', '08', '09', '10', '11', '12', '13', '14', '15'];
    content.videos.forEach((name, index) => graph.push({
      '@type': 'VideoObject', '@id': `${pageUrl}#video-${index + 1}`, name,
      description: `${name}. A short Mercury Décor Limited project reference video showing finishing and building details.`,
      thumbnailUrl: absolute(`/project-videos/video-${videoFiles[index]}-poster.jpg`),
      contentUrl: absolute(`/project-videos/video-${videoFiles[index]}.mp4`),
      publisher: { '@id': businessId }
    }));
  }

  let html = template.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);
  html = headMeta(html, 'name', 'description', page.description);
  html = headMeta(html, 'name', 'robots', origin
    ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    : 'noindex, follow');
  for (const [attribute, key, value] of [
    ['property', 'og:title', page.title], ['property', 'og:description', page.description],
    ['property', 'og:url', pageUrl], ['property', 'og:image', absolute(page.image || '/og-image.jpg')],
    ['name', 'twitter:title', page.title], ['name', 'twitter:description', page.description],
    ['name', 'twitter:image', absolute(page.image || '/og-image.jpg')]
  ]) {
    if (origin || !['og:url', 'og:image', 'twitter:image'].includes(key)) html = headMeta(html, attribute, key, value);
  }
  // The shared preview image is 1200×630; project images have their own proportions.
  if (page.image) {
    html = html.replace(/<meta property="og:image:(width|height)"[^>]*>\s*/gi, '');
    html = headMeta(html, 'property', 'og:image:alt', page.heading);
  }
  const contentLinks = page.kind === 'category'
    ? content.projects.filter((item) => item.category === page.entry.slug).map((item) => link(`/catalogs/project/${item.slug}`, item.title))
    : page.kind === 'service'
      ? [link(`/catalogs/${page.entry.category}`, 'Related project catalog'), link('/contact', 'Discuss your project')]
      : page.kind === 'project'
        ? [link(`/catalogs/${page.entry.category}`, 'Related project gallery'), link('/contact', 'Contact Mercury Décor')]
        : page.kind === 'location'
          ? content.services.map((service) => link(`/services/${service.slug}`, service.title))
          : [
              ...content.services.map((service) => link(`/services/${service.slug}`, service.title)),
              ...content.categories.map((category) => link(`/catalogs/${category.slug}`, category.title)),
              link('/port-harcourt', 'Port Harcourt location')
            ];
  const imageMarkup = page.image ? `<figure><img src="${escapeHtml(page.image)}" alt="${escapeHtml(page.entry?.summary || page.heading)}" width="720" height="540" loading="lazy"><figcaption>${escapeHtml(page.entry?.summary || page.heading)}</figcaption></figure>` : '';
  const staticContent = `<header><nav aria-label="Breadcrumb">${crumbs.map((item) => link(item.route, item.name)).join(' / ')}</nav></header><main><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.description)}</p><p>${escapeHtml(page.body)}</p>${imageMarkup}<nav aria-label="Related pages">${contentLinks.join(' · ')}</nav></main><footer><p>Mercury Décor Limited · 131 Circular Road, Elekahia Housing Estate, Port Harcourt, Rivers State, Nigeria · +234 808 227 7274 · silnice873@gmail.com</p></footer>`;
  html = html.replace('<div id="root"></div>', `<div id="root">${staticContent}</div>`);
  if (verification) html = html.replace('</head>', `  <meta name="google-site-verification" content="${verification}">\n</head>`);
  if (origin) html = html.replace('</head>', `  <link rel="canonical" href="${escapeHtml(pageUrl)}">\n  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c')}</script>\n</head>`);
  const target = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
}

// A sitemap and canonical URLs must never contain a development address or fabricated domain.
if (origin) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...pages].map(([route]) => `  <url><loc>${escapeHtml(absolute(route))}</loc></url>`).join('\n')}\n</urlset>\n`;
  await writeFile(path.join(dist, 'sitemap.xml'), xml);
} else await rm(path.join(dist, 'sitemap.xml'), { force: true });
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n${origin ? `\nSitemap: ${origin}/sitemap.xml\n` : ''}`);
let notFound = template.replace(/<title>.*?<\/title>/i, '<title>Page Not Found | Mercury Décor Limited</title>');
notFound = headMeta(notFound, 'name', 'robots', 'noindex, follow');
notFound = notFound.replace('<div id="root"></div>', `<div id="root"><main><h1>Page not found</h1><p>This page is unavailable. ${link('/', 'Return to Mercury Décor Limited')}</p></main></div>`);
await writeFile(path.join(dist, '404.html'), notFound);
console.log(`Generated ${pages.size} crawlable HTML routes${origin ? ` and a sitemap for ${origin}` : ' (production origin needed for canonicals and sitemap)'}.`);