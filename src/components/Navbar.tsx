import { useEffect, useState } from 'react';
import { Calendar, Menu, Smile, X } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Smile Gallery', href: '#gallery' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const { openModal } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-soft border-b border-navy-100/60'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-800 text-teal-300 shadow-soft transition-transform duration-300 group-hover:scale-105">
            <Smile className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight text-navy-900">
              Apex Dental
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal-600">
              Studio · Austin
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm font-medium text-navy-700 transition-colors hover:text-navy-900 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+15125550199"
            className="text-sm font-medium text-navy-700 transition-colors hover:text-navy-900"
          >
            (512) 555-0199
          </a>
          <button
            onClick={() => openModal()}
            className="group inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:bg-teal-600 hover:shadow-card"
          >
            <Calendar className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
            Book Appointment
          </button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-navy-100 bg-white/70 text-navy-800 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-400 lg:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-4 mb-4 rounded-2xl border border-navy-100 bg-white p-4 shadow-card">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-navy-700 hover:bg-teal-50 hover:text-navy-900"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setOpen(false);
              openModal();
            }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-white"
          >
            <Calendar className="h-4 w-4" />
            Book Appointment
          </button>
        </div>
      </div>
    </header>
  );
}
