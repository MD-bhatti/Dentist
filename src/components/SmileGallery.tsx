import { useRef, useState } from 'react';
import { ArrowUpRight, HeartPulse, Sparkles, Waypoints } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useReveal } from '@/hooks/useReveal';
import { galleryImages } from '@/data/images';

type Category = 'Invisalign' | 'Porcelain Veneers' | 'Laser Whitening';

type SmileCase = {
  category: Category;
  patient: string;
  duration: string;
  image: string;
};

const imagePool: Record<Category, readonly string[]> = {
  Invisalign: galleryImages.invisalign,
  'Porcelain Veneers': galleryImages.veneers,
  'Laser Whitening': galleryImages.whitening,
};

const cases: SmileCase[] = [
  { category: 'Invisalign', patient: 'Sarah, 28', duration: '14 months', image: imagePool.Invisalign[0] },
  { category: 'Porcelain Veneers', patient: 'Michael, 35', duration: '2 visits', image: imagePool['Porcelain Veneers'][0] },
  { category: 'Laser Whitening', patient: 'Priya, 31', duration: '1 hour', image: imagePool['Laser Whitening'][0] },
  { category: 'Invisalign', patient: 'David, 42', duration: '10 months', image: imagePool.Invisalign[1] },
  { category: 'Porcelain Veneers', patient: 'Elena, 39', duration: '3 visits', image: imagePool['Porcelain Veneers'][1] },
  { category: 'Laser Whitening', patient: 'James, 26', duration: '1 hour', image: imagePool['Laser Whitening'][1] },
];

const tabs: { id: Category; icon: typeof Sparkles }[] = [
  { id: 'Invisalign', icon: Waypoints },
  { id: 'Porcelain Veneers', icon: HeartPulse },
  { id: 'Laser Whitening', icon: Sparkles },
];

export function SmileGallery() {
  const { openModal } = useBooking();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [active, setActive] = useState<Category>('Invisalign');

  const filtered = cases.filter((c) => c.category === active);

  return (
    <section id="gallery" className="relative overflow-hidden bg-navy-900 py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-teal-700/30 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-navy-600/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-2xl text-center`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">
            Smile transformations
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl text-balance">
            Real before &amp; after results
          </h2>
          <p className="mt-4 text-lg text-navy-200">
            Drag the slider on any transformation to see the difference our care makes.
            Filter by treatment to explore the results that matter to you.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-teal-400 text-navy-900 shadow-glow'
                    : 'bg-white/10 text-white/80 hover:bg-white/15 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.id}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <div
              key={`${c.patient}-${i}`}
              className={`reveal ${visible ? 'is-visible' : ''} group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-teal-400/40`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <BeforeAfter image={c.image} />
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-white">{c.patient}</p>
                  <p className="text-xs text-navy-300">
                    {c.category} · {c.duration}
                  </p>
                </div>
                <button
                  onClick={() => openModal(c.category)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-teal-300 transition-colors hover:text-teal-200"
                >
                  Book this
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({ image }: { image: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden bg-navy-800"
      onMouseDown={(e) => {
        dragging.current = true;
        move(e.clientX);
      }}
      onMouseMove={(e) => dragging.current && move(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => {
        dragging.current = true;
        move(e.touches[0].clientX);
      }}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onTouchEnd={() => (dragging.current = false)}
    >
      <img
        src={image}
        alt="After smile transformation"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: 'brightness(1.08) contrast(1.06)' }}
      />
      <span className="absolute right-3 top-3 z-10 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy-900">
        After
      </span>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={image}
          alt="Before smile transformation"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: 'sepia(0.65) saturate(2.1) hue-rotate(-15deg) brightness(0.82)' }}
        />
      </div>
      <span className="absolute left-3 top-3 z-10 rounded-md bg-navy-900/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
        Before
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_0_1px_rgba(11,37,69,0.25)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy-800 shadow-card">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
