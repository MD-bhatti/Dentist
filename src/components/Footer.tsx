import { Clock, Facebook, Instagram, Mail, MapPin, Navigation, Phone, Smile, Twitter } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

const hours = [
  { day: 'Mon – Wed', hours: '8:00 AM – 6:00 PM' },
  { day: 'Thursday', hours: '8:00 AM – 7:00 PM' },
  { day: 'Friday', hours: '8:00 AM – 4:00 PM' },
  { day: 'Saturday', hours: '9:00 AM – 2:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

export function Footer() {
  const { openModal } = useBooking();

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-navy-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-teal-700/30 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-teal-600/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          {/* Brand + map card */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-teal-300 ring-1 ring-white/15">
                <Smile className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-semibold text-white">Apex Dental</span>
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal-300">
                  Studio · Austin
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-200">
              Gentle, modern dentistry in the heart of Austin. Brighter smiles, built to last —
              comfort first, always.
            </p>

            {/* Austin location card (embedded-style) */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-navy-800/60">
              <div className="relative h-32 overflow-hidden bg-navy-800">
                {/* Stylized map */}
                <svg viewBox="0 0 320 128" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id="mapgrid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M24 0H0V24" fill="none" stroke="rgba(94,197,184,0.15)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="320" height="128" fill="url(#mapgrid)" />
                  {/* roads */}
                  <path d="M0 70 L320 40" stroke="rgba(94,197,184,0.3)" strokeWidth="6" fill="none" />
                  <path d="M150 0 L180 128" stroke="rgba(94,197,184,0.25)" strokeWidth="5" fill="none" />
                  <path d="M0 110 L320 95" stroke="rgba(94,197,184,0.2)" strokeWidth="4" fill="none" />
                  {/* river */}
                  <path d="M0 88 Q80 78 140 90 T320 80" stroke="rgba(62,168,154,0.4)" strokeWidth="3" fill="none" />
                  {/* marker */}
                  <circle cx="160" cy="64" r="22" fill="rgba(94,197,184,0.18)" />
                  <circle cx="160" cy="64" r="12" fill="rgba(94,197,184,0.3)" />
                  <circle cx="160" cy="64" r="5" fill="#5ec5b8" />
                </svg>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-teal-400" />
                  <span className="font-medium text-white">412 Congress Ave, Austin TX</span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=412+Congress+Ave+Austin+TX"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-teal-300 transition-colors hover:text-teal-200"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Directions
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <FooterCol
            title="Services"
            links={[
              { label: 'Teeth Whitening', onClick: () => openModal('Teeth Whitening') },
              { label: 'Implants', onClick: () => openModal('Implants') },
              { label: 'Invisalign', onClick: () => openModal('Invisalign') },
              { label: 'Emergency Care', onClick: () => openModal('Emergency Care') },
              { label: 'Cleanings', onClick: () => openModal('Cleaning & Checkup') },
            ]}
          />

          {/* Clinic */}
          <FooterCol
            title="Clinic"
            links={[
              { label: 'About us', href: '#doctors' },
              { label: 'Our doctors', href: '#doctors' },
              { label: 'Smile gallery', href: '#gallery' },
              { label: 'Reviews', href: '#testimonials' },
              { label: 'FAQ', href: '#faq' },
            ]}
          />

          {/* Contact + hours */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-navy-200">
              <li>
                <a href="tel:+15125550199" className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 text-teal-400" />
                  (512) 555-0199
                </a>
              </li>
              <li>
                <a href="mailto:hello@apexdentalstudio.com" className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 text-teal-400" />
                  hello@apexdentalstudio.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-teal-400" />
                <span>412 Congress Ave, Suite 200<br />Austin, TX 78701</span>
              </li>
            </ul>

            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-navy-100 transition-all duration-300 hover:bg-teal-500 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="mt-6">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-300">
                <Clock className="h-3.5 w-3.5" />
                Opening hours
              </p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between text-navy-200">
                    <span>{h.day}</span>
                    <span className={h.hours === 'Closed' ? 'text-navy-400' : 'font-medium text-white'}>
                      {h.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-navy-300 sm:flex-row">
          <p>© {new Date().getFullYear()} Apex Dental Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
            <a href="#" className="transition-colors hover:text-white">HIPAA Notice</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

type Link = { label: string; href?: string; onClick?: () => void };

function FooterCol({ title, links }: { title: string; links: Link[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            {l.href ? (
              <a
                href={l.href}
                className="text-navy-200 transition-colors duration-200 hover:text-white"
              >
                {l.label}
              </a>
            ) : (
              <button
                onClick={l.onClick}
                className="text-left text-navy-200 transition-colors duration-200 hover:text-white"
              >
                {l.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
