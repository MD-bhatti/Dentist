import { ArrowUpRight, GraduationCap, Sparkles, Stethoscope } from 'lucide-react';
import { doctors } from '@/data/doctors';
import { doctorImages } from '@/data/images';
import { useBooking } from '@/context/BookingContext';
import { useReveal } from '@/hooks/useReveal';

export function Doctors() {
  const { openModal } = useBooking();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="doctors" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-2xl text-center`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">
            Meet your team
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-navy-900 sm:text-5xl text-balance">
            Specialists you can trust
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Award-winning, endlessly gentle, and obsessed with the details. Your smile is in
            expert hands.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {doctors.map((d, i) => (
            <article
              key={d.id}
              className={`reveal ${visible ? 'is-visible' : ''} group relative overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              {/* Portrait area */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${d.tint}`} />
                {/* Real portrait photograph */}
                <img
                  src={doctorImages[d.id]}
                  alt={`Portrait of ${d.name}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Scrim for legible name overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/15 to-transparent" />
                <div className="absolute inset-0 bg-dots opacity-10" />

                {/* Credentials badge */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-navy-900 backdrop-blur">
                  <GraduationCap className="h-3.5 w-3.5 text-teal-600" />
                  {d.credentials}
                </div>

                {/* Specialty tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">{d.name}</h3>
                    <p className="text-xs font-medium text-teal-200">{d.role}</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600">
                  <Stethoscope className="h-3.5 w-3.5" />
                  {d.specialty}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">{d.bio}</p>

                <button
                  onClick={() => openModal()}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 transition-colors hover:text-teal-700"
                >
                  Book with {d.name.split(' ').slice(0, 2).join(' ')}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Team-wide highlight bar */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl border border-navy-100 bg-navy-50/50 px-6 py-6 text-center sm:flex-row sm:gap-6 sm:text-left">
          <div className="flex items-center gap-2 text-navy-800">
            <Sparkles className="h-5 w-5 text-teal-600" />
            <span className="text-sm font-semibold">75+ combined years of clinical excellence</span>
          </div>
          <span className="hidden h-4 w-px bg-navy-200 sm:block" />
          <span className="text-sm text-navy-600">
            Continuing education certified · ADA &amp; AACD members
          </span>
        </div>
      </div>
    </section>
  );
}
