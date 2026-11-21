import { useState } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useReveal } from '@/hooks/useReveal';
import { supabase } from '@/lib/supabase';

const days = [
  { day: 'Monday', hours: '8:00 AM – 6:00 PM' },
  { day: 'Tuesday', hours: '8:00 AM – 6:00 PM' },
  { day: 'Wednesday', hours: '8:00 AM – 6:00 PM' },
  { day: 'Thursday', hours: '8:00 AM – 7:00 PM' },
  { day: 'Friday', hours: '8:00 AM – 4:00 PM' },
  { day: 'Saturday', hours: '9:00 AM – 2:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

const services = ['Teeth Whitening', 'Implants', 'Invisalign', 'Emergency Care', 'Cleaning', 'Other'];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function HoursContact() {
  const { openModal } = useBooking();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: services[0],
    date: '',
    message: '',
  });

  const today = new Date().getDay(); // 0 Sun – 6 Sat
  const todayIndex = today === 0 ? 6 : today - 1;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const { error } = await supabase.from('appointments').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: form.service,
      preferred_date: form.date || null,
      message: form.message || null,
    });
    if (error) {
      setStatus('error');
      return;
    }
    setStatus('success');
  };

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> |
      React.ChangeEvent<HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <section id="hours" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Hours + info */}
          <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">
              Visit us
            </span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-navy-900 sm:text-5xl text-balance">
              Hours &amp; location
            </h2>
            <p className="mt-4 max-w-md text-navy-600">
              Conveniently located in central Austin with free patient parking. Walk-ins
              welcome for emergencies during all open hours.
            </p>

            <div className="mt-8 overflow-hidden rounded-3xl border border-navy-100 shadow-soft">
              <table className="w-full text-sm">
                <tbody>
                  {days.map((d, i) => {
                    const isToday = i === todayIndex;
                    const closed = d.hours === 'Closed';
                    return (
                      <tr
                        key={d.day}
                        className={`border-b border-navy-50 last:border-0 ${
                          isToday ? 'bg-teal-50/70' : 'bg-white'
                        }`}
                      >
                        <td className="px-5 py-3.5 font-medium text-navy-800">
                          {d.day}
                          {isToday && (
                            <span className="ml-2 rounded-full bg-teal-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                              Today
                            </span>
                          )}
                        </td>
                        <td
                          className={`px-5 py-3.5 text-right font-medium ${
                            closed ? 'text-navy-400' : 'text-navy-700'
                          }`}
                        >
                          {d.hours}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                  Address
                </p>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-navy-800">
                  412 Congress Ave, Suite 200<br />
                  Austin, TX 78701
                </p>
              </div>
              <div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                  Phone &amp; email
                </p>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-navy-800">
                  (512) 555-0199<br />
                  hello@apexdentalstudio.com
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className={`reveal ${visible ? 'is-visible' : ''} relative`}>
            <div className="relative overflow-hidden rounded-3xl border border-navy-100 bg-gradient-to-br from-white to-navy-50/40 p-7 shadow-card sm:p-9">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-100/70 blur-3xl" />

              {status === 'success' ? (
                <div className="relative flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-teal-100 text-teal-600">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-navy-900">
                    Request received!
                  </h3>
                  <p className="mt-2 max-w-sm text-navy-600">
                    Thanks, {form.name || 'friend'}. Our front desk will reach out within one
                    business hour to confirm your appointment.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        service: services[0],
                        date: '',
                        message: '',
                      });
                    }}
                    className="mt-6 rounded-full border border-navy-200 px-5 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-50"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-navy-900">
                        Request an appointment
                      </h3>
                      <p className="mt-1.5 text-sm text-navy-600">
                        Fill this out and we'll confirm by phone within one business hour.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openModal(form.service)}
                      className="hidden shrink-0 rounded-full border border-teal-300 bg-teal-50 px-3.5 py-2 text-xs font-semibold text-teal-700 transition-colors hover:bg-teal-100 sm:inline-flex"
                    >
                      Use step-by-step wizard
                    </button>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" htmlFor="name">
                      <input
                        id="name"
                        required
                        value={form.name}
                        onChange={update('name')}
                        placeholder="Jane Doe"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Phone" htmlFor="phone">
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={update('phone')}
                        placeholder="(512) 555-0123"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Email" htmlFor="email" className="sm:col-span-2">
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={update('email')}
                        placeholder="jane@email.com"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Service" htmlFor="service">
                      <select
                        id="service"
                        value={form.service}
                        onChange={update('service')}
                        className={inputCls}
                      >
                        {services.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Preferred date" htmlFor="date">
                      <input
                        id="date"
                        type="date"
                        value={form.date}
                        onChange={update('date')}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Anything we should know?" htmlFor="message" className="sm:col-span-2">
                      <textarea
                        id="message"
                        rows={3}
                        value={form.message}
                        onChange={update('message')}
                        placeholder="Symptoms, preferences, insurance, etc."
                        className={`${inputCls} resize-none`}
                      />
                    </Field>
                  </div>

                  {status === 'error' && (
                    <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                      Something went wrong submitting your request. Please try again or call (512) 555-0199.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3.5 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:bg-teal-600 disabled:opacity-70"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        Request appointment
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-xs text-navy-400">
                    We respect your privacy. Your details are only used to schedule your visit.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  'w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 transition-all duration-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20';

function Field({
  label,
  htmlFor,
  children,
  className = '',
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-600"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
