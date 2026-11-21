import { ArrowUpRight, Calendar, HeartPulse, Sparkles, Stethoscope, Waypoints } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useReveal } from '@/hooks/useReveal';

const services = [
  {
    icon: Sparkles,
    name: 'Teeth Whitening',
    blurb:
      'Professional-grade whitening that lifts years of stains in a single visit — up to 8 shades brighter.',
    tags: ['1-hour session', 'Sensitivity-free', 'Long-lasting'],
    accent: 'from-teal-400 to-teal-600',
  },
  {
    icon: HeartPulse,
    name: 'Implants',
    blurb:
      'Natural-looking, titanium-anchored implants restored by a specialist — built to last decades.',
    tags: ['3D-guided', 'Single & full-arch', '5-yr warranty'],
    accent: 'from-navy-500 to-navy-700',
  },
  {
    icon: Waypoints,
    name: 'Invisalign',
    blurb:
      'Discreet clear aligners with a digital preview of your finished smile before you even begin.',
    tags: ['Free scan', 'Digital preview', 'Fewer visits'],
    accent: 'from-teal-500 to-navy-600',
  },
  {
    icon: Stethoscope,
    name: 'Emergency Care',
    blurb:
      'Same-day relief for pain, chips, and lost crowns — we keep urgent slots open every weekday.',
    tags: ['Same-day', 'Walk-ins welcome', 'Evenings avail.'],
    accent: 'from-gold-400 to-teal-500',
  },
];

export function Services() {
  const { openModal } = useBooking();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="services" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-2xl text-center`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">
            What we do
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-navy-900 sm:text-5xl text-balance">
            Comprehensive care, one trusted studio
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Every treatment is delivered with gentle techniques and the latest technology —
            so your visit is calm, precise, and genuinely comfortable.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.name}
                className={`group reveal ${visible ? 'is-visible' : ''} relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div
                  className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${s.accent} opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-25`}
                />
                <div
                  className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.accent} text-white shadow-soft`}
                >
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-navy-900">
                  {s.name}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-navy-600">{s.blurb}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-navy-50 px-2.5 py-1 text-[11px] font-medium text-navy-700"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => openModal(s.name)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-navy-800 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-navy-900"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Book now
                  </button>
                  <a
                    href="#gallery"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 transition-colors hover:text-teal-800"
                  >
                    See results
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
