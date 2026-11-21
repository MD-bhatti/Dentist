import { Quote } from 'lucide-react';
import { Stars } from './Stars';
import { useReveal } from '@/hooks/useReveal';

const testimonials = [
  {
    name: 'Jordan M.',
    detail: 'Invisalign · 14 months',
    rating: 5,
    text: "I dreaded braces as an adult, but the Invisalign preview sold me. The team made every check-in effortless and my smile is exactly what the scan promised.",
    initials: 'JM',
    tint: 'from-teal-400 to-teal-600',
  },
  {
    name: 'Priya S.',
    detail: 'Teeth Whitening',
    rating: 5,
    text: 'Eight shades brighter in one lunch break — zero sensitivity afterward. Apex is the only place I trust for cosmetic work in Austin.',
    initials: 'PS',
    tint: 'from-navy-500 to-navy-700',
  },
  {
    name: 'Marcus T.',
    detail: 'Dental Implant',
    rating: 5,
    text: 'Cracked a molar on a Friday and they fit me in that afternoon. The implant looks indistinguishable from my real teeth. Genuinely painless.',
    initials: 'MT',
    tint: 'from-teal-500 to-navy-600',
  },
  {
    name: 'Elena R.',
    detail: 'Family & cleanings',
    rating: 5,
    text: 'We bring our two kids here now. Dr. Reyes has a calm that puts the whole family at ease — even my anxious six-year-old leaves smiling.',
    initials: 'ER',
    tint: 'from-gold-400 to-teal-500',
  },
  {
    name: 'David K.',
    detail: 'Emergency Care',
    rating: 5,
    text: 'Lost a crown the night before a big presentation. They got me in at 8am, re-cemented it, and I made my meeting. Lifesavers.',
    initials: 'DK',
    tint: 'from-navy-500 to-teal-600',
  },
  {
    name: 'Aaliyah B.',
    detail: 'Veneers consultation',
    rating: 5,
    text: 'The consultation was honest — they talked me out of work I didn\'t need. That kind of integrity is rare and why I\'ll stay a patient for life.',
    initials: 'AB',
    tint: 'from-teal-400 to-navy-600',
  },
];

export function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="testimonials" className="relative overflow-hidden bg-navy-50/40 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-teal-100/70 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-navy-100/70 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} flex flex-col items-end justify-between gap-6 sm:flex-row sm:items-end`}
        >
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">
              Patient stories
            </span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-navy-900 sm:text-5xl text-balance">
              Loved by thousands of Austin smiles
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-navy-100 bg-white px-5 py-3 shadow-soft">
            <Stars rating={5} />
            <span className="text-sm font-semibold text-navy-900">4.9 / 5</span>
            <span className="text-sm text-navy-500">· 1,200+ reviews</span>
          </div>
        </div>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={`reveal ${visible ? 'is-visible' : ''} mb-6 break-inside-avoid rounded-3xl border border-navy-100 bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Quote className="h-8 w-8 text-teal-200" />
              <blockquote className="mt-3 text-[15px] leading-relaxed text-navy-700">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${t.tint} text-sm font-bold text-white shadow-soft`}
                >
                  {t.initials}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-navy-900">{t.name}</span>
                  <span className="text-xs text-navy-500">{t.detail}</span>
                </span>
                <Stars rating={t.rating} className="ml-auto" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
