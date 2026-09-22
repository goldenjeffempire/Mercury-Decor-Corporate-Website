import { type AnchorHTMLAttributes, type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight, Boxes, Building2, Check, ChevronDown, ChevronLeft, ChevronRight,
  ClipboardList, Compass, Hammer, Layers3, Mail, MapPin, Menu, PackageCheck,
  Phone, Ruler, Send, Sparkles, Truck, X, type LucideIcon,
} from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import logoPath from '@/assets/mercury-logo-sharp.png';
import seoPages from '@/seo-pages.json';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const whatsappNumber = '2347076703296';
const whatsappMessage = 'Hello Mercury Décor Limited, I would like to make an enquiry about your services.';
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
const galleryImages = [
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-01.jpg`, alt: 'Rivers State Government Projects, Port Harcourt: EZE OHA APARA, RUMIGBO PALACE', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-02.jpg`, alt: 'Rivers State Government Projects, Port Harcourt: EZE OHA APARA, RUMIGBO PALACE', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-03.jpg`, alt: 'Residential interior finishing and ceiling details', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-04.jpg`, alt: 'White residential building exterior with fountain', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-05.jpg`, alt: 'Residential interior finishing with recessed ceiling lighting', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-06.jpg`, alt: 'Completed white building exterior with dark roofing', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-07.jpg`, alt: 'Finished clinical ward interior', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-08.jpg`, alt: 'Finished waiting area interior', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-09.jpg`, alt: 'Completed conference room interior', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-10.jpg`, alt: 'Finished clinical room with ceiling and wall treatments', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-11.jpg`, alt: 'Completed reception area interior', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-12.jpg`, alt: 'Completed treatment room interior', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-13.jpg`, alt: 'Finished medical room interior', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-14.jpg`, alt: 'Rivers State Government Projects, Port Harcourt: Neuropsychiatric Hospital, Rumuigbo, in Port Harcourt', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-15.jpg`, alt: 'Completed institutional building exterior', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-16.jpg`, alt: 'Completed building exterior and covered entrance', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-17.jpg`, alt: 'Completed residential carport with a decorative black steel canopy', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-18.jpg`, alt: 'Decorative steel carport frame during installation at a residential property', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-19.jpg`, alt: 'Carport steel frame installation over a residential driveway', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-20.jpg`, alt: 'Red decorative steel canopy frame beside a residential gatehouse', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-21.jpg`, alt: 'Completed geometric steel canopy in a residential courtyard', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-22.jpg`, alt: 'Red steel canopy framework aligned across a paved compound', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-23.jpg`, alt: 'Custom wrought iron stair railing with a decorative scroll motif', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-24.jpg`, alt: 'Ornamental metal handrail and balustrade installation', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-25.jpg`, alt: 'Custom decorative metal balustrade panel with a circular emblem', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-26.jpg`, alt: 'Fabricated ornamental metal railing section with scrollwork', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-27.jpg`, alt: 'Decorative gate and balustrade panel with a custom circular centrepiece', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-28.jpg`, alt: 'Interior staircase balustrade installation with black metalwork', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-29.jpg`, alt: 'Completed staircase with timber handrail and decorative metal balusters', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-30.jpg`, alt: 'Stamped concrete paving with a circular grey and terracotta pattern', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-31.jpg`, alt: 'Completed terracotta stamped concrete patio finish', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-32.jpg`, alt: 'Stamped concrete terrace finished beside decorative metal railings', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-33.jpg`, alt: 'Red and white circular stamped paving pattern', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-34.jpg`, alt: 'Red stamped concrete courtyard with a contrasting circular inset', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-35.jpg`, alt: 'Bronze-toned decorative metal staircase railing', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-36.jpg`, alt: 'Covered residential driveway with coordinated balcony metalwork', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-37.jpg`, alt: 'Dark stamped concrete driveway with a curved fan pattern', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-38.jpg`, alt: 'Stainless and gold decorative balcony railing overlooking a patterned floor', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-39.jpg`, alt: 'Completed residential entrance with black and gold decorative railing', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-40.jpg`, alt: 'Staircase with polished stainless and gold balustrade details', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-41.jpg`, alt: 'Residential staircase with coordinated stainless and gold railing', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-42.jpg`, alt: 'Decorative metal balustrade with a floral centrepiece and Greek key border', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-43.jpg`, alt: 'Curved wrought iron staircase railing with scrollwork details', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-44.jpg`, alt: 'Ornate circular-patterned balcony guardrail', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-45.jpg`, alt: 'Completed driveway with black and terracotta stamped circular paving', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-46.jpg`, alt: 'Stamped concrete paving with a multicolour compass pattern', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-47.jpg`, alt: 'Polished stainless and gold stair handrail with spherical finial', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-48.jpg`, alt: 'Stainless and gold balcony railing with decorative vertical balusters', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-49.jpg`, alt: 'Black interior balcony railing with gold accent details', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-50.jpg`, alt: 'Stainless and gold stair railing with a polished feature post', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-51.jpg`, alt: 'Decorative indoor staircase railing with gold-toned balusters', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-52.jpg`, alt: 'Wrought iron railing panel with a floral tree motif', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-53.jpg`, alt: 'Curved custom wrought iron balcony railing with scrollwork', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-54.jpg`, alt: 'Decorative balcony guardrail with circular geometric panels', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-55.jpg`, alt: 'Stamped concrete driveway with bold black and terracotta target patterns', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-56.jpg`, alt: 'Stamped concrete paving with a multicolour compass star design', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-57.jpg`, alt: 'Stainless and gold stair handrail installation with a polished spherical finial', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-58.jpg`, alt: 'Stainless and gold balcony railing installation overlooking greenery', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-59.jpg`, alt: 'Black decorative interior balcony railing with scrollwork and gold accents', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-60.jpg`, alt: 'Close detail of polished stainless and gold staircase railing', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-61.jpg`, alt: 'Stainless and gold balustrade across a residential staircase', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-62.jpg`, alt: 'Decorative railing panel with a floral tree centrepiece', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-63.jpg`, alt: 'Curved wrought iron railing with layered scrollwork', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-64.jpg`, alt: 'Ornate balcony guardrail with repeating circular motifs', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-65.jpg`, alt: 'Stamped concrete driveway with black and terracotta circular patterns', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-66.jpg`, alt: 'Stamped concrete paving with a multicolour compass star centrepiece', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-67.jpg`, alt: 'White recessed ceiling panel with a crisp black rectangular border', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-68.jpg`, alt: 'Contemporary hallway ceiling with warm cove lighting and linear LED strips', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-69.jpg`, alt: 'Modern corridor with timber doors and illuminated ceiling channels', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-70.jpg`, alt: 'Decorative illuminated wall panel with geometric linear detailing', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-71.jpg`, alt: 'Layered ceiling design with black trims, warm lighting and a geometric centrepiece', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-72.jpg`, alt: 'Grey recessed ceiling with layered borders and integrated linear lights', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-73.jpg`, alt: 'Large rectangular ceiling recess with warm perimeter lighting and downlights', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-74.jpg`, alt: 'Linear illuminated ceiling with a sculptural pendant and recessed spotlights', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-75.jpg`, alt: 'Clean white ceiling installation with layered black inset borders', portrait: true },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-76.jpg`, alt: 'Warm layered ceiling lighting above a finished interior room', portrait: false },
  { src: `${import.meta.env.BASE_URL}project-gallery-watermarked/project-77.jpg`, alt: 'Contemporary ceiling with linear LED geometry, spotlights and pendant lighting', portrait: true },
  { src: `${import.meta.env.BASE_URL}futuristic-gallery/mercury-future-01.jpg`, alt: 'Futuristic luxury living room concept with sculptural ceiling and warm gold lighting', portrait: false, concept: true },
  { src: `${import.meta.env.BASE_URL}futuristic-gallery/mercury-future-02.jpg`, alt: 'Futuristic corporate lobby concept with curved ceiling and navy wall panels', portrait: false, concept: true },
  { src: `${import.meta.env.BASE_URL}futuristic-gallery/mercury-future-03.jpg`, alt: 'Futuristic Nigerian residence exterior concept illuminated at blue hour', portrait: false, concept: true },
  { src: `${import.meta.env.BASE_URL}futuristic-gallery/mercury-future-04.jpg`, alt: 'Futuristic hospitality lounge concept with layered textures and integrated lighting', portrait: false, concept: true },
  { src: `${import.meta.env.BASE_URL}futuristic-gallery/mercury-future-05.jpg`, alt: 'Futuristic staircase atrium concept with floating steps and luminous handrails', portrait: false, concept: true },
  { src: `${import.meta.env.BASE_URL}futuristic-gallery/mercury-future-06.jpg`, alt: 'Futuristic executive office concept with modular ceiling and navy-gold finishes', portrait: false, concept: true },
];
const showroomImages = galleryImages.map((image) => ({
  ...image,
  src: image.src
    .replace('project-gallery-watermarked/', 'project-gallery/')
    .replace('futuristic-gallery/', 'futuristic-gallery-clean/'),
}));
const projectVideos = [
  { src: `${import.meta.env.BASE_URL}project-videos/video-03.mp4`, webm: `${import.meta.env.BASE_URL}project-videos/video-03.webm`, poster: `${import.meta.env.BASE_URL}project-videos/video-03-poster.jpg`, title: 'Total Finishing', description: 'A walkthrough highlighting wall treatments, lighting and decorative detailing.' },
  { src: `${import.meta.env.BASE_URL}project-videos/video-02.mp4`, webm: `${import.meta.env.BASE_URL}project-videos/video-02.webm`, poster: `${import.meta.env.BASE_URL}project-videos/video-02-poster.jpg`, title: 'Total Finishing', description: 'Close-up views of columns, doors and coordinated interior finishes.' },
  { src: `${import.meta.env.BASE_URL}project-videos/video-04.mp4`, webm: `${import.meta.env.BASE_URL}project-videos/video-04.webm`, poster: `${import.meta.env.BASE_URL}project-videos/video-04-poster.jpg`, title: 'Exterior Compound Finishing', description: 'A view of exterior surfaces, access areas and surrounding finishes.' },
  { src: `${import.meta.env.BASE_URL}project-videos/video-05.mp4`, webm: `${import.meta.env.BASE_URL}project-videos/video-05.webm`, poster: `${import.meta.env.BASE_URL}project-videos/video-05-poster.jpg`, title: 'increte floor', description: 'An elevated view of a completed courtyard and patterned floor treatment.' },
  { src: `${import.meta.env.BASE_URL}project-videos/video-06.mp4`, webm: `${import.meta.env.BASE_URL}project-videos/video-06.webm`, poster: `${import.meta.env.BASE_URL}project-videos/video-06-poster.jpg`, title: 'Total Finishing', description: 'A walkthrough showing doors, wall finishes and completed interior spaces.' },
  { src: `${import.meta.env.BASE_URL}project-videos/video-01.mp4`, webm: `${import.meta.env.BASE_URL}project-videos/video-01.webm`, poster: `${import.meta.env.BASE_URL}project-videos/video-01-poster.jpg`, title: 'POP Ceilings', description: 'A detailed look at ceiling forms, transitions and finishing workmanship.' },
  { src: `${import.meta.env.BASE_URL}project-videos/video-07.mp4`, webm: `${import.meta.env.BASE_URL}project-videos/video-07.webm`, poster: `${import.meta.env.BASE_URL}project-videos/video-07-poster.jpg`, title: 'Total Finishing', description: 'A close look at a crisp ceiling installation with recessed borders and architectural lighting.' },
  { src: `${import.meta.env.BASE_URL}project-videos/video-08.mp4`, webm: `${import.meta.env.BASE_URL}project-videos/video-08.webm`, poster: `${import.meta.env.BASE_URL}project-videos/video-08-poster.jpg`, title: 'Total Finishing', description: 'A longer project view featuring layered ceiling forms, warm coves and linear LED work.' },
  { src: `${import.meta.env.BASE_URL}project-videos/video-09.mp4`, webm: `${import.meta.env.BASE_URL}project-videos/video-09.webm`, poster: `${import.meta.env.BASE_URL}project-videos/video-09-poster.jpg`, title: 'Total Finishing', description: 'Finished interior spaces where ceiling design, lighting and joinery work together.' },
  { src: `${import.meta.env.BASE_URL}project-videos/video-10.mp4`, webm: `${import.meta.env.BASE_URL}project-videos/video-10.webm`, poster: `${import.meta.env.BASE_URL}project-videos/video-10-poster.jpg`, title: 'Total Finishing', description: 'A project sequence showing the scale and geometry of a modern decorative ceiling.' },
  { src: `${import.meta.env.BASE_URL}project-videos/video-11.mp4`, webm: `${import.meta.env.BASE_URL}project-videos/video-11.webm`, poster: `${import.meta.env.BASE_URL}project-videos/video-11-poster.jpg`, title: 'Total Finishing', description: 'A room-by-room view of finished ceiling lighting and coordinated interior details.' },
  { src: `${import.meta.env.BASE_URL}project-videos/video-12.mp4`, webm: `${import.meta.env.BASE_URL}project-videos/video-12.webm`, poster: `${import.meta.env.BASE_URL}project-videos/video-12-poster.jpg`, title: 'Mercury Decor Paint', description: 'A walkthrough of layered forms, recessed lighting and finishing precision.' },
  { src: `${import.meta.env.BASE_URL}project-videos/video-13.mp4`, webm: `${import.meta.env.BASE_URL}project-videos/video-13.webm`, poster: `${import.meta.env.BASE_URL}project-videos/video-13-poster.jpg`, title: 'Total Finishing', description: 'Linear LEDs and perimeter lighting shown across a completed ceiling installation.' },
  { src: `${import.meta.env.BASE_URL}project-videos/video-14.mp4`, webm: `${import.meta.env.BASE_URL}project-videos/video-14.webm`, poster: `${import.meta.env.BASE_URL}project-videos/video-14-poster.jpg`, title: 'Total Finishing', description: 'A longer showroom view of modern ceilings, lighting and interior finishing work.' },
  { src: `${import.meta.env.BASE_URL}project-videos/video-15.mp4`, webm: `${import.meta.env.BASE_URL}project-videos/video-15.webm`, poster: `${import.meta.env.BASE_URL}project-videos/video-15-poster.jpg`, title: 'Total Finishing', description: 'A compact detail view of layered ceiling edges, downlights and illuminated forms.' },
];

const services = [
  { number: '01', title: 'Interior & Exterior Finishing', short: 'Refined surfaces, considered materials and the final layer that makes a space feel complete.', description: 'Professional finishing solutions designed to transform interior and exterior spaces with quality materials and refined workmanship.', items: ['Painting', 'Wall Screeding', 'Tiling', 'Marble-Effect Finishes', 'Graze Finishes', '3D Wall Panels', 'Stamped Flooring'], icon: Sparkles },
  { number: '02', title: 'Total Finishing', short: 'Architectural details that shape how a room carries light, movement and character.', description: 'Modern ceiling and decorative solutions designed to enhance the appearance, character and functionality of your space.', items: ['POP Ceilings', 'Plasterboard Ceilings', 'Skim Ceilings', 'Decorative Ceiling Designs'], icon: Layers3 },
  { number: '03', title: 'Building & Installation', short: 'Practical building support from structure and roofing through to the details people touch.', description: 'Reliable building and installation services supporting residential, commercial and corporate projects.', items: ['Roofing', 'Window Hoods', 'Handrails', 'Building & Installation', 'Plumbing'], icon: Hammer },
  { number: '04', title: 'Procurement & Supply', short: 'The right materials, sourced with a clear view of your project requirements.', description: 'Procurement and supply solutions helping clients source essential materials for their construction and development requirements.', items: ['Building Materials', 'Construction Materials', 'General Procurement', 'Chippings Supply'], icon: Boxes },
  { number: '05', title: 'Logistics & Support', short: 'A dependable layer for movement, storage, inspection and material coordination.', description: 'Supporting efficient movement, storage, inspection and management of goods and construction materials.', items: ['Logistics', 'Warehousing', 'Inventory Management', 'Cargo Inspection'], icon: Truck },
  { number: '06', title: 'General Contracting', short: 'A flexible project partner for the scope, scale and type of work in front of you.', description: 'Flexible contracting solutions for different project requirements, from residential developments to commercial and corporate spaces.', items: ['Residential Projects', 'Commercial Projects', 'Corporate Projects', 'General Contract Services'], icon: Building2 },
] satisfies Array<{ number: string; title: string; short: string; description: string; items: string[]; icon: LucideIcon }>;
const serviceVisuals = [
  showroomImages[16],
  showroomImages[0],
  showroomImages[13],
  showroomImages[2],
  showroomImages[14],
  showroomImages[17],
];
const selectedServiceMedia = [
  { type: 'image' as const, media: showroomImages[0] },
  { type: 'video' as const, media: projectVideos[6] },
  { type: 'image' as const, media: showroomImages[13] },
];
const contextMedia = [
  { title: 'Residential', text: 'Thoughtful finishing and building support for homes.', type: 'image' as const, media: showroomImages[0] },
  { title: 'Commercial', text: 'Practical solutions for spaces designed to work.', type: 'video' as const, media: projectVideos[2] },
  { title: 'Corporate', text: 'A considered partner for professional environments.', type: 'image' as const, media: showroomImages[7] },
  { title: 'Construction', text: 'Materials, logistics and contracting support.', type: 'video' as const, media: projectVideos[3] },
];

const catalogs = [
  { title: 'Interior & Exterior Finishing', category: 'SURFACES / 01', description: 'A considered range of finishing solutions for walls, floors and the character of a space.', image: galleryImages[0].src, icon: Ruler },
  { title: 'Total Finishing', category: 'DETAIL / 02', description: 'Ceiling forms and decorative details that bring scale, rhythm and polish overhead.', image: galleryImages[1].src, icon: Layers3 },
  { title: 'Building & Installation', category: 'BUILD / 03', description: 'Building and installation support for the practical elements that keep a project moving.', image: galleryImages[5].src, icon: Hammer },
  { title: 'Procurement & Supply', category: 'SOURCE / 04', description: 'Materials and supply support structured around what your development requires.', image: galleryImages[14].src, icon: PackageCheck },
];
const catalogFilters = [
  { id: 'all', label: 'All work' },
  { id: 'latest', label: 'Latest ceiling collection' },
  { id: 'interiors', label: 'Total Finishing' },
  { id: 'metalwork', label: 'Metalwork + paving' },
  { id: 'concepts', label: 'Future concepts' },
] as const;
type CatalogFilterId = (typeof catalogFilters)[number]['id'];
function matchesCatalogFilter(index: number, filter: CatalogFilterId) {
  if (filter === 'all') return true;
  if (filter === 'latest') return index >= 66 && index < 77;
  if (filter === 'concepts') return index >= 77;
  if (filter === 'interiors') return index < 17 || (index >= 66 && index < 77);
  return (index >= 22 && index <= 28) || (index >= 34 && index <= 43) || (index >= 46 && index <= 64);
}

const navItems = [['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Catalogs', '/catalogs'], ['Industries', '/industries'], ['Contact', '/contact']];
const description = 'Mercury Décor Limited provides professional interior and exterior finishing, construction, procurement, supply, logistics and general contracting services in Port Harcourt, Rivers State, Nigeria.';

function AppLink({ href, children, className = '', onClick, ...rest }: { href: string; children: ReactNode; className?: string; onClick?: () => void } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href' | 'className' | 'onClick'>) {
  return <Link href={href} className={className} onClick={onClick} {...rest}>{children}</Link>;
}

function Logo({ dark = false }: { dark?: boolean }) {
  return <AppLink href="/" className="group inline-flex items-center" data-testid="link-logo">
    <span className={`relative flex h-[72px] w-[124px] shrink-0 items-center justify-center overflow-hidden rounded-[3px] border bg-white px-1 shadow-sm sm:w-[142px] ${dark ? 'border-white/25' : 'border-[#d6a62a]/30'}`}>
      <img
        src={logoPath}
        alt="Mercury Décor Limited logo"
        width="2016"
        height="1172"
        className="h-full w-full object-contain"
      />
    </span>
  </AppLink>;
}

function ImageWatermark({ large = false, top = false }: { large?: boolean; top?: boolean }) {
  return <img src={logoPath} alt="" aria-hidden="true" className={`pointer-events-none absolute right-3 z-20 rounded-[2px] bg-white/85 p-1 shadow-md ${top ? 'top-3' : 'bottom-3'} ${large ? 'w-24 sm:w-32' : 'w-16 sm:w-20'}`} />;
}

function WhatsAppButton({ label = 'Chat on WhatsApp', compact = false, service }: { label?: string; compact?: boolean; service?: string }) {
  const message = service ? `Hello Mercury Décor Limited, I am interested in your ${service}. I would like to request more information and a quotation.` : whatsappMessage;
  return <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" data-testid={`link-whatsapp${service ? `-${service.toLowerCase().replaceAll(' ', '-')}` : ''}`} className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#d6a62a]/60 font-display text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d6a62a] hover:bg-[#d6a62a] hover:text-[#082b54] ${compact ? 'px-4 py-2.5' : 'px-5 py-3'}`}><SiWhatsapp size={17} />{label}</a>;
}

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={`eyebrow flex items-center gap-3 ${light ? 'text-[#d6a62a]' : 'text-[#a90000]'}`}><span className="h-px w-8 bg-current" />{children}</div>;
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}

function usePageMeta(_title: string, path: string) {
  useEffect(() => {
    const page = seoPages[path as keyof typeof seoPages] ?? seoPages['/'];
    const configuredOrigin = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '');
    const origin = configuredOrigin || window.location.origin;
    const canonicalUrl = `${origin}${path === '/' ? '/' : path}`;
    const imageUrl = `${origin}/og-image.jpg`;
    document.title = page.title;

    const setMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    setMeta('meta[name="description"]', 'name', 'description', page.description);
    setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('meta[property="og:title"]', 'property', 'og:title', page.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', page.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', page.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', page.description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [path]);
}

function QuoteButton({ service, onClick }: { service?: string; onClick?: () => void }) {
  const [, setLocation] = useLocation();
  return <button type="button" onClick={() => { setLocation(`/contact${service ? `?service=${encodeURIComponent(service)}` : ''}`); onClick?.(); }} data-testid={service ? `button-quote-${service.toLowerCase().replaceAll(' ', '-')}` : 'button-request-quote'} className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#d6a62a] px-6 py-3.5 font-display text-sm font-extrabold text-[#082b54] transition-all hover:-translate-y-0.5 hover:bg-[#f1c95b]">Request a Quote <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></button>;
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#082b54]/95 text-white backdrop-blur-md">
    <div className="container-wide flex h-[92px] items-center justify-between"><Logo dark />
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">{navItems.map(([label, href]) => <AppLink key={href} href={href} data-testid={`link-nav-${label.toLowerCase()}`} className="text-[12px] font-semibold tracking-[.08em] text-white/70 transition-colors hover:text-[#d6a62a]">{label}</AppLink>)}</nav>
      <div className="hidden items-center gap-3 lg:flex"><WhatsAppButton compact label="WhatsApp" /><QuoteButton /></div>
      <button type="button" className="rounded-full p-2 text-white lg:hidden" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)} data-testid="button-mobile-menu">{mobileOpen ? <X size={25} /> : <Menu size={25} />}</button>
    </div>
    {mobileOpen && <nav className="border-t border-white/10 bg-[#082b54] px-5 py-5 lg:hidden" aria-label="Mobile navigation"><div className="container-wide flex flex-col gap-1">{navItems.map(([label, href]) => <AppLink key={href} href={href} onClick={() => setMobileOpen(false)} data-testid={`link-mobile-nav-${label.toLowerCase()}`} className="border-b border-white/10 py-3 font-display text-sm font-semibold text-white/80">{label}</AppLink>)}<div className="mt-4"><QuoteButton onClick={() => setMobileOpen(false)} /></div><div className="mt-3"><WhatsAppButton label="Chat on WhatsApp" /></div></div></nav>}
  </header>;
}

function Footer() {
  return <><footer className="bg-[#061f3d] py-14 text-white"><div className="container-wide"><div className="grid gap-12 border-b border-white/12 pb-12 md:grid-cols-[1.2fr_.6fr_.8fr] md:items-end"><div><Logo dark /><p className="mt-6 max-w-[430px] text-sm leading-7 text-white/55">Professional interior and exterior finishing, construction, procurement, supply and project support for spaces built to make a lasting impression.</p><div className="mt-7 flex flex-wrap gap-2">{['Finishing', 'Construction', 'Procurement', 'Project support'].map((item) => <span key={item} className="rounded-full border border-white/12 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.1em] text-white/52">{item}</span>)}</div></div><nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-white/62 md:grid-cols-1">{navItems.map(([label, href]) => <AppLink key={href} href={href} data-testid={`link-footer-${label.toLowerCase()}`} className="transition-colors hover:translate-x-1 hover:text-[#d6a62a]">{label}</AppLink>)}</nav><div><div className="eyebrow text-[#d6a62a]">Contact</div><div className="mt-5 space-y-3 text-sm leading-6 text-white/62"><address className="not-italic">131 Circular Road,<br />Elekahia Housing Estate,<br />Port Harcourt, Rivers State, Nigeria</address><a href="mailto:silnice873@gmail.com" className="block transition-colors hover:text-white" data-testid="link-footer-email">silnice873@gmail.com</a><a href="tel:+2348082277274" className="block transition-colors hover:text-white" data-testid="link-footer-phone">+234 808 227 7274</a><WhatsAppButton compact label="WhatsApp" /></div></div></div><div className="flex flex-col gap-3 pt-7 text-xs text-white/38 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Mercury Décor Limited. All Rights Reserved.</span><span>Building Beautiful Spaces.</span></div></div></footer><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" data-testid="link-floating-whatsapp" aria-label="Chat with Mercury Décor on WhatsApp" title="Chat on WhatsApp" className="fixed bottom-5 right-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(8,43,84,.28)] transition-all hover:-translate-y-1 hover:bg-[#1fba59] focus-visible:outline-white sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"><SiWhatsapp size={29} aria-hidden="true" /><span className="sr-only">Chat on WhatsApp</span></a></>;
}

function Shell({ children, title, path }: { children: ReactNode; title: string; path: string }) {
  usePageMeta(title, path); useReveal();
  return <div className="noise min-h-[100dvh] overflow-x-hidden bg-[#f5f7fa] text-[#111827]"><Header /><main className="pt-[92px]">{children}</main><Footer /></div>;
}

function PageHero({ eyebrow, title, italic, text }: { eyebrow: string; title: string; italic?: string; text?: string }) {
  return <section className="relative overflow-hidden bg-[#082b54] py-20 text-white md:py-28"><div className="absolute right-[-8%] top-[-30%] h-[480px] w-[480px] rounded-full border border-[#d6a62a]/20" /><div className="absolute right-[2%] top-[-20%] h-[340px] w-[340px] rounded-full border border-white/10" /><div className="container-wide relative"><SectionLabel light>{eyebrow}</SectionLabel><h1 className="mt-6 max-w-[800px] font-display text-5xl font-extrabold leading-[.98] tracking-[-.06em] md:text-7xl">{title} {italic && <span className="font-editorial font-semibold italic text-[#d6a62a]">{italic}</span>}</h1>{text && <p className="mt-7 max-w-[600px] text-base leading-7 text-white/65 md:text-lg">{text}</p>}</div></section>;
}

function ShowroomPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const remainingRef = useRef(5000);
  const startedAtRef = useRef(0);
  const goTo = (index: number) => {
    remainingRef.current = 5000;
    setActiveIndex((index + showroomImages.length) % showroomImages.length);
  };

  useEffect(() => {
    if (paused) return;
    startedAtRef.current = performance.now();
    timerRef.current = window.setTimeout(() => {
      remainingRef.current = 5000;
      setActiveIndex((index) => (index + 1) % showroomImages.length);
    }, remainingRef.current);
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [activeIndex, paused]);

  const hold = () => {
    if (paused) return;
    remainingRef.current = Math.max(50, remainingRef.current - (performance.now() - startedAtRef.current));
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    setPaused(true);
  };
  const resume = () => setPaused(false);

  const active = showroomImages[activeIndex];
  const nextImages = [1, 2].map((offset) => {
    const index = (activeIndex + offset) % showroomImages.length;
    return { ...showroomImages[index], index };
  });

  return <section id="showroom" className="overflow-hidden bg-[#061f3d] py-20 text-white md:py-28">
    <div className="container-wide">
      <div className="reveal flex flex-col justify-between gap-7 border-b border-white/15 pb-8 md:flex-row md:items-end">
        <div><SectionLabel light>Visual showroom</SectionLabel><h2 className="mt-5 max-w-[720px] font-display text-4xl font-extrabold tracking-[-.05em] md:text-6xl">A closer look at our <span className="font-editorial font-semibold italic text-[#d6a62a]">spaces.</span></h2></div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Show previous image" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-[#d6a62a] hover:text-[#d6a62a]"><ChevronLeft size={19} /></button>
          <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Show next image" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-[#d6a62a] hover:text-[#d6a62a]"><ChevronRight size={19} /></button>
        </div>
      </div>
      <p className="mt-4 text-xs text-white/55">Images advance automatically. Press and hold the featured image to pause; release to continue.</p>
      <div className="mt-8 grid gap-3 lg:grid-cols-[1.65fr_.7fr]">
        <figure
          className="reveal relative min-h-[360px] touch-pan-y select-none overflow-hidden bg-[#0b3769] outline-none focus-visible:ring-2 focus-visible:ring-[#d6a62a] sm:min-h-[520px]"
          tabIndex={0}
          aria-label={`Featured project image ${activeIndex + 1} of ${showroomImages.length}. Press and hold to pause.`}
          onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); hold(); }}
          onPointerUp={resume}
          onPointerCancel={resume}
          onLostPointerCapture={resume}
          onKeyDown={(event) => { if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) { event.preventDefault(); hold(); } }}
          onKeyUp={(event) => { if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); resume(); } }}
          onContextMenu={(event) => event.preventDefault()}
        >
          <img key={active.src} src={active.src} alt={active.alt} draggable={false} decoding="async" onError={(event) => { event.currentTarget.style.display = 'none'; }} className="showroom-image pointer-events-none absolute inset-0 h-full w-full object-cover" />
          <ImageWatermark large />
          <figcaption className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between bg-gradient-to-t from-[#061f3d]/90 via-[#061f3d]/35 to-transparent px-5 pb-5 pt-20 sm:px-7 sm:pb-7">
            <span className="eyebrow text-[#d6a62a]">Featured project view</span>
            <span className="font-mono text-xs text-white/65">{String(activeIndex + 1).padStart(2, '0')} / {showroomImages.length}</span>
          </figcaption>
        </figure>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {nextImages.map((image, position) => <button key={image.src} type="button" onClick={() => goTo(image.index)} aria-label={`Show image ${image.index + 1}`} className="reveal group relative min-h-[180px] overflow-hidden bg-[#0b3769] text-left sm:min-h-[240px]"><img src={image.src} alt={image.alt} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.style.display = 'none'; }} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><ImageWatermark /><span className="absolute inset-0 bg-gradient-to-t from-[#061f3d]/75 via-transparent to-transparent" /><span className="absolute bottom-4 left-4 z-20 text-xs font-bold uppercase tracking-[.12em] text-white/85">{position === 0 ? 'Up next' : 'Following'}</span></button>)}
        </div>
      </div>
      <div className="mt-5 h-1 overflow-hidden bg-white/10"><div key={activeIndex} className={`showroom-progress h-full bg-[#d6a62a] ${paused ? 'paused' : ''}`} /></div>
    </div>
  </section>;
}

function LoopingProjectVideo({ video, index }: { video: (typeof projectVideos)[number]; index: number }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [failed, setFailed] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '700px 0px' });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;
    videoRef.current.load();
    videoRef.current.play().catch(() => undefined);
  }, [shouldLoad]);

  const pauseVideo = () => videoRef.current?.pause();
  const resumeVideo = () => videoRef.current?.play().catch(() => undefined);

  return <article ref={cardRef} className="reveal group overflow-hidden border border-[#082b54]/12 bg-white shadow-[0_18px_48px_rgba(8,43,84,.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(8,43,84,.15)]">
    <div
      className="relative aspect-[9/13] touch-pan-y select-none overflow-hidden bg-[#061f3d] outline-none focus-visible:ring-2 focus-visible:ring-[#d6a62a]"
      tabIndex={0}
      aria-label={`${video.title}. Continuously looping project video ${index + 1} of ${projectVideos.length}. Press and hold to pause.`}
      onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); pauseVideo(); }}
      onPointerUp={resumeVideo}
      onPointerCancel={resumeVideo}
      onLostPointerCapture={resumeVideo}
      onKeyDown={(event) => { if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) { event.preventDefault(); pauseVideo(); } }}
      onKeyUp={(event) => { if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); resumeVideo(); } }}
      onContextMenu={(event) => event.preventDefault()}
    >
      <video ref={videoRef} autoPlay muted loop playsInline preload="none" poster={video.poster} onCanPlay={resumeVideo} onError={() => setFailed(true)} className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]">
        {shouldLoad && <><source src={video.webm} type="video/webm" /><source src={video.src} type="video/mp4" /></>}
        Your browser does not support embedded video.
      </video>
      {failed && <div className="absolute inset-0"><img src={video.poster} alt={`${video.title} video preview`} className="h-full w-full object-cover" /></div>}
      <ImageWatermark top />
    </div>
    <div className="p-5">
      <h3 className="font-display text-lg font-bold text-[#082b54]">{video.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#5b6470]">{video.description}</p>
    </div>
  </article>;
}

function ConfidenceVideo({ video, label }: { video: (typeof projectVideos)[number]; label: string }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [failed, setFailed] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '500px 0px' });
    observer.observe(media);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;
    videoRef.current.load();
    videoRef.current.play().catch(() => undefined);
  }, [shouldLoad]);

  return <div ref={mediaRef} className="relative h-full min-h-[260px] overflow-hidden bg-[#061f3d]">
    <video ref={videoRef} autoPlay muted loop playsInline preload="none" poster={video.poster} onCanPlay={() => videoRef.current?.play().catch(() => undefined)} onError={() => setFailed(true)} aria-label={video.title} className="h-full w-full object-cover">
      {shouldLoad && <><source src={video.webm} type="video/webm" /><source src={video.src} type="video/mp4" /></>}
      Your browser does not support embedded video.
    </video>
    {failed && <img src={video.poster} alt={`${video.title} video preview`} className="absolute inset-0 h-full w-full object-cover" />}
    <ImageWatermark top />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061f3d]/90 via-transparent to-transparent" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
      <div className="eyebrow text-[#d6a62a]">{label}</div>
      <p className="mt-2 max-w-[320px] font-display text-xl font-bold leading-tight">{video.title}</p>
    </div>
  </div>;
}

function VideoShowroom() {
  return <section className="grid-blueprint bg-[#f5f7fa] py-20 md:py-28">
    <div className="container-wide">
      <div className="reveal grid gap-8 border-b border-[#082b54]/15 pb-8 lg:grid-cols-[1fr_.65fr] lg:items-end">
        <div><SectionLabel>Project videos</SectionLabel><h2 className="mt-5 max-w-[760px] font-display text-4xl font-extrabold tracking-[-.05em] text-[#082b54] md:text-6xl">See the details in <span className="font-editorial font-semibold italic text-[#a90000]">motion.</span></h2></div>
        <p className="max-w-[470px] text-sm leading-7 text-[#5b6470]">Every project video plays independently and loops continuously. Press and hold any video to inspect a frame; release to continue.</p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projectVideos.map((video, index) => <LoopingProjectVideo key={video.src} video={video} index={index} />)}
      </div>
    </div>
  </section>;
}

function CatalogIndex() {
  const featured = [[galleryImages[66], 67], [galleryImages[68], 69], [galleryImages[69], 70], [galleryImages[70], 71], [galleryImages[73], 74], [galleryImages[76], 77]] as const;
  return <section className="bg-[#f5f7fa] py-20 md:py-28">
    <div className="container-wide">
      <div className="reveal flex flex-col justify-between gap-7 border-b border-[#082b54]/15 pb-8 md:flex-row md:items-end">
        <div><SectionLabel>Latest catalog release</SectionLabel><h2 className="mt-5 max-w-[760px] font-display text-4xl font-extrabold tracking-[-.05em] text-[#082b54] md:text-6xl">Details that change the <span className="font-editorial font-semibold italic text-[#a90000]">room.</span></h2></div>
      </div>
      <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><p className="max-w-[590px] text-sm leading-7 text-[#5b6470]">Browse a growing reference library of finished spaces, architectural lighting and decorative work. Each image opens into the full digital catalog.</p><AppLink href="/catalogs" data-testid="link-home-catalog-index" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#a90000]">Open the full catalog <ArrowRight size={16} /></AppLink></div>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
        {featured.map(([image, projectNumber], index) => <button key={image.src} type="button" onClick={() => { window.location.href = `/catalogs#project-${projectNumber}`; }} className={`catalog-card reveal reveal-delay-${(index % 3) + 1} group relative overflow-hidden bg-[#dce4ec] text-left ${index === 0 ? 'col-span-2 aspect-[1.7] md:col-span-1 md:row-span-2 md:aspect-auto' : 'aspect-[.9]'}`} aria-label={`Open catalog image: ${image.alt}`}><img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><ImageWatermark /><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#061f3d]/90 via-[#061f3d]/35 to-transparent px-4 pb-4 pt-16"><span className="block text-sm font-semibold text-white">Plaster board POP ceilings</span></span></button>)}
      </div>
    </div>
  </section>;
}

function Home() {
  return <Shell title="Mercury Décor Limited | Interior & Exterior Finishing Specialists" path="/">
    <section className="relative isolate flex min-h-[650px] items-end overflow-hidden bg-[#082b54]"><div className="absolute inset-0 -z-10 overflow-hidden"><video autoPlay muted loop playsInline preload="metadata" poster={galleryImages[14].src} aria-hidden="true" className="h-full w-full object-cover opacity-65"><source src={`${import.meta.env.BASE_URL}video/mercury-hero.webm`} type="video/webm" /><source src={`${import.meta.env.BASE_URL}video/mercury-hero.mp4`} type="video/mp4" /></video><ImageWatermark large top /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,84,.98)_0%,rgba(8,43,84,.72)_55%,rgba(8,43,84,.25)_100%)]" /><div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,43,84,.9)_0%,transparent_65%)]" /></div><div className="container-wide w-full pb-16 pt-24 md:pb-24"><div className="max-w-[780px]"><div className="reveal eyebrow flex items-center gap-3 text-[#d6a62a]"><span className="h-px w-10 bg-[#d6a62a]" />Professional Interior &amp; Exterior Finishing Specialists</div><h1 className="reveal reveal-delay-1 mt-6 font-display text-[clamp(3.5rem,9vw,7.6rem)] font-extrabold leading-[.93] tracking-[-.07em] text-white">Building <span className="font-editorial font-semibold italic text-[#d6a62a]">Beautiful</span> Spaces.</h1><p className="reveal reveal-delay-2 mt-7 max-w-[565px] text-base leading-7 text-white/72 md:text-lg">{description}</p><div className="reveal reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row"><QuoteButton /><WhatsAppButton /></div></div><div className="mt-16 border-t border-white/20 pt-5 text-xs uppercase tracking-[.18em] text-white/55">Port Harcourt · Rivers State · Nigeria</div></div></section>
    <section className="bg-[#d6a62a] py-9"><div className="container-wide grid gap-7 md:grid-cols-[1.25fr_2fr] md:items-center"><div className="font-editorial text-2xl leading-tight text-[#082b54] md:text-3xl">Professional solutions.<br /><span className="italic">Beautiful results.</span></div><div className="grid grid-cols-2 gap-4 border-l border-[#082b54]/25 pl-5 text-[12px] font-bold uppercase tracking-[.08em] text-[#082b54] sm:grid-cols-4">{['Quality Workmanship', 'Professional Delivery', 'Reliable Supply', 'Client-Focused Service'].map((item) => <div key={item} className="flex gap-2"><Check size={15} className="shrink-0 text-[#a90000]" />{item}</div>)}</div></div></section>
    <section className="grid-blueprint py-24 md:py-32"><div className="container-wide grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div className="reveal"><SectionLabel>Introduction</SectionLabel><h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-[-.05em] text-[#082b54] md:text-6xl">A considered partner for <span className="font-editorial font-semibold italic text-[#a90000]">better spaces.</span></h2></div><div className="reveal reveal-delay-1"><p className="max-w-[620px] text-[15px] leading-7 text-[#4b5563]">Mercury Décor Limited provides practical solutions for residential, commercial and corporate projects — combining quality workmanship, reliable materials and professional service delivery.</p><AppLink href="/about" data-testid="link-home-about" className="mt-8 inline-flex items-center gap-3 border-b-2 border-[#a90000] pb-2 text-sm font-extrabold text-[#082b54]">About Mercury Décor <ArrowRight size={16} /></AppLink></div></div><div className="mt-14 grid gap-3 sm:grid-cols-3">{[galleryImages[0], galleryImages[3], galleryImages[13]].map((image) => <div key={image.src} className="reveal relative overflow-hidden bg-[#dce4ec]"><img src={image.src} alt={image.alt} loading="lazy" className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 hover:scale-105" /><ImageWatermark /></div>)}</div></section>
    <section className="overflow-hidden bg-white py-20 md:py-28"><div className="container-wide"><div className="reveal grid gap-7 border-b border-[#082b54]/15 pb-8 lg:grid-cols-[1fr_.7fr] lg:items-end"><div><SectionLabel>Project confidence</SectionLabel><h2 className="mt-5 max-w-[760px] font-display text-4xl font-extrabold tracking-[-.05em] text-[#082b54] md:text-6xl">A clear path from brief to <span className="font-editorial font-semibold italic text-[#a90000]">finished space.</span></h2></div><p className="max-w-[430px] text-sm leading-7 text-[#5b6470]">A strong result starts with clear requirements, considered material choices and coordinated execution. Mercury Décor supports each stage with practical attention to the details that shape the final finish.</p></div><div className="mt-10 grid gap-3 lg:grid-cols-[1.18fr_.82fr]"><div className="reveal relative min-h-[470px] overflow-hidden bg-[#061f3d] lg:min-h-[610px]"><ConfidenceVideo video={projectVideos[0]} label="Proof in motion" /><div className="pointer-events-none absolute left-5 top-5 z-20 border border-white/25 bg-[#082b54]/70 px-3 py-2 text-[10px] font-bold uppercase tracking-[.14em] text-white/80 backdrop-blur-sm">Execution / 01</div></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"><AppLink href="/catalogs#project-69" className="reveal group relative min-h-[230px] overflow-hidden bg-[#dce4ec]" aria-label="View hallway and lighting project"><img src={showroomImages[68].src} alt={showroomImages[68].alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><ImageWatermark /><div className="absolute inset-0 bg-gradient-to-t from-[#061f3d]/85 via-transparent to-transparent" /><div className="absolute bottom-5 left-5 text-white"><div className="eyebrow text-[#d6a62a]">Material decisions</div><p className="mt-2 font-display text-xl font-bold">Plaster Board POP Ceilings</p></div></AppLink><div className="reveal relative min-h-[230px] overflow-hidden bg-[#061f3d]"><ConfidenceVideo video={projectVideos[3]} label="Delivery in motion" /></div></div></div><div className="mt-8 grid border-l border-t border-[#082b54]/12 sm:grid-cols-2 lg:grid-cols-4">{[['01', 'Understand the brief', 'Project requirements, priorities and intended outcomes are clarified first.', ClipboardList], ['02', 'Plan the solution', 'Materials, finishing choices and practical project needs are considered.', Ruler], ['03', 'Coordinate delivery', 'Supply, logistics and on-site requirements are aligned around the work.', Truck], ['04', 'Finish with care', 'The final details are approached with workmanship and presentation in mind.', Check]].map(([number, title, text, Icon]) => { const StepIcon = Icon as LucideIcon; return <article key={title as string} className="contract-step reveal min-h-[220px] border-b border-r border-[#082b54]/12 p-6 transition-colors hover:bg-[#f8fafc]"><div className="flex items-center justify-between"><span className="font-mono text-xs font-bold text-[#a90000]">{number as string}</span><StepIcon size={20} strokeWidth={1.5} className="text-[#d6a62a]" /></div><h3 className="mt-12 font-display text-xl font-bold text-[#082b54]">{title as string}</h3><p className="mt-3 text-sm leading-6 text-[#5b6470]">{text as string}</p></article>; })}</div><div className="reveal mt-9 flex flex-col justify-between gap-5 border-l-4 border-[#d6a62a] bg-[#082b54] p-6 text-white sm:flex-row sm:items-center md:p-8"><div><div className="eyebrow text-[#d6a62a]">Planning a project?</div><p className="mt-2 max-w-[640px] text-sm leading-6 text-white/65">Share the scope, location and service required. Your details will be prepared for a transparent WhatsApp handoff.</p></div><QuoteButton /></div></div></section>
     <CatalogIndex />
     <ShowroomPreview />
    <VideoShowroom />
    <section className="bg-[#082b54] py-24 text-white md:py-32"><div className="container-wide"><div className="reveal flex items-end justify-between gap-6 border-b border-white/15 pb-9"><div><SectionLabel light>Selected services</SectionLabel><h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-.05em] md:text-6xl">The work behind the <span className="font-editorial font-semibold italic text-[#d6a62a]">finish.</span></h2></div><AppLink href="/services" data-testid="link-home-services" className="hidden items-center gap-2 text-sm font-bold text-[#d6a62a] sm:flex">All services <ArrowRight size={15} /></AppLink></div><div className="mt-10 grid gap-4 md:grid-cols-3">{services.slice(0, 3).map((service, index) => { const Icon = service.icon; const media = selectedServiceMedia[index]; return <article key={service.title} className="reveal group overflow-hidden border border-white/15 bg-[#0b3769] transition-transform duration-500 hover:-translate-y-1"><div className="relative aspect-[4/3] overflow-hidden bg-[#061f3d]">{media.type === 'video' ? <ConfidenceVideo video={media.media} label="Service in motion" /> : <><img src={media.media.src} alt={`${service.title} project example`} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><ImageWatermark /><div className="absolute inset-0 bg-gradient-to-t from-[#061f3d]/85 via-transparent to-transparent" /><div className="absolute bottom-5 left-5"><div className="eyebrow text-[#d6a62a]">Project reference</div><p className="mt-2 font-display text-xl font-bold">{media.media.alt.split(' with ')[0]}</p></div></>}</div><div className="flex min-h-[220px] flex-col p-6 md:p-7"><div className="flex items-center justify-between"><Icon size={23} className="text-[#d6a62a]" /><span className="font-mono text-xs text-white/45">{service.number}</span></div><div className="mt-auto"><h3 className="font-display text-xl font-bold">{service.title}</h3><p className="mt-3 text-sm leading-6 text-white/58">{service.short}</p></div></div></article>; })}</div><AppLink href="/catalogs" data-testid="link-home-catalogs" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#d6a62a] sm:hidden">Explore catalogs <ArrowRight size={15} /></AppLink></div></section>
     <section className="bg-[#f5f7fa] py-24 md:py-32"><div className="container-wide"><div className="reveal grid gap-8 border-b border-[#082b54]/15 pb-9 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><SectionLabel>Spaces in context</SectionLabel><h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-.05em] text-[#082b54] md:text-5xl">For residential, commercial and <span className="font-editorial font-semibold italic text-[#a90000]">corporate</span> needs.</h2></div><p className="max-w-[460px] text-sm leading-7 text-[#5b6470]"><span className="font-bold text-[#a90000]">We work globally.</span> Different spaces call for different decisions. Explore how Mercury Décor brings finishing, supply and project support into the places where people live, work and build.</p></div><div className="mt-10 grid gap-3 lg:grid-cols-2 lg:auto-rows-[minmax(230px,1fr)]">{contextMedia.map((context, index) => <article key={context.title} className={`reveal group relative min-h-[250px] overflow-hidden bg-[#082b54] ${index === 0 ? 'lg:row-span-2 lg:min-h-[520px]' : ''}`}>{context.type === 'video' ? <ConfidenceVideo video={context.media} label={context.title} /> : <><img src={context.media.src} alt={`${context.title}: ${context.text}`} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><ImageWatermark /><div className="absolute inset-0 bg-gradient-to-t from-[#061f3d]/92 via-[#061f3d]/15 to-transparent" /></>}<div className="pointer-events-none absolute left-5 top-5 z-20 border border-white/25 bg-[#082b54]/70 px-3 py-2 text-[10px] font-bold uppercase tracking-[.14em] text-white/85 backdrop-blur-sm">{context.title}</div><div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5 text-white md:p-6"><p className="max-w-[330px] text-sm leading-6 text-white/75">{context.text}</p></div></article>)}</div></div></section>
    <section className="bg-[#a90000] py-20 text-white"><div className="container-wide flex flex-col justify-between gap-8 md:flex-row md:items-center"><div><SectionLabel light>Start the brief</SectionLabel><h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-.05em] md:text-5xl">Have a project in mind?</h2><p className="mt-3 text-sm text-white/70">Tell us what you need and our team will get back to you.</p></div><div className="flex flex-wrap gap-3"><QuoteButton /><WhatsAppButton /></div></div></section>
    <ContactTeaser />
  </Shell>;
}

function About() {
  return <Shell title="About Mercury Décor Limited | Nigerian Finishing Specialists" path="/about"><PageHero eyebrow="About Mercury Décor Limited" title="A clear standard for every" italic="surface." text="Professional interior and exterior finishing, construction, procurement, supply and project support for residential, commercial and corporate projects." /><section className="grid-blueprint py-24 md:py-32"><div className="container-wide grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-24"><div className="reveal grid grid-cols-2 gap-3"><div className="relative col-span-2 overflow-hidden"><img src={galleryImages[0].src} alt={galleryImages[0].alt} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.02]" /><ImageWatermark /></div><div className="relative overflow-hidden"><img src={galleryImages[5].src} alt={galleryImages[5].alt} loading="lazy" className="aspect-square w-full object-cover" /><ImageWatermark /></div><div className="relative overflow-hidden"><img src={galleryImages[10].src} alt={galleryImages[10].alt} loading="lazy" className="aspect-square w-full object-cover" /><ImageWatermark /></div></div><div className="reveal reveal-delay-1"><SectionLabel>The company</SectionLabel><h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-[-.05em] text-[#082b54] md:text-6xl">Practical solutions.<br /><span className="font-editorial font-semibold italic text-[#a90000]">Professional delivery.</span></h2><div className="mt-7 max-w-[570px] space-y-5 text-[15px] leading-7 text-[#4b5563]"><p>Mercury Décor Limited is a Nigerian company specializing in professional interior and exterior finishing, construction, procurement, supply and project support services.</p><p>We provide practical solutions for residential, commercial and corporate projects, combining quality workmanship, reliable materials and professional service delivery.</p></div><div className="mt-9 flex flex-wrap gap-3"><QuoteButton /><WhatsAppButton /></div></div></div></section></Shell>;
}

function ServiceCard({ service, image, index }: { service: (typeof services)[number]; image: (typeof showroomImages)[number]; index: number }) {
  const Icon = service.icon;
  return <article className={`reveal reveal-delay-${(index % 3) + 1} group flex flex-col overflow-hidden border border-[#082b54]/12 bg-white shadow-[0_18px_45px_rgba(8,43,84,.07)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_70px_rgba(8,43,84,.15)]`}>
    <div className="relative aspect-[4/3] overflow-hidden bg-[#dce4ec]">
      <img src={image.src} alt={`${service.title} visual example`} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <ImageWatermark />
      <div className="absolute inset-0 bg-gradient-to-t from-[#061f3d]/75 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 text-white"><span className="flex h-10 w-10 items-center justify-center border border-[#d6a62a]/70 bg-[#082b54]/85 text-[#d6a62a] backdrop-blur-sm"><Icon size={19} strokeWidth={1.5} /></span><span className="font-mono text-xs text-white/70">{service.number}</span></div>
    </div>
    <div className="flex flex-1 flex-col p-6 md:p-7">
      <h2 className="max-w-[350px] font-display text-2xl font-bold leading-tight tracking-[-.035em] text-[#082b54]">{service.title}</h2>
      <p className="mt-4 text-sm leading-6 text-[#5b6470]">{service.description}</p>
      <div className="mt-6 grid gap-2 border-t border-[#082b54]/10 pt-5">{service.items.map((item) => <div key={item} className="flex items-center gap-2 text-xs font-semibold text-[#344154]"><Check size={13} className="shrink-0 text-[#a90000]" />{item}</div>)}</div>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-7"><QuoteButton service={service.title} /><WhatsAppButton compact label="WhatsApp" service={service.title} /></div>
    </div>
  </article>;
}

function Services() {
  return <Shell title="Services | Mercury Décor Limited" path="/services">
    <PageHero eyebrow="What we do" title="Built around your" italic="next conversation." text="Professional solutions for construction, finishing, supply and project support." />
    <section className="grid-blueprint bg-white py-20 md:py-28">
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div className="reveal"><SectionLabel>Service portfolio</SectionLabel><h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-.05em] text-[#082b54] md:text-6xl">Practical capability.<br /><span className="font-editorial font-semibold italic text-[#a90000]">Visible results.</span></h2></div>
          <div className="reveal reveal-delay-1"><p className="max-w-[620px] text-[15px] leading-7 text-[#4b5563]">From the finish people see to the sourcing, movement and coordination behind it, our services support the practical requirements of residential, commercial, corporate and construction projects.</p><div className="mt-6 flex flex-wrap gap-2">{services.map((service) => <a key={service.number} href={`#service-${service.number}`} className="rounded-full border border-[#082b54]/15 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[.08em] text-[#082b54] transition-colors hover:border-[#d6a62a] hover:bg-[#d6a62a]">{service.number} · {service.title}</a>)}</div></div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-[1.35fr_.65fr_.65fr]">
          {[serviceVisuals[0], serviceVisuals[2], serviceVisuals[5]].map((image, index) => <figure key={image.src} className={`reveal relative overflow-hidden bg-[#dce4ec] ${index === 0 ? 'col-span-2 min-h-[360px] lg:col-span-1 lg:row-span-1' : 'min-h-[220px] lg:min-h-[360px]'}`}><img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105" /><ImageWatermark large={index === 0} top /><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#061f3d]/85 to-transparent px-5 pb-5 pt-20 text-[10px] font-bold uppercase tracking-[.12em] text-white">{index === 0 ? 'Finishing and decorative capability' : index === 1 ? 'Built environment support' : 'Corporate and commercial vision'}</figcaption></figure>)}
        </div>
      </div>
    </section>
    <section className="bg-[#eef2f6] py-20 md:py-28"><div className="container-wide"><div className="reveal flex flex-col justify-between gap-6 border-b border-[#082b54]/15 pb-8 md:flex-row md:items-end"><div><SectionLabel>Explore each service</SectionLabel><h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-.05em] text-[#082b54] md:text-6xl">What we can bring to <span className="font-editorial font-semibold italic text-[#a90000]">the project.</span></h2></div><p className="max-w-[390px] text-sm leading-7 text-[#5b6470]">Choose a service to request a focused quotation or start a direct WhatsApp conversation about your requirements.</p></div><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{services.map((service, index) => <div id={`service-${service.number}`} key={service.title} className="scroll-mt-28"><ServiceCard service={service} image={serviceVisuals[index]} index={index} /></div>)}</div></div></section>
    <section className="relative overflow-hidden bg-[#d6a62a] py-16"><div className="absolute -right-24 -top-36 h-80 w-80 rounded-full border border-[#082b54]/15" /><div className="container-wide relative flex flex-col justify-between gap-7 md:flex-row md:items-center"><div><div className="eyebrow text-[#a90000]">Ready when you are</div><h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-.04em] text-[#082b54] md:text-4xl">Tell us where the work starts.</h2><p className="mt-3 max-w-[560px] text-sm leading-6 text-[#082b54]/70">Share the service, project location and scope. We will prepare your details for a transparent WhatsApp handoff.</p></div><div className="flex flex-wrap gap-3"><QuoteButton /><WhatsAppButton /></div></div></section>
  </Shell>;
}

function CatalogModal({ catalog, onClose }: { catalog: (typeof catalogs)[number]; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter((element) => !element.hasAttribute('disabled'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#061f3d]/75 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div ref={dialogRef} className="relative grid max-h-[90vh] w-full max-w-3xl overflow-auto rounded-[2px] bg-white shadow-2xl md:grid-cols-2" role="dialog" aria-modal="true" aria-labelledby="catalog-dialog-title" aria-describedby="catalog-dialog-description"><button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close catalog" data-testid="button-close-catalog" className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-[#082b54] text-white hover:bg-[#a90000]"><X size={18} /></button><div className="relative overflow-hidden"><img src={catalog.image} alt={`${catalog.title} visual atmosphere`} className="h-64 w-full object-cover md:h-full" /><ImageWatermark /></div><div className="p-7 md:p-10"><div className="eyebrow text-[#a90000]">{catalog.category}</div><h2 id="catalog-dialog-title" className="mt-4 font-display text-3xl font-extrabold leading-tight text-[#082b54]">{catalog.title}</h2><p id="catalog-dialog-description" className="mt-5 text-sm leading-7 text-[#5b6470]">{catalog.description}</p><div className="mt-8 border-t border-[#082b54]/12 pt-6"><p className="text-xs font-bold uppercase tracking-[.1em] text-[#082b54]">Ready to discuss this category?</p><div className="mt-4 flex flex-wrap gap-3"><QuoteButton service={catalog.title} /><WhatsAppButton compact label="WhatsApp" service={catalog.title} /></div></div></div></div></div>;
}

function GalleryLightbox({ index, onClose, onNavigate }: { index: number; onClose: () => void; onNavigate: (index: number) => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const image = galleryImages[index];
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onNavigate((index - 1 + galleryImages.length) % galleryImages.length);
      if (event.key === 'ArrowRight') onNavigate((index + 1) % galleryImages.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [index, onClose, onNavigate]);

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020b16]/92 p-3 backdrop-blur-md sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col" role="dialog" aria-modal="true" aria-label={`Expanded image ${index + 1} of ${galleryImages.length}`}>
      <div className="mb-3 flex items-center justify-between text-white">
        <span className="font-mono text-xs text-white/60">{String(index + 1).padStart(2, '0')} / {galleryImages.length}</span>
        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close expanded image" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#082b54] transition-colors hover:border-[#d6a62a] hover:text-[#d6a62a]"><X size={20} /></button>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#061f3d]">
        <img src={image.src} alt={image.alt} className="h-full w-full object-contain" />
        <button type="button" onClick={() => onNavigate((index - 1 + galleryImages.length) % galleryImages.length)} aria-label="Show previous expanded image" className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#082b54]/90 text-white shadow-lg transition-colors hover:bg-[#d6a62a] hover:text-[#082b54]"><ChevronLeft size={21} /></button>
        <button type="button" onClick={() => onNavigate((index + 1) % galleryImages.length)} aria-label="Show next expanded image" className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#082b54]/90 text-white shadow-lg transition-colors hover:bg-[#d6a62a] hover:text-[#082b54]"><ChevronRight size={21} /></button>
      </div>
      <p className="mt-3 text-center text-sm text-white/70">{image.alt}</p>
    </div>
  </div>;
}

function Catalogs() {
  const [active, setActive] = useState<(typeof catalogs)[number] | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<CatalogFilterId>('all');
  const visibleImages = galleryImages.map((image, index) => ({ image, index })).filter(({ index }) => matchesCatalogFilter(index, activeFilter));

  return <Shell title="Catalogs | Mercury Décor Limited" path="/catalogs">
    <PageHero eyebrow="Digital showroom" title="Our" italic="Catalogs." text="A living reference library of finishing, building and decorative work for residential, commercial and corporate spaces." />
    <section className="bg-[#f5f7fa] py-16 md:py-24">
      <div className="container-wide">
        <div className="reveal grid gap-4 border-y border-[#082b54]/15 py-5 sm:grid-cols-3">
          <div><span className="font-mono text-2xl font-bold text-[#a90000]">77</span><span className="ml-3 text-xs font-bold uppercase tracking-[.12em] text-[#5b6470]">project views</span></div>
          <div><span className="font-mono text-2xl font-bold text-[#a90000]">15</span><span className="ml-3 text-xs font-bold uppercase tracking-[.12em] text-[#5b6470]">moving studies</span></div>
          <div><span className="font-mono text-2xl font-bold text-[#a90000]">06</span><span className="ml-3 text-xs font-bold uppercase tracking-[.12em] text-[#5b6470]">service catalogs</span></div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {catalogs.map((catalog, index) => { const Icon = catalog.icon; return <article key={catalog.title} className={`reveal reveal-delay-${(index % 3) + 1} group flex flex-col overflow-hidden border border-[#082b54]/12 bg-white shadow-[0_16px_40px_rgba(8,43,84,.05)] lg:flex-row`}><div className="relative aspect-[1.15] overflow-hidden bg-[#dce4ec] lg:aspect-auto lg:w-[45%]"><img src={catalog.image} alt={`${catalog.title} visual atmosphere`} loading="lazy" className="h-full min-h-[250px] w-full object-cover transition-transform duration-700 group-hover:scale-105" /><ImageWatermark /><div className="absolute inset-0 bg-gradient-to-t from-[#082b54]/80 via-transparent to-transparent" /><span className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-[#082b54]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#d6a62a]"><Icon size={13} />{catalog.category}</span></div><div className="flex flex-1 flex-col p-7"><h2 className="font-display text-2xl font-bold leading-tight text-[#082b54]">{catalog.title}</h2><p className="mt-3 text-sm leading-6 text-[#5b6470]">{catalog.description}</p><div className="mt-auto flex flex-wrap items-center gap-4 pt-8"><button type="button" onClick={() => setActive(catalog)} data-testid={`button-view-catalog-${index}`} className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.06em] text-[#a90000]">View Catalog <ArrowRight size={14} /></button><QuoteButton service={catalog.title} /><WhatsAppButton compact label="WhatsApp" service={catalog.title} /></div></div></article>; })}
        </div>
      </div>
    </section>
    <section className="bg-[#082b54] py-20 text-white md:py-28">
      <div className="container-wide">
        <div className="reveal flex flex-col justify-between gap-6 border-b border-white/15 pb-8 md:flex-row md:items-end"><div><SectionLabel light>Project and concept imagery</SectionLabel><h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-.05em] md:text-6xl">Spaces, finishes and <span className="font-editorial font-semibold italic text-[#d6a62a]">future possibilities.</span></h2></div><p className="max-w-[390px] text-sm leading-6 text-white/60">Browse by collection, then select any image to open a larger view and inspect the finish.</p></div>
        <div className="hide-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Catalog collections">{catalogFilters.map((filter) => <button key={filter.id} type="button" role="tab" aria-selected={activeFilter === filter.id} onClick={() => setActiveFilter(filter.id)} className={`shrink-0 rounded-full border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.1em] transition-colors ${activeFilter === filter.id ? 'border-[#d6a62a] bg-[#d6a62a] text-[#082b54]' : 'border-white/20 text-white/70 hover:border-[#d6a62a] hover:text-[#d6a62a]'}`}>{filter.label}</button>)}</div>
        <p className="mt-4 text-xs text-white/45">{visibleImages.length} {visibleImages.length === 1 ? 'entry' : 'entries'} in this collection</p>
        <div className="mt-5 grid auto-rows-[180px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {visibleImages.map(({ image, index }) => <button id={`project-${index + 1}`} key={image.src} type="button" onClick={() => setSelectedImageIndex(index)} aria-label={`Open larger view: ${image.alt}`} className={`reveal reveal-delay-${(index % 3) + 1} group relative overflow-hidden bg-[#0b3769] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#d6a62a] ${image.portrait ? 'row-span-2' : ''}`}><img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><ImageWatermark /><span className="pointer-events-none absolute inset-0 bg-[#061f3d]/0 transition-colors group-hover:bg-[#061f3d]/18" /><span className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-[2px] bg-[#082b54]/90 px-3 py-2 text-[9px] font-bold uppercase tracking-[.1em] text-white opacity-0 transition-all group-hover:opacity-100"><span>Project {String(index + 1).padStart(2, '0')}</span><span>{image.concept ? 'Concept' : index >= 66 ? 'Latest' : 'Portfolio'}</span></span></button>)}
        </div>
      </div>
    </section>
    <VideoShowroom />
    {active && <CatalogModal catalog={active} onClose={() => setActive(null)} />}
    {selectedImageIndex !== null && <GalleryLightbox index={selectedImageIndex} onClose={() => setSelectedImageIndex(null)} onNavigate={setSelectedImageIndex} />}
  </Shell>;
}

function Industries() {
  const items: Array<[string, string, LucideIcon]> = [['Residential', 'Thoughtful finishing and building support for homes and living spaces.', Compass], ['Commercial', 'Practical solutions for spaces designed to welcome, work and perform.', Building2], ['Corporate', 'A considered project partner for professional environments and requirements.', ClipboardList], ['Construction', 'Materials, logistics and contracting support for construction needs.', Hammer]];
  return <Shell title="Industries We Serve | Mercury Décor Limited" path="/industries"><PageHero eyebrow="Built for context" title="Industries we" italic="serve." text="From a home that needs its final layer to a corporate space with a demanding brief, we bring practical finishing and project support to the work." /><section className="bg-white py-20 md:py-28"><div className="container-wide grid gap-0 border-y border-[#082b54]/15 md:grid-cols-4">{items.map(([title, text, Icon], index) => <article key={title} className={`reveal reveal-delay-${(index % 3) + 1} border-b border-[#082b54]/15 py-8 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0`}><Icon size={23} strokeWidth={1.5} className="text-[#a90000]" /><h2 className="mt-7 font-display text-xl font-bold text-[#082b54]">{title}</h2><p className="mt-3 text-sm leading-6 text-[#5b6470]">{text}</p></article>)}</div></section><section className="bg-[#a90000] py-20 text-white"><div className="container-wide grid gap-8 md:grid-cols-[1.2fr_.8fr] md:items-end"><div className="reveal"><SectionLabel light>Why Mercury Décor</SectionLabel><h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-.05em] md:text-6xl">Good work is visible<br /><span className="font-editorial font-semibold italic text-[#f1c95b]">in the details.</span></h2></div><div className="reveal reveal-delay-1 grid grid-cols-2 gap-6">{['Quality Workmanship', 'Professional Delivery', 'Reliable Supply', 'Client-Focused Service'].map((item, index) => <div key={item} className="border-t border-white/25 pt-3"><span className="font-mono text-xs text-[#f1c95b]">0{index + 1}</span><div className="mt-2 font-display text-sm font-bold">{item}</div></div>)}</div></div></section><section className="bg-[#d6a62a] py-16"><div className="container-wide flex flex-wrap items-center justify-between gap-6"><h2 className="font-display text-3xl font-extrabold text-[#082b54]">Have a project in mind?</h2><div className="flex gap-3"><QuoteButton /><WhatsAppButton /></div></div></section></Shell>;
}

function QuoteForm() {
  const [location, setLocation] = useLocation();
  const queryService = new URLSearchParams(location.split('?')[1] ?? '').get('service') ?? '';
  const [selectedService, setSelectedService] = useState(queryService);
  const [handoffUrl, setHandoffUrl] = useState('');
  useEffect(() => { setSelectedService(queryService); }, [queryService]);
  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (name: string) => String(form.get(name) || 'Not provided').trim();
    const message = [
      'Hello Mercury Décor Limited, I would like to request a quotation.',
      '',
      `Name: ${value('fullName')}`,
      `Company: ${value('companyName')}`,
      `Phone: ${value('phone')}`,
      `Email: ${value('email')}`,
      `Service: ${value('service')}`,
      `Project type: ${value('projectType')}`,
      `Location: ${value('location')}`,
      `Preferred start date: ${value('startDate')}`,
      `Project description: ${value('description')}`,
      `Additional information: ${value('additionalInfo')}`
    ].join('\n');
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    setHandoffUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  if (handoffUrl) return <div className="flex min-h-[500px] flex-col items-start justify-center" role="status"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white"><SiWhatsapp size={28} /></div><div className="eyebrow mt-8 text-[#a90000]">Ready to send</div><h2 className="mt-4 max-w-[450px] font-display text-3xl font-extrabold leading-tight text-[#082b54] md:text-4xl">Complete your request in WhatsApp.</h2><p className="mt-4 max-w-[470px] text-sm leading-7 text-[#5b6470]">We opened WhatsApp with your project details. Review the message and tap Send so Mercury Décor receives it. If WhatsApp did not open, use the button below.</p><div className="mt-8 flex flex-wrap gap-3"><a href={handoffUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white"><SiWhatsapp size={17} />Continue in WhatsApp</a><button type="button" onClick={() => { setHandoffUrl(''); setLocation('/contact'); }} data-testid="button-new-quote" className="inline-flex items-center gap-2 rounded-full border border-[#082b54]/20 px-5 py-3 text-sm font-bold text-[#082b54]">Edit or start another request <ArrowRight size={15} /></button></div></div>;
  return <form onSubmit={submitQuote} className="grid gap-5 sm:grid-cols-2" aria-label="Request a quote form"><div className="sm:col-span-2"><div className="flex items-end justify-between"><div><div className="eyebrow text-[#a90000]">Project enquiry</div><h2 className="mt-2 font-display text-2xl font-extrabold text-[#082b54]">Tell us about the work.</h2></div><span className="text-xs text-[#6b7280]">* Required</span></div></div><label className="grid gap-2 text-xs font-bold text-[#082b54]">Full Name *<input required autoComplete="name" name="fullName" data-testid="input-full-name" placeholder="Your full name" className="h-12 rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 text-sm font-normal outline-none focus:border-[#a90000]" /></label><label className="grid gap-2 text-xs font-bold text-[#082b54]">Company Name<input autoComplete="organization" name="companyName" data-testid="input-company-name" placeholder="Company or organisation" className="h-12 rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 text-sm font-normal outline-none focus:border-[#a90000]" /></label><label className="grid gap-2 text-xs font-bold text-[#082b54]">Phone Number *<input required type="tel" autoComplete="tel" inputMode="tel" name="phone" data-testid="input-phone" placeholder="+234 ..." className="h-12 rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 text-sm font-normal outline-none focus:border-[#a90000]" /></label><label className="grid gap-2 text-xs font-bold text-[#082b54]">Email Address *<input required type="email" autoComplete="email" inputMode="email" name="email" data-testid="input-email" placeholder="you@company.com" className="h-12 rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 text-sm font-normal outline-none focus:border-[#a90000]" /></label><label className="relative grid gap-2 text-xs font-bold text-[#082b54]">Service Required *<select required name="service" value={selectedService} onChange={(event) => setSelectedService(event.target.value)} data-testid="select-service" className="h-12 appearance-none rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 pr-10 text-sm font-normal outline-none focus:border-[#a90000]"><option value="">Select a service</option>{services.map((service) => <option key={service.title} value={service.title}>{service.title}</option>)}</select><ChevronDown size={16} className="pointer-events-none absolute bottom-3.5 right-4 text-[#082b54]/60" /></label><label className="relative grid gap-2 text-xs font-bold text-[#082b54]">Project Type *<select required name="projectType" data-testid="select-project-type" className="h-12 appearance-none rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 pr-10 text-sm font-normal outline-none focus:border-[#a90000]"><option value="">Select project type</option><option>Residential</option><option>Commercial</option><option>Corporate</option><option>Other</option></select><ChevronDown size={16} className="pointer-events-none absolute bottom-3.5 right-4 text-[#082b54]/60" /></label><label className="grid gap-2 text-xs font-bold text-[#082b54]">Project Location *<input required autoComplete="address-level2" name="location" data-testid="input-location" placeholder="City / area" className="h-12 rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 text-sm font-normal outline-none focus:border-[#a90000]" /></label><label className="grid gap-2 text-xs font-bold text-[#082b54]">Preferred Start Date<input type="date" name="startDate" data-testid="input-start-date" className="h-12 rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 text-sm font-normal outline-none focus:border-[#a90000]" /></label><label className="grid gap-2 text-xs font-bold text-[#082b54] sm:col-span-2">Project Description *<textarea required name="description" data-testid="input-description" rows={4} placeholder="What would you like us to help with?" className="resize-y rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 py-3 text-sm leading-6 outline-none focus:border-[#a90000]" /></label><label className="grid gap-2 text-xs font-bold text-[#082b54] sm:col-span-2">Additional Information<textarea name="additionalInfo" data-testid="input-additional-information" rows={3} placeholder="Anything else we should know?" className="resize-y rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 py-3 text-sm leading-6 outline-none focus:border-[#a90000]" /></label><div className="flex flex-col gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-[330px] text-xs leading-5 text-[#6b7280]">Your details stay in your browser until you choose to send the prepared message through WhatsApp.</p><button type="submit" data-testid="button-submit-request" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#a90000] px-6 py-3.5 font-display text-sm font-extrabold text-white hover:bg-[#850000]">Prepare WhatsApp Request <Send size={16} /></button></div></form>;
}

function ContactTeaser() {
  return <section className="bg-[#082b54] py-20 text-white"><div className="container-wide flex flex-col justify-between gap-8 md:flex-row md:items-center"><div><SectionLabel light>Find us</SectionLabel><h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-.05em]">Let’s talk about <span className="font-editorial font-semibold italic text-[#d6a62a]">your project.</span></h2><p className="mt-4 text-sm leading-6 text-white/60">131 Circular Road, Elekahia Housing Estate, Port Harcourt, Rivers State, Nigeria</p></div><AppLink href="/contact" data-testid="link-contact-teaser" className="inline-flex items-center gap-2 text-sm font-bold text-[#d6a62a]">Contact Mercury Décor <ArrowRight size={16} /></AppLink></div></section>;
}

function Contact() {
  return <Shell title="Contact Mercury Décor Limited | Request a Quote" path="/contact"><PageHero eyebrow="Start the brief" title="Let’s talk about" italic="your project." text="Tell us what you need and our team will get back to you." /><section className="bg-[#f5f7fa] py-20 md:py-28"><div className="container-wide grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-24"><div className="reveal lg:sticky lg:top-28"><SectionLabel>Contact Mercury Décor</SectionLabel><div className="mt-9 space-y-6"><div className="flex gap-4"><MapPin size={19} className="mt-1 shrink-0 text-[#a90000]" /><address className="not-italic text-sm leading-6 text-[#4b5563]">131 Circular Road,<br />Elekahia Housing Estate,<br />Port Harcourt,<br />Rivers State, Nigeria</address></div><a href="mailto:silnice873@gmail.com" data-testid="link-contact-email" className="flex gap-4 text-sm text-[#4b5563] hover:text-[#a90000]"><Mail size={19} className="text-[#a90000]" />silnice873@gmail.com</a><a href="tel:+2348082277274" data-testid="link-contact-phone" className="flex gap-4 text-sm text-[#4b5563] hover:text-[#a90000]"><Phone size={19} className="text-[#a90000]" />+234 808 227 7274</a></div><div className="mt-9 flex flex-wrap gap-3"><WhatsAppButton /><a href="https://www.google.com/maps/search/?api=1&query=131+Circular+Road+Elekahia+Housing+Estate+Port+Harcourt+Rivers+State+Nigeria" target="_blank" rel="noreferrer" data-testid="link-google-maps" className="inline-flex items-center gap-2 rounded-full border border-[#082b54]/20 px-5 py-3 text-sm font-bold text-[#082b54] hover:border-[#a90000] hover:text-[#a90000]"><MapPin size={16} />Google Maps</a></div></div><div className="reveal reveal-delay-1 rounded-[2px] border border-[#082b54]/12 bg-white p-6 shadow-[0_18px_60px_rgba(8,43,84,.06)] md:p-10"><QuoteForm /></div></div></section><section className="bg-[#082b54] py-16"><div className="container-wide min-h-[340px] overflow-hidden border border-white/15 bg-[#0b3769]"><iframe title="Mercury Décor Limited office location" src="https://www.google.com/maps?q=131%20Circular%20Road%2C%20Elekahia%20Housing%20Estate%2C%20Port%20Harcourt%2C%20Rivers%20State%2C%20Nigeria&output=embed" className="h-[340px] w-full border-0 opacity-80 grayscale-[.35]" loading="lazy" /></div></section></Shell>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/services" component={Services} /><Route path="/catalogs" component={Catalogs} /><Route path="/industries" component={Industries} /><Route path="/contact" component={Contact} /><Route component={NotFoundPage} /></Switch></RoutedErrorBoundary>;
}
function NotFoundPage() { useEffect(() => { document.title = 'Page Not Found | Mercury Décor Limited'; const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]'); if (robots) robots.content = 'noindex, nofollow'; }, []); return <NotFound />; }
function RoutedErrorBoundary({ children }: { children: ReactNode }) { const [location] = useLocation(); return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>; }
function App() { return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>; }
export default App;