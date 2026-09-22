# Mercury Décor Limited

Mercury Décor Limited is a responsive corporate website and digital showroom for a Nigerian interior and exterior finishing, construction, procurement, supply, logistics, and project-support company. The site presents the company’s services, industries, completed work, project videos, and enquiry paths for clients working locally or globally.

## Contents

- [What the site includes](#what-the-site-includes)
- [Routes](#routes)
- [Technology](#technology)
- [Project structure](#project-structure)
- [Run locally](#run-locally)
- [Build and preview](#build-and-preview)
- [Configuration](#configuration)
- [Managing content and media](#managing-content-and-media)
- [SEO](#seo)
- [Deployment](#deployment)
- [Contact details](#contact-details)
- [Verification checklist](#verification-checklist)

## What the site includes

- Responsive homepage with:
  - Video-backed hero section
  - Introduction and selected project imagery
  - Media-led Project Confidence section
  - Latest catalog preview
  - Project video showroom
  - Media-led Selected Services cards
  - Spaces in Context image/video mosaic
  - Quote and WhatsApp calls to action
- About page describing Mercury Décor’s capabilities and delivery approach.
- Services page with detailed service cards, service-specific enquiry actions, and supporting project imagery.
- Catalogs page with:
  - Project image gallery
  - Catalog category cards
  - Filtering for project collections
  - Responsive layouts
  - Image lightbox with keyboard navigation
  - Catalog enquiry and WhatsApp actions
- Industries page for residential, commercial, corporate, and construction work.
- Contact page with:
  - Quote form
  - Email and phone links
  - WhatsApp enquiry link
  - Google Maps location embed
- SEO metadata, canonical URLs, Open Graph tags, Twitter metadata, JSON-LD schema, sitemap, robots file, and a generated 404 page.
- Lazy-loaded image and video media with posters and fallback handling.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage and digital showroom preview |
| `/about` | Company overview and capabilities |
| `/services` | Service catalogue and service-specific enquiries |
| `/catalogs` | Full project image catalog and lightbox |
| `/industries` | Sectors and project contexts served |
| `/contact` | Quote request, contact details, and map |

The application uses Wouter for client-side routing. The Replit artifact serves the SPA fallback for direct visits to nested routes.

## Technology

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Wouter
- Lucide React
- React Icons
- TanStack React Query
- pnpm workspaces
- Replit artifact hosting

The Mercury Décor frontend is primarily a static, client-rendered marketing site. It does not require a database or API request to render its core pages. The repository also contains separate workspace artifacts, including an API server and a mockup sandbox.

## Project structure

```text
.
├── artifacts/
│   ├── api-server/                  # Shared API artifact
│   ├── mercury-decor/               # This website
│   │   ├── .replit-artifact/
│   │   │   └── artifact.toml        # Preview and production artifact config
│   │   ├── public/
│   │   │   ├── project-gallery/     # Clean project images
│   │   │   ├── project-gallery-watermarked/
│   │   │   ├── project-videos/      # WebM, MP4, and poster assets
│   │   │   ├── futuristic-gallery/
│   │   │   ├── futuristic-gallery-clean/
│   │   │   └── video/               # Homepage video assets
│   │   ├── scripts/
│   │   │   └── generate-seo.mjs     # Static metadata and sitemap generation
│   │   ├── src/
│   │   │   ├── App.tsx              # Routes, content data, and page components
│   │   │   ├── index.css            # Global styles and design tokens
│   │   │   ├── seo-pages.json       # Route-level SEO content
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── pages/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   └── mockup-sandbox/               # Component preview artifact
├── attached_assets/                  # Source assets supplied to the workspace
├── package.json                       # Workspace scripts and pnpm version
└── pnpm-workspace.yaml                # Workspace packages and dependency policy
```

## Run locally

### Prerequisites

- Node.js 24 or later
- pnpm 10.26.1, as pinned in the root `package.json`

Install dependencies from the repository root:

```bash
pnpm install
```

Start the Mercury Décor development server:

```bash
pnpm --filter @workspace/mercury-decor run dev
```

The Vite server uses the `PORT` environment variable when one is provided. Replit’s managed web workflow supplies the correct port and base path automatically.

## Build and preview

Run the frontend typecheck:

```bash
pnpm --filter @workspace/mercury-decor run typecheck
```

Create the production bundle and generate SEO files:

```bash
pnpm --filter @workspace/mercury-decor run build
```

The build output is written to:

```text
artifacts/mercury-decor/dist/public/
```

Preview the production bundle locally:

```bash
pnpm --filter @workspace/mercury-decor run serve
```

Workspace-wide checks are also available:

```bash
pnpm run typecheck
pnpm run build
```

## Configuration

The Vite configuration reads these values:

| Variable | Purpose | Default |
| --- | --- | --- |
| `PORT` | Development or preview server port | `5173` |
| `BASE_PATH` | Vite base path used by the Replit artifact router | `/` |
| `VITE_SITE_URL` | Canonical public URL used during SEO generation | `http://localhost:4173` |
| `RENDER_EXTERNAL_URL` | Fallback public URL for SEO generation on Render-style hosting | Not set |

The production artifact configuration is in `artifacts/mercury-decor/.replit-artifact/artifact.toml`. It builds the frontend, serves the static `dist/public` directory, and rewrites unknown paths to `index.html` for client-side routing.

The website currently has no required frontend secrets. Contact actions use the company’s public phone, email, and WhatsApp details.

## Managing content and media

### Page and catalog content

The current content data and page composition live in `artifacts/mercury-decor/src/App.tsx`. The main reusable data collections include:

- `services` — service names, descriptions, items, icons, and service numbers.
- `galleryImages` — catalog image paths, alt text, portrait flags, and concept flags.
- `showroomImages` — clean-image equivalents derived from `galleryImages`.
- `projectVideos` — video sources, WebM fallback sources, posters, titles, and descriptions.
- `catalogs` — catalog category cards and category-specific enquiry metadata.
- `contextMedia` and `selectedServiceMedia` — media selections used by the homepage visual sections.

When adding a catalog item:

1. Add the image asset to the appropriate public directory.
2. Keep the clean and watermarked image filenames aligned when both versions are needed.
3. Add a descriptive `galleryImages` entry with meaningful alt text.
4. Update any collection filters or featured-media selections that should include the item.
5. Run the typecheck and production build.

Files in `public/` are served from the site root after the Vite base path is applied. Use paths built with `import.meta.env.BASE_URL` in React code, as the existing media arrays do.

### Images

The site uses two image variants:

- `public/project-gallery/` contains clean images for showroom and editorial presentations.
- `public/project-gallery-watermarked/` contains watermarked catalog images.

The `showroomImages` mapping swaps the watermarked directory for the clean directory. Catalog presentation uses the watermarked source and may also render the shared watermark overlay.

Use:

- Descriptive filenames such as `project-01.jpg`.
- Descriptive alt text that identifies the space or finish.
- `loading="lazy"` for below-the-fold media.
- `decoding="async"` for gallery and showroom images.

### Videos

Each project video should have:

```text
project-videos/
├── video-##.webm
├── video-##.mp4
└── video-##-poster.jpg
```

The application deliberately lists WebM before MP4 in `<video>` source lists. Keep that ordering for browser compatibility. A poster image is required so the layout remains useful before playback begins or when a browser cannot decode the video.

The reusable video components lazy-load sources with `IntersectionObserver`, autoplay muted videos where appropriate, loop them, and fall back to their poster when playback fails.

### Contact and WhatsApp

Contact details are currently defined in the React content and contact components:

- Phone: `+234 808 227 7274`
- WhatsApp: `+234 707 670 3296` (`07076703296`)
- Email: `silnice873@gmail.com`
- Address: `131 Circular Road, Elekahia Housing Estate, Port Harcourt, Rivers State, Nigeria`

If these details change, update the footer, contact page, structured SEO data, and WhatsApp link generation together.

## SEO

Route-level SEO content is maintained in:

```text
artifacts/mercury-decor/src/seo-pages.json
```

The production build runs `scripts/generate-seo.mjs`, which:

- Creates route-specific `index.html` files.
- Updates title, description, Open Graph, and Twitter metadata.
- Adds canonical URLs.
- Adds LocalBusiness, HomeAndConstructionBusiness, WebSite, BreadcrumbList, and homepage VideoObject schema where applicable.
- Generates `sitemap.xml`.
- Generates `robots.txt`.
- Generates `404.html`.

Set `VITE_SITE_URL` to the public canonical URL when generating production SEO output. Do not construct production URLs from local development domains.

## Deployment

The Mercury Décor artifact is configured as a static web service:

1. Build with:

   ```bash
   pnpm --filter @workspace/mercury-decor run build
   ```

2. Serve:

   ```text
   artifacts/mercury-decor/dist/public
   ```

3. Keep the SPA rewrite from `/*` to `/index.html` enabled so direct visits to `/about`, `/services`, `/catalogs`, `/industries`, and `/contact` work in production.

On Replit, use the managed `artifacts/mercury-decor: web` workflow. It provides the artifact port and base-path settings required by the preview proxy.

## Contact details

Mercury Décor Limited  
131 Circular Road  
Elekahia Housing Estate  
Port Harcourt, Rivers State  
Nigeria

- Phone: [+234 808 227 7274](tel:+2348082277274)
- Email: [silnice873@gmail.com](mailto:silnice873@gmail.com)
- WhatsApp: [Start an enquiry](https://wa.me/2347076703296)

## Verification checklist

Before handing off a change:

```bash
pnpm --filter @workspace/mercury-decor run typecheck
pnpm --filter @workspace/mercury-decor run build
git diff --check
```

For UI changes, also verify:

- Homepage and every listed route load directly.
- Desktop and mobile layouts remain readable.
- Images have useful alt text and load from the correct base path.
- Videos have WebM and MP4 sources plus posters.
- Catalog lightbox keyboard navigation still works.
- Quote and WhatsApp actions retain their service context.
- Generated SEO files reflect any changed route copy.