import { type AnchorHTMLAttributes, type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowRight,
  Boxes,
  Building2,
  Check,
  ChevronDown,
  ClipboardList,
  Compass,
  Hammer,
  Layers3,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  Ruler,
  Send,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import logoPath from '../../../.local/conversation-workspace/files/attached_assets/WhatsApp_Image_2026-09-21_at_4.30.58_PM_1790007565455.jpeg';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
import { type LucideIcon } from 'lucide-react';

const queryClient = new QueryClient();
const whatsappNumber = '2348082277274';
const whatsappMessage =
  'Hello Mercury Décor Limited, I would like to make an enquiry about your services.';
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

const services = [
  {
    number: '01',
    title: 'Interior & Exterior Finishing',
    short: 'Refined surfaces, considered materials and the final layer that makes a space feel complete.',
    description:
      'Professional finishing solutions designed to transform interior and exterior spaces with quality materials and refined workmanship.',
    items: ['Painting', 'Wall Screeding', 'Tiling', 'Marble-Effect Finishes', 'Graze Finishes', '3D Wall Panels', 'Stamped Flooring'],
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'Ceiling & Decorative Works',
    short: 'Architectural details that shape how a room carries light, movement and character.',
    description:
      'Modern ceiling and decorative solutions designed to enhance the appearance, character and functionality of your space.',
    items: ['POP Ceilings', 'Plasterboard Ceilings', 'Skim Ceilings', 'Decorative Ceiling Designs'],
    icon: Layers3,
  },
  {
    number: '03',
    title: 'Building & Installation',
    short: 'Practical building support from structure and roofing through to the details people touch.',
    description:
      'Reliable building and installation services supporting residential, commercial and corporate projects.',
    items: ['Roofing', 'Window Hoods', 'Handrails', 'Building & Installation', 'Plumbing'],
    icon: Hammer,
  },
  {
    number: '04',
    title: 'Procurement & Supply',
    short: 'The right materials, sourced with a clear view of your project requirements.',
    description:
      'Procurement and supply solutions helping clients source essential materials for their construction and development requirements.',
    items: ['Building Materials', 'Construction Materials', 'General Procurement', 'Chippings Supply'],
    icon: Boxes,
  },
  {
    number: '05',
    title: 'Logistics & Support',
    short: 'A dependable layer for movement, storage, inspection and material coordination.',
    description:
      'Supporting efficient movement, storage, inspection and management of goods and construction materials.',
    items: ['Logistics', 'Warehousing', 'Inventory Management', 'Cargo Inspection'],
    icon: Truck,
  },
  {
    number: '06',
    title: 'General Contracting',
    short: 'A flexible project partner for the scope, scale and type of work in front of you.',
    description:
      'Flexible contracting solutions for different project requirements, from residential developments to commercial and corporate spaces.',
    items: ['Residential Projects', 'Commercial Projects', 'Corporate Projects', 'General Contract Services'],
    icon: Building2,
  },
] satisfies Array<{
  number: string;
  title: string;
  short: string;
  description: string;
  items: string[];
  icon: LucideIcon;
}>;

const catalogs = [
  {
    title: 'Interior & Exterior Finishing',
    category: 'SURFACES / 01',
    description: 'A considered range of finishing solutions for walls, floors and the character of a space.',
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Ruler,
  },
  {
    title: 'Ceiling & Decorative Works',
    category: 'DETAIL / 02',
    description: 'Ceiling forms and decorative details that bring scale, rhythm and polish overhead.',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Layers3,
  },
  {
    title: 'Building & Installation',
    category: 'BUILD / 03',
    description: 'Building and installation support for the practical elements that keep a project moving.',
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Hammer,
  },
  {
    title: 'Procurement & Supply',
    category: 'SOURCE / 04',
    description: 'Materials and supply support structured around what your development requires.',
    image: 'https://images.pexels.com/photos/4481327/pexels-photo-4481327.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: PackageCheck,
  },
];

const navItems = [
  ['About', 'about'],
  ['Services', 'services'],
  ['Catalogs', 'catalogs'],
  ['Industries', 'industries'],
  ['Contact', 'contact'],
];

function AppLink({
  href,
  children,
  className = '',
  onClick,
  ...rest
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href' | 'className' | 'onClick'>) {
  return (
    <a href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <AppLink href="#home" className="group inline-flex items-center gap-3" data-testid="link-logo">
      <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[3px] border ${dark ? 'border-white/20 bg-white' : 'border-[#d6a62a]/30 bg-white'}`}>
        <img src={logoPath} alt="Mercury Décor Limited logo" className="h-full w-full object-cover object-center" />
      </span>
      <span className="hidden sm:block">
        <span className={`block font-display text-[13px] font-extrabold uppercase tracking-[.12em] ${dark ? 'text-white' : 'text-[#082b54]'}`}>Mercury Décor</span>
        <span className={`block text-[9px] font-semibold uppercase tracking-[.2em] ${dark ? 'text-white/55' : 'text-[#a90000]'}`}>Limited</span>
      </span>
    </AppLink>
  );
}

function WhatsAppButton({ label = 'Chat on WhatsApp', compact = false, service }: { label?: string; compact?: boolean; service?: string }) {
  const message = service
    ? `Hello Mercury Décor Limited, I am interested in your ${service}. I would like to request more information and a quotation.`
    : whatsappMessage;
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noreferrer"
      data-testid={`link-whatsapp${service ? `-${service.toLowerCase().replaceAll(' ', '-')}` : ''}`}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#d6a62a]/60 font-display text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d6a62a] hover:bg-[#d6a62a] hover:text-[#082b54] ${compact ? 'px-4 py-2.5' : 'px-5 py-3'}`}
    >
      <MessageCircle size={17} strokeWidth={1.8} />
      {label}
    </a>
  );
}

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`eyebrow flex items-center gap-3 ${light ? 'text-[#d6a62a]' : 'text-[#a90000]'}`}>
      <span className="h-px w-8 bg-current" />
      {children}
    </div>
  );
}

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCatalog, setActiveCatalog] = useState<(typeof catalogs)[number] | null>(null);
  const [selectedService, setSelectedService] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Mercury Décor Limited | Interior & Exterior Finishing Specialists';
    const description = 'Mercury Décor Limited provides professional interior and exterior finishing, construction, procurement, supply, logistics and general contracting services in Port Harcourt, Rivers State, Nigeria.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = window.location.origin + '/';
    document.head.appendChild(canonical);
    return () => canonical.remove();
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const scrollToQuote = (service?: string) => {
    if (service) setSelectedService(service);
    setMobileOpen(false);
    window.setTimeout(() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' }), 20);
  };

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="noise min-h-[100dvh] overflow-x-hidden bg-[#f5f7fa] text-[#111827]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Mercury Décor Limited',
        description: 'Professional Interior & Exterior Finishing Specialists',
        email: 'silnice873@gmail.com',
        telephone: '+234 808 227 7274',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '131 Circular Road, Elekahia Housing Estate',
          addressLocality: 'Port Harcourt',
          addressRegion: 'Rivers State',
          addressCountry: 'NG',
        },
      }) }} />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#082b54]/95 text-white backdrop-blur-md">
        <div className="container-wide flex h-[76px] items-center justify-between">
          <Logo dark />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, id]) => (
              <AppLink key={id} href={`#${id}`} data-testid={`link-nav-${id}`} className="text-[12px] font-semibold tracking-[.08em] text-white/70 transition-colors hover:text-[#d6a62a]">{label}</AppLink>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <WhatsAppButton compact label="WhatsApp" />
            <button type="button" onClick={() => scrollToQuote()} data-testid="button-header-quote" className="inline-flex items-center gap-2 rounded-full bg-[#d6a62a] px-5 py-2.5 font-display text-sm font-extrabold text-[#082b54] transition-all hover:-translate-y-0.5 hover:bg-[#f1c95b]">
              Request a Quote <ArrowRight size={15} />
            </button>
          </div>
          <button type="button" className="rounded-full p-2 text-white lg:hidden" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)} data-testid="button-mobile-menu">
            {mobileOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="border-t border-white/10 bg-[#082b54] px-5 py-5 lg:hidden" aria-label="Mobile navigation">
            <div className="container-wide flex flex-col gap-1">
              {navItems.map(([label, id]) => (
                <AppLink key={id} href={`#${id}`} onClick={() => setMobileOpen(false)} data-testid={`link-mobile-nav-${id}`} className="border-b border-white/10 py-3 font-display text-sm font-semibold text-white/80">{label}</AppLink>
              ))}
              <button type="button" onClick={() => scrollToQuote()} data-testid="button-mobile-quote" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d6a62a] px-5 py-3 font-display text-sm font-extrabold text-[#082b54]">
                Request a Quote <ArrowRight size={15} />
              </button>
              <WhatsAppButton label="Chat on WhatsApp" />
            </div>
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="relative isolate flex min-h-[720px] items-end overflow-hidden bg-[#082b54] pt-[76px] lg:min-h-[790px]">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img src="https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg?auto=compress&cs=tinysrgb&w=2000" alt="Architectural interior atmosphere" className="hero-art h-full w-full object-cover opacity-55" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,84,.98)_0%,rgba(8,43,84,.8)_42%,rgba(8,43,84,.3)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,43,84,.86)_0%,transparent_55%)]" />
          </div>
          <div className="container-wide relative flex w-full flex-col justify-end pb-14 pt-20 lg:pb-24">
            <div className="max-w-[760px]">
              <div className="reveal flex items-center gap-3 text-[#d6a62a]">
                <span className="h-px w-10 bg-[#d6a62a]" />
                <span className="eyebrow">Professional Interior &amp; Exterior Finishing Specialists</span>
              </div>
              <h1 className="reveal reveal-delay-1 mt-6 max-w-[680px] font-display text-[clamp(3.5rem,9vw,7.6rem)] font-extrabold leading-[.93] tracking-[-.07em] text-white">
                Building <span className="font-editorial font-semibold italic tracking-[-.05em] text-[#d6a62a]">Beautiful</span> Spaces.
              </h1>
              <p className="reveal reveal-delay-2 mt-7 max-w-[565px] text-base leading-7 text-white/72 md:text-lg">
                Mercury Décor Limited delivers professional interior and exterior finishing, construction, procurement, supply and project support solutions for residential, commercial and corporate projects.
              </p>
              <div className="reveal reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => scrollToQuote()} data-testid="button-hero-quote" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#d6a62a] px-6 py-3.5 font-display text-sm font-extrabold text-[#082b54] transition-all hover:-translate-y-0.5 hover:bg-[#f1c95b]">
                  Request a Quote <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </button>
                <WhatsAppButton />
              </div>
            </div>
            <div className="mt-16 flex items-end justify-between border-t border-white/20 pt-5 text-white/55 lg:mt-28">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[.18em]"><span className="pulse-line block h-px w-8 bg-[#d6a62a]" /> Port Harcourt · Rivers State</div>
              <a href="#about" className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] transition-colors hover:text-[#d6a62a] sm:flex" data-testid="link-hero-scroll">Scroll to explore <ArrowDown size={15} /></a>
            </div>
          </div>
          <div className="pointer-events-none absolute right-8 top-[45%] hidden -rotate-90 items-center gap-3 text-[10px] font-semibold uppercase tracking-[.3em] text-white/35 xl:flex"><span className="h-px w-8 bg-white/35" /> M.D.L / 2026</div>
        </section>

        <section className="relative overflow-hidden bg-[#d6a62a] py-9">
          <div className="container-wide grid gap-7 md:grid-cols-[1.25fr_2fr] md:items-center">
            <div className="font-editorial text-2xl leading-tight text-[#082b54] md:text-3xl">Professional solutions.<br /><span className="italic">Beautiful results.</span></div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 border-l border-[#082b54]/25 pl-5 text-[12px] font-bold uppercase tracking-[.08em] text-[#082b54] sm:grid-cols-4 md:pl-8">
              {['Quality Workmanship', 'Professional Delivery', 'Reliable Supply', 'Client-Focused Service'].map((item) => <div key={item} className="flex gap-2"><Check size={15} className="shrink-0 text-[#a90000]" /> {item}</div>)}
            </div>
          </div>
        </section>

        <section id="about" className="grid-blueprint scroll-mt-20 overflow-hidden py-24 md:py-32">
          <div className="container-wide grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-24">
            <div className="reveal relative">
              <div className="absolute -left-5 -top-5 h-24 w-24 border-l border-t border-[#a90000]/45" />
              <div className="relative overflow-hidden rounded-[2px]">
                <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Modern interior with architectural finishes" loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.04]" />
                <div className="absolute bottom-5 left-5 bg-[#082b54] px-5 py-4 text-white">
                  <div className="eyebrow text-[#d6a62a]">Mercury Décor Limited</div>
                  <div className="mt-1 text-xs text-white/60">Finishing · Supply · Support</div>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-1">
              <SectionLabel>About the company</SectionLabel>
              <h2 className="mt-5 max-w-[600px] font-display text-4xl font-extrabold leading-[1.04] tracking-[-.045em] text-[#082b54] md:text-6xl">A clear standard for every <span className="font-editorial font-semibold italic text-[#a90000]">surface.</span></h2>
              <div className="mt-7 max-w-[570px] space-y-5 text-[15px] leading-7 text-[#4b5563]">
                <p>Mercury Décor Limited is a Nigerian company specializing in professional interior and exterior finishing, construction, procurement, supply and project support services.</p>
                <p>We provide practical solutions for residential, commercial and corporate projects, combining quality workmanship, reliable materials and professional service delivery.</p>
              </div>
              <button type="button" onClick={() => scrollToQuote()} data-testid="button-about-quote" className="group mt-8 inline-flex items-center gap-3 border-b-2 border-[#a90000] pb-2 font-display text-sm font-extrabold text-[#082b54] transition-colors hover:text-[#a90000]">Learn More About Us <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></button>
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-20 bg-[#082b54] py-24 text-white md:py-32">
          <div className="container-wide">
            <div className="reveal flex flex-col justify-between gap-6 border-b border-white/15 pb-9 md:flex-row md:items-end">
              <div>
                <SectionLabel light>What we do</SectionLabel>
                <h2 className="mt-5 max-w-[650px] font-display text-4xl font-extrabold leading-[1.03] tracking-[-.05em] md:text-6xl">Built around your<br /><span className="font-editorial font-semibold italic text-[#d6a62a]">next conversation.</span></h2>
              </div>
              <p className="max-w-[290px] text-sm leading-6 text-white/58">Professional solutions for construction, finishing, supply and project support.</p>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden bg-white/15 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className={`reveal reveal-delay-${(index % 3) + 1} group flex min-h-[390px] flex-col bg-[#0b3769] p-7 transition-colors duration-500 hover:bg-[#114579] md:p-8`}>
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center border border-[#d6a62a]/55 text-[#d6a62a]"><Icon size={21} strokeWidth={1.5} /></div>
                      <span className="font-mono text-xs text-white/35">{service.number}</span>
                    </div>
                    <h3 className="mt-10 max-w-[230px] font-display text-2xl font-bold leading-tight tracking-[-.035em]">{service.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-white/58">{service.short}</p>
                    <div className="mt-auto border-t border-white/12 pt-5">
                      <div className="flex flex-wrap gap-x-3 gap-y-2">
                        {service.items.map((item) => <span key={item} className="text-[11px] text-white/62">{item}</span>)}
                      </div>
                      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                        <button type="button" onClick={() => scrollToQuote(service.title)} data-testid={`button-service-quote-${service.number}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.08em] text-[#d6a62a] transition-colors hover:text-white">Request a Quote <ArrowRight size={14} /></button>
                        <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello Mercury Décor Limited, I am interested in your ${service.title}. I would like to request more information and a quotation.`)}`} target="_blank" rel="noreferrer" data-testid={`link-service-whatsapp-${service.number}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.08em] text-white/55 transition-colors hover:text-white"><MessageCircle size={14} /> Ask on WhatsApp</a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="catalogs" className="scroll-mt-20 bg-[#f5f7fa] py-24 md:py-32">
          <div className="container-wide">
            <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionLabel>Digital showroom</SectionLabel>
                <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[#082b54] md:text-6xl">Our <span className="font-editorial font-semibold italic text-[#a90000]">Catalogs.</span></h2>
              </div>
              <p className="max-w-[330px] text-sm leading-6 text-[#5b6470]">Explore our range of finishing, building and construction solutions.</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {catalogs.map((catalog, index) => {
                const Icon = catalog.icon;
                return (
                  <article key={catalog.title} className={`reveal reveal-delay-${(index % 3) + 1} group flex flex-col overflow-hidden rounded-[2px] border border-[#082b54]/12 bg-white shadow-[0_16px_40px_rgba(8,43,84,.05)]`}>
                    <div className="relative aspect-[.95] overflow-hidden bg-[#dce4ec]">
                      <img src={catalog.image} alt={`${catalog.title} visual atmosphere`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#082b54]/80 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[#082b54]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#d6a62a]"><Icon size={13} /> {catalog.category}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-lg font-bold leading-tight text-[#082b54]">{catalog.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#5b6470]">{catalog.description}</p>
                      <div className="mt-auto flex items-center gap-4 pt-7">
                        <button type="button" onClick={() => setActiveCatalog(catalog)} data-testid={`button-view-catalog-${index}`} className="group/link inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.06em] text-[#a90000]">View Catalog <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" /></button>
                        <button type="button" onClick={() => scrollToQuote(catalog.title)} data-testid={`button-catalog-quote-${index}`} className="text-xs font-bold text-[#082b54]/60 transition-colors hover:text-[#082b54]">Quote</button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="industries" className="scroll-mt-20 border-y border-[#082b54]/10 bg-white py-24 md:py-32">
          <div className="container-wide">
            <div className="reveal grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
              <div><SectionLabel>Built for context</SectionLabel><h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-[-.05em] text-[#082b54] md:text-5xl">Industries<br /><span className="font-editorial font-semibold italic text-[#a90000]">we serve.</span></h2></div>
              <p className="max-w-[470px] text-sm leading-7 text-[#5b6470]">From a home that needs its final layer to a corporate space with a demanding brief, we bring practical finishing and project support to the work.</p>
            </div>
            <div className="mt-14 grid gap-0 border-y border-[#082b54]/15 md:grid-cols-4">
              {[
                ['Residential', 'Thoughtful finishing and building support for homes and living spaces.', Compass],
                ['Commercial', 'Practical solutions for spaces designed to welcome, work and perform.', Building2],
                ['Corporate', 'A considered project partner for professional environments and requirements.', ClipboardList],
                ['Construction', 'Materials, logistics and contracting support for construction needs.', Hammer],
              ].map(([title, description, Icon], index) => {
                const IndustryIcon = Icon as LucideIcon;
                return <article key={title as string} className={`reveal reveal-delay-${(index % 3) + 1} border-[#082b54]/15 py-8 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0`}><IndustryIcon size={23} strokeWidth={1.5} className="text-[#a90000]" /><h3 className="mt-7 font-display text-xl font-bold text-[#082b54]">{title as string}</h3><p className="mt-3 text-sm leading-6 text-[#5b6470]">{description as string}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#a90000] py-20 text-white md:py-28">
          <div className="absolute -right-14 -top-24 h-80 w-80 rounded-full border border-white/15" />
          <div className="absolute -right-2 -top-12 h-56 w-56 rounded-full border border-white/10" />
          <div className="container-wide relative grid gap-8 md:grid-cols-[1.2fr_.8fr] md:items-end">
            <div className="reveal"><SectionLabel light>Why Mercury Décor</SectionLabel><h2 className="mt-5 max-w-[710px] font-display text-4xl font-extrabold leading-[1.02] tracking-[-.055em] md:text-6xl">Good work is visible<br /><span className="font-editorial font-semibold italic text-[#f1c95b]">in the details.</span></h2></div>
            <div className="reveal reveal-delay-1 grid grid-cols-2 gap-x-6 gap-y-7">
              {['Quality Workmanship', 'Professional Delivery', 'Reliable Supply', 'Client-Focused Service'].map((item, index) => <div key={item} className="border-t border-white/25 pt-3"><span className="font-mono text-xs text-[#f1c95b]">0{index + 1}</span><div className="mt-2 font-display text-sm font-bold">{item}</div></div>)}
            </div>
          </div>
        </section>

        <section id="quote" className="scroll-mt-20 bg-[#f5f7fa] py-24 md:py-32">
          <div className="container-wide grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:items-start lg:gap-24">
            <div className="reveal lg:sticky lg:top-28">
              <SectionLabel>Start the brief</SectionLabel>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[#082b54] md:text-6xl">Have a project<br /><span className="font-editorial font-semibold italic text-[#a90000]">in mind?</span></h2>
              <p className="mt-6 max-w-[360px] text-[15px] leading-7 text-[#5b6470]">Tell us what you need and our team will get back to you.</p>
              <div className="mt-9 flex flex-col items-start gap-4">
                <WhatsAppButton />
                <a href="tel:+2348082277274" data-testid="link-quote-phone" className="inline-flex items-center gap-2 text-sm font-bold text-[#082b54]"><Phone size={16} className="text-[#a90000]" /> +234 808 227 7274</a>
              </div>
            </div>
            <div className="reveal reveal-delay-1 rounded-[2px] border border-[#082b54]/12 bg-white p-6 shadow-[0_18px_60px_rgba(8,43,84,.06)] md:p-10">
              {submitted ? (
                <div className="flex min-h-[500px] flex-col items-start justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d6a62a] text-[#082b54]"><Check size={27} strokeWidth={2.5} /></div>
                  <div className="eyebrow mt-8 text-[#a90000]">Request received</div>
                  <h3 className="mt-4 max-w-[450px] font-display text-3xl font-extrabold leading-tight tracking-[-.04em] text-[#082b54] md:text-4xl">Thank you for starting the conversation.</h3>
                  <p className="mt-4 max-w-[470px] text-sm leading-7 text-[#5b6470]">Your project details are ready for the Mercury Décor team. We will review your request and get back to you using the contact details provided.</p>
                  <button type="button" onClick={() => setSubmitted(false)} data-testid="button-new-quote" className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#082b54]/20 px-5 py-3 text-sm font-bold text-[#082b54] transition-colors hover:border-[#a90000] hover:text-[#a90000]">Start another request <ArrowRight size={15} /></button>
                </div>
              ) : (
                <form onSubmit={submitQuote} className="grid gap-5 sm:grid-cols-2" aria-label="Request a quote form">
                  <div className="sm:col-span-2"><div className="flex items-end justify-between"><div><div className="eyebrow text-[#a90000]">Project enquiry</div><h3 className="mt-2 font-display text-2xl font-extrabold tracking-[-.035em] text-[#082b54]">Tell us about the work.</h3></div><span className="text-xs text-[#6b7280]">* Required</span></div></div>
                  <label className="grid gap-2 text-xs font-bold text-[#082b54]">Full Name *<input required name="fullName" data-testid="input-full-name" placeholder="Your full name" className="h-12 rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 text-sm font-normal text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#a90000]" /></label>
                  <label className="grid gap-2 text-xs font-bold text-[#082b54]">Company Name<input name="companyName" data-testid="input-company-name" placeholder="Company or organisation" className="h-12 rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 text-sm font-normal text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#a90000]" /></label>
                  <label className="grid gap-2 text-xs font-bold text-[#082b54]">Phone Number *<input required type="tel" name="phone" data-testid="input-phone" placeholder="+234 ..." className="h-12 rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 text-sm font-normal text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#a90000]" /></label>
                  <label className="grid gap-2 text-xs font-bold text-[#082b54]">Email Address *<input required type="email" name="email" data-testid="input-email" placeholder="you@company.com" className="h-12 rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 text-sm font-normal text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#a90000]" /></label>
                  <label className="relative grid gap-2 text-xs font-bold text-[#082b54]">Service Required *<select required name="service" value={selectedService} onChange={(event) => setSelectedService(event.target.value)} data-testid="select-service" className="h-12 appearance-none rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 pr-10 text-sm font-normal text-[#111827] outline-none transition-colors focus:border-[#a90000]"><option value="">Select a service</option>{services.map((service) => <option key={service.title} value={service.title}>{service.title}</option>)}</select><ChevronDown size={16} className="pointer-events-none absolute bottom-3.5 right-4 text-[#082b54]/60" /></label>
                  <label className="relative grid gap-2 text-xs font-bold text-[#082b54]">Project Type *<select required name="projectType" data-testid="select-project-type" className="h-12 appearance-none rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 pr-10 text-sm font-normal text-[#111827] outline-none transition-colors focus:border-[#a90000]"><option value="">Select project type</option><option>Residential</option><option>Commercial</option><option>Corporate</option><option>Other</option></select><ChevronDown size={16} className="pointer-events-none absolute bottom-3.5 right-4 text-[#082b54]/60" /></label>
                  <label className="grid gap-2 text-xs font-bold text-[#082b54]">Project Location *<input required name="location" data-testid="input-location" placeholder="City / area" className="h-12 rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 text-sm font-normal text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#a90000]" /></label>
                  <label className="grid gap-2 text-xs font-bold text-[#082b54]">Preferred Start Date<input type="date" name="startDate" data-testid="input-start-date" className="h-12 rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 text-sm font-normal text-[#111827] outline-none transition-colors focus:border-[#a90000]" /></label>
                  <label className="grid gap-2 text-xs font-bold text-[#082b54] sm:col-span-2">Project Description *<textarea required name="description" data-testid="input-description" rows={4} placeholder="What would you like us to help with?" className="resize-y rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 py-3 text-sm font-normal leading-6 text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#a90000]" /></label>
                  <label className="grid gap-2 text-xs font-bold text-[#082b54] sm:col-span-2">Additional Information<textarea name="additionalInfo" data-testid="input-additional-information" rows={3} placeholder="Anything else we should know?" className="resize-y rounded-[2px] border border-[#082b54]/15 bg-[#f8fafc] px-4 py-3 text-sm font-normal leading-6 text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#a90000]" /></label>
                  <div className="flex flex-col gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-[300px] text-xs leading-5 text-[#6b7280]">Your details are used to respond to this enquiry and prepare the next conversation.</p><button type="submit" data-testid="button-submit-request" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#a90000] px-6 py-3.5 font-display text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-[#850000]">Submit Request <Send size={16} /></button></div>
                </form>
              )}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 bg-[#082b54] py-24 text-white md:py-28">
          <div className="container-wide grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
            <div className="reveal">
              <SectionLabel light>Find us</SectionLabel>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-[-.05em] md:text-6xl">Let’s talk about<br /><span className="font-editorial font-semibold italic text-[#d6a62a]">your project.</span></h2>
              <div className="mt-10 space-y-6">
                <div className="flex gap-4"><MapPin size={19} className="mt-1 shrink-0 text-[#d6a62a]" /><div><div className="text-xs font-bold uppercase tracking-[.14em] text-white/45">Office</div><address className="mt-2 not-italic text-sm leading-6 text-white/78">131 Circular Road,<br />Elekahia Housing Estate,<br />Port Harcourt,<br />Rivers State, Nigeria</address></div></div>
                <a href="mailto:silnice873@gmail.com" data-testid="link-contact-email" className="flex gap-4 text-white/78 transition-colors hover:text-[#d6a62a]"><Mail size={19} className="mt-0.5 shrink-0 text-[#d6a62a]" /><span className="text-sm">silnice873@gmail.com</span></a>
                <a href="tel:+2348082277274" data-testid="link-contact-phone" className="flex gap-4 text-white/78 transition-colors hover:text-[#d6a62a]"><Phone size={19} className="mt-0.5 shrink-0 text-[#d6a62a]" /><span className="text-sm">+234 808 227 7274</span></a>
              </div>
              <div className="mt-10 flex flex-wrap gap-3"><WhatsAppButton /><a href="https://www.google.com/maps/search/?api=1&query=131+Circular+Road+Elekahia+Housing+Estate+Port+Harcourt+Rivers+State+Nigeria" target="_blank" rel="noreferrer" data-testid="link-google-maps" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-bold transition-colors hover:border-[#d6a62a] hover:text-[#d6a62a]"><MapPin size={16} /> Google Maps</a></div>
            </div>
            <div className="reveal reveal-delay-1 min-h-[360px] overflow-hidden border border-white/15 bg-[#0b3769]">
              <iframe title="Mercury Décor Limited office location" src="https://www.google.com/maps?q=131%20Circular%20Road%2C%20Elekahia%20Housing%20Estate%2C%20Port%20Harcourt%2C%20Rivers%20State%2C%20Nigeria&output=embed" className="h-full min-h-[360px] w-full border-0 opacity-80 grayscale-[.35]" loading="lazy" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#061f3d] py-14 text-white">
        <div className="container-wide">
          <div className="grid gap-12 border-b border-white/12 pb-12 md:grid-cols-[1.15fr_.75fr_.9fr]">
            <div><Logo dark /><p className="mt-6 max-w-[270px] text-sm leading-6 text-white/55">Professional Interior &amp; Exterior Finishing Specialists.</p><div className="mt-6 h-px w-24 bg-[#d6a62a]" /></div>
            <div><div className="eyebrow text-[#d6a62a]">Navigate</div><div className="mt-5 grid grid-cols-2 gap-y-3 text-sm text-white/62">{navItems.map(([label, id]) => <AppLink key={id} href={`#${id}`} data-testid={`link-footer-${id}`} className="transition-colors hover:text-white">{label}</AppLink>)}</div></div>
            <div><div className="eyebrow text-[#d6a62a]">Contact</div><div className="mt-5 space-y-3 text-sm leading-6 text-white/62"><div>131 Circular Road,<br />Elekahia Housing Estate,<br />Port Harcourt, Rivers State, Nigeria</div><a href="mailto:silnice873@gmail.com" className="block transition-colors hover:text-white" data-testid="link-footer-email">silnice873@gmail.com</a><a href="tel:+2348082277274" className="block transition-colors hover:text-white" data-testid="link-footer-phone">+234 808 227 7274</a><WhatsAppButton compact label="WhatsApp" /></div></div>
          </div>
          <div className="flex flex-col gap-3 pt-7 text-xs text-white/38 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Mercury Décor Limited. All Rights Reserved.</span><span>Building Beautiful Spaces.</span></div>
        </div>
      </footer>

      <a href={whatsappUrl} target="_blank" rel="noreferrer" data-testid="link-floating-whatsapp" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-[#d6a62a] px-4 py-3 font-display text-xs font-extrabold text-[#082b54] shadow-[0_10px_30px_rgba(8,43,84,.25)] transition-all hover:-translate-y-1 hover:bg-[#f1c95b] sm:bottom-7 sm:right-7 sm:px-5 sm:py-3.5 sm:text-sm"><MessageCircle size={18} /> <span>Chat on WhatsApp</span></a>

      {activeCatalog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#061f3d]/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="catalog-dialog-title">
          <div className="relative grid max-h-[90vh] w-full max-w-3xl overflow-auto rounded-[2px] bg-white shadow-2xl md:grid-cols-2">
            <button type="button" onClick={() => setActiveCatalog(null)} aria-label="Close catalog" data-testid="button-close-catalog" className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#082b54] text-white transition-colors hover:bg-[#a90000]"><X size={18} /></button>
            <img src={activeCatalog.image} alt={`${activeCatalog.title} visual atmosphere`} className="h-64 w-full object-cover md:h-full" />
            <div className="p-7 md:p-10"><div className="eyebrow text-[#a90000]">{activeCatalog.category}</div><h2 id="catalog-dialog-title" className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-.04em] text-[#082b54]">{activeCatalog.title}</h2><p className="mt-5 text-sm leading-7 text-[#5b6470]">{activeCatalog.description}</p><div className="mt-8 border-t border-[#082b54]/12 pt-6"><p className="text-xs font-bold uppercase tracking-[.1em] text-[#082b54]">Ready to discuss this category?</p><button type="button" onClick={() => { setActiveCatalog(null); scrollToQuote(activeCatalog.title); }} data-testid="button-modal-quote" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#a90000] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#850000]">Request a Quote <ArrowRight size={15} /></button></div></div>
          </div>
        </div>
      )}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;