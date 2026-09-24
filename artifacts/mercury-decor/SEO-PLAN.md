# Mercury Décor Limited — SEO implementation and release audit

This is a relevance and indexing plan, not a promise of rankings. No search volume, ranking position, review, opening hour, or completion date is claimed without evidence.

## Search intent and page map

| Intent | Target URL | On-page evidence |
| --- | --- | --- |
| Brand and finishing company in Port Harcourt | `/` and `/about` | Company name, service scope, location and contact |
| Interior and exterior finishing / painting / screeding | `/services/interior-exterior-finishing` | Service scope, selected finishes and related examples |
| POP ceilings / plasterboard ceilings | `/services/pop-ceilings-total-finishing` | Ceiling scope and corresponding catalog |
| Building, roofing, handrails and installation | `/services/building-installation` | Scope and relevant visual references |
| Construction material procurement | `/services/building-materials-procurement` | Materials and enquiry requirements |
| Project logistics and support | `/services/logistics-project-support` | Support scope and enquiry requirements |
| General contracting | `/services/general-contracting` | Project types and initial brief |
| Location-specific business/contact intent | `/port-harcourt` and `/contact` | Verbatim NAP and enquiry route |
| Visual inspiration / proof of work | `/catalogs`, four category URLs and twelve curated image-detail URLs | Real visual references, captions, observations and related services |

The catalog keeps concept images separate from real-work references. Avoid making an individual SEO page for every photograph, generic locality, or unverified service area. Expand a project page only if there is genuinely new evidence or useful firsthand detail.

## What the site now does

- Build emits 29 distinct HTML routes with content, one H1, unique title and description, internal navigation, canonical URLs, Open Graph/Twitter metadata, Schema.org JSON-LD and an absolute-URL sitemap. All production URLs use `https://www.mercurydecorlimited.com.ng`, configured in `src/site-config.json`. The apex domain redirects to `www`. Structured data describes the business, website, breadcrumb trails, services, curated images and catalog videos; it makes no offers, review or rating claims.
- Unknown paths use a custom `404.html`; no catch-all production rewrite converts missing pages to HTTP 200. A single preferred URL omits the trailing slash; client navigation normalizes accidental trailing slashes.
- The project gallery uses compressed WebP versions of the existing images; curated images also have descriptive URLs. The original JPG assets remain for compatibility, and project video loading remains deferred outside its visible area.
- Internal links connect the primary pages, service cards, catalog categories, curated projects, breadcrumbs, the footer, contact actions and the Port Harcourt page. There are no keyword doorway pages or duplicated project templates presented as unique work.

## Release requirements: not yet completed

1. **Redeploy the updated build to the existing website.** On 24 September 2026 the live apex redirected to `https://www.mercurydecorlimited.com.ng`, but live service pages still contained `noindex` and the live sitemap listed the old `mercury-decor-limited.onrender.com` host. This change fixes the generated files but cannot change the currently published responses without a redeploy. `src/site-config.json` is now the one source for the canonical origin; an old `VITE_SITE_URL` value is no longer used.
2. After redeploying, visit the public `/robots.txt`, `/sitemap.xml`, homepage, one service, one category, one project, `/port-harcourt`, `/contact` and an unknown path. Confirm all preferred pages return HTTP 200 with HTTPS `www` self-canonicals, unknown paths return HTTP 404, images and videos load, and no page source contains `localhost`, the old Render host or `noindex`. The apex should continue to redirect to `www`. The development preview stays blocked by its development-only robots file and uses `noindex` in the browser.
3. In **Google Search Console**, verify ownership of the production domain using a method the owner controls. A supplied HTML-tag verification value can be set as `GOOGLE_SITE_VERIFICATION` at build time; do not ask an agent to paste credentials into source code. Submit the **production** sitemap URL, inspect representative service/category/project pages, request indexing for important URLs, then monitor indexing coverage, Core Web Vitals and queries. Submitting a sitemap is not the same as having pages indexed.
4. In **Google Business Profile**, the owner should claim or verify the legitimate profile, use the exact name **Mercury Décor Limited**, address **131 Circular Road, Elekahia Housing Estate, Port Harcourt, Rivers State, Nigeria**, phone **+234 808 227 7274**, and email **silnice873@gmail.com** consistently. Add a verified website URL, appropriate primary/secondary categories, accurate hours, real photographs and a truthful service description. Do not invent opening hours, service areas, reviews or keywords in the business name. Only mark an address as customer-facing if that is true. Request genuine customer reviews without incentives; reply to them factually.
5. Check that other legitimate mentions/directories use the same NAP and the preferred `www` website URL. Avoid bulk low-quality directory submissions or bought links. If the business has project permission and original documentation, add evidence-rich case studies and helpful local pages, not repeated city-name permutations.

## QA performed before publication

A production-style audit checked 29 HTML routes, 29 unique titles, 29 unique descriptions, canonical consistency, schema JSON parsing, internal links, static preview images and all sitemap entries. Desktop and mobile screenshots of a project and catalog category rendered without browser errors. This does **not** measure live search performance or replace Search Console verification.

## What to measure after launch

Record a baseline in Search Console: indexed pages, impressions/clicks for branded and relevant service queries, pages with impressions, and Core Web Vitals. Review monthly for missing pages, incorrect canonicals, content that users find unhelpful and broken media. Compare actual search queries to the page map before adding content. Google determines rankings and indexing; neither is guaranteed.