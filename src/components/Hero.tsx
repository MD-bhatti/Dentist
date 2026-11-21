import { Calendar, Phone, ShieldCheck, Sparkles, Star, Stethoscope } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { heroImage } from '@/data/images';

const stats = [
  { value: '12k+', label: 'Happy patients' },
  { value: '4.9', label: 'Avg. rating' },
  { value: '18', label: 'Years in Austin' },
];

export function Hero() {
  const { openModal } = useBooking();

  return (
    <section id="top" className="relative overflow-hidden bg-white pt-28 lg:pt-32">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute -right-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-teal-100/60 blur-3xl" />
        <div className="absolute -left-40 top-40 h-[30rem] w-[30rem] rounded-full bg-navy-50 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28">
        {/* Copy */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700">
            <Sparkles className="h-3.5 w-3.5" />
            Austin's premier dental studio
          </span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-navy-900 text-balance sm:text-6xl lg:text-7xl">
            A brighter smile,
            <span className="block text-teal-600">crafted with care.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-600">
            From luminous whitening to precision implants and discreet Invisalign — gentle,
            modern dentistry in the heart of Austin. Comfort first, results that last a
            lifetime.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={() => openModal()}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy-800 px-7 py-3.5 text-base font-semibold text-white shadow-card transition-all duration-300 hover:bg-navy-900 hover:-translate-y-0.5"
            >
              <Calendar className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" />
              Book Appointment
            </button>
            <a
              href="tel:+15125550199"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-200 bg-white px-7 py-3.5 text-base font-semibold text-navy-800 transition-all duration-300 hover:border-navy-300 hover:bg-navy-50"
            >
              <Phone className="h-5 w-5 text-teal-600" />
              (512) 555-0199
            </a>
          </div>

          <div className="mt-7 flex items-center gap-3 text-sm text-navy-600">
            <ShieldCheck className="h-5 w-5 text-teal-600" />
            <span>In-network with most major PPO insurance plans</span>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-navy-100 pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-semibold text-navy-900">{s.value}</dt>
                <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-navy-500">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual — real smile portrait with glassmorphism floating cards */}
        <div className="relative animate-fade-in [animation-delay:200ms]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-card">
            {/* Real photograph */}
            <img
              src={heroImage}
              alt="Happy patient with a bright, healthy smile"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Warm tone + scrim for glass-card legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-navy-900/5 to-white/20" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-900/40 to-transparent" />
            <div className="absolute inset-0 bg-dots opacity-15" />

            {/* Glassmorphism floating card — top */}
            <div className="absolute left-4 top-4 flex items-center gap-3 rounded-2xl border border-white/30 bg-white/70 px-4 py-3 shadow-card backdrop-blur-md animate-float">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gold-400/90 text-navy-900">
                <Star className="h-5 w-5 fill-navy-900" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-navy-900">4.9 ★ Google Rating</p>
                <p className="text-xs font-medium text-navy-600">420+ verified reviews</p>
              </div>
            </div>

            {/* Glassmorphism floating card — bottom */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-white/30 bg-white/70 px-4 py-3.5 shadow-card backdrop-blur-md animate-float [animation-delay:1.5s]">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal-500/90 text-white">
                <Stethoscope className="h-5 w-5" />
              </div>
              <div className="flex-1 leading-tight">
                <p className="text-sm font-bold text-navy-900">Same-Day Emergency Care</p>
                <p className="text-xs font-medium text-navy-600">Pain relief within hours — walk-ins welcome</p>
              </div>
              <button
                onClick={() => openModal('Emergency Care')}
                className="shrink-0 rounded-lg bg-navy-800 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-navy-900"
              >
                Get help
              </button>
            </div>
          </div>

          {/* Glow */}
          <div className="absolute -bottom-6 left-1/2 -z-10 h-24 w-3/4 -translate-x-1/2 rounded-full bg-teal-300/40 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
