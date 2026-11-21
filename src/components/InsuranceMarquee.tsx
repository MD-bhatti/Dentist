import { Cpu, Scan, Waves, Zap } from 'lucide-react';

const insurance = ['Delta Dental', 'Cigna', 'Aetna', 'MetLife', 'BlueCross BlueShield', 'United Healthcare', 'Guardian', 'Humana'];

const tech = [
  { icon: Scan, label: '3D iTero Scanner' },
  { icon: Zap, label: 'Pain-Free Laser' },
  { icon: Waves, label: 'Soft-Tissue Laser' },
  { icon: Cpu, label: 'AI Diagnostics' },
];

// Duplicate arrays for seamless infinite scroll
const marquee = [...insurance, ...insurance];

export function InsuranceMarquee() {
  return (
    <section className="border-y border-navy-100 bg-white py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-navy-500">
          Trusted partners &amp; cutting-edge technology
        </p>

        {/* Insurance marquee */}
        <div className="relative mt-7 overflow-hidden">
          {/* fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
          <div className="flex w-max animate-marquee gap-10">
            {marquee.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="flex items-center whitespace-nowrap font-display text-xl font-semibold text-navy-400 transition-colors hover:text-navy-700"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Tech badges */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {tech.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.label}
                className="flex items-center gap-2.5 rounded-full border border-teal-200 bg-teal-50/60 px-4 py-2"
              >
                <Icon className="h-5 w-5 text-teal-600" strokeWidth={2} />
                <span className="text-sm font-semibold text-navy-800">{t.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
