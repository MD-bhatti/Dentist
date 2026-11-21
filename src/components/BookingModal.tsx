import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock,
  HeartPulse,
  Loader2,
  Phone,
  Sparkles,
  Stethoscope,
  User,
  Waypoints,
  X,
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { doctors } from '@/data/doctors';
import { supabase } from '@/lib/supabase';

const services = [
  { id: 'Teeth Whitening', icon: Sparkles, blurb: 'Brighten up to 8 shades' },
  { id: 'Implants', icon: HeartPulse, blurb: 'Permanent tooth replacement' },
  { id: 'Invisalign', icon: Waypoints, blurb: 'Discreet clear aligners' },
  { id: 'Emergency Care', icon: Stethoscope, blurb: 'Same-day pain relief' },
  { id: 'Cleaning & Checkup', icon: CheckCircle2, blurb: 'Routine preventive care' },
  { id: 'Consultation', icon: User, blurb: 'Meet the team, ask anything' },
];

const timeSlots = ['8:00 AM', '9:30 AM', '11:00 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function BookingModal() {
  const { open, initialService, closeModal } = useBooking();
  const [step, setStep] = useState(0);
  const [service, setService] = useState('');
  const [doctorId, setDoctorId] = useState<string>('any');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  // Reset / pre-fill when opened
  useEffect(() => {
    if (open) {
      setStep(0);
      setStatus('idle');
      setService(initialService ?? '');
      setDoctorId('any');
      setDate('');
      setTime('');
      setForm({ name: '', email: '', phone: '', message: '' });
    }
  }, [open, initialService]);

  const selectedDoctor = useMemo(
    () => doctors.find((d) => d.id === doctorId) ?? null,
    [doctorId],
  );

  const todayStr = new Date().toISOString().split('T')[0];

  const canNext = step === 0 ? !!service : step === 1 ? true : step === 2 ? !!date && !!time : true;

  const submit = async () => {
    setStatus('submitting');
    const doctorName = selectedDoctor?.name ?? 'No preference';
    const { error } = await supabase.from('appointments').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      service,
      doctor: doctorName,
      preferred_date: date || null,
      preferred_time: time || null,
      message: form.message || null,
    });
    if (error) {
      setStatus('error');
      return;
    }
    setStatus('success');
  };

  if (!open) return null;

  const steps = ['Service', 'Doctor', 'Date & Time', 'Your Details'];

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm animate-fade-in"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative z-10 flex max-h-[94vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl animate-fade-up sm:rounded-3xl">
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-navy-800 to-navy-700 px-6 py-5 text-white">
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-300">
                Book Appointment
              </p>
              <h2 className="mt-0.5 font-display text-xl font-semibold">
                {status === 'success' ? "You're booked!" : 'Reserve your visit'}
              </h2>
            </div>
            <button
              aria-label="Close"
              onClick={closeModal}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Stepper */}
          {status !== 'success' && (
            <div className="relative mt-4 flex items-center gap-1.5">
              {steps.map((label, i) => {
                const done = i < step;
                const active = i === step;
                return (
                  <div key={label} className="flex flex-1 items-center gap-1.5">
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold transition-colors ${
                        done
                          ? 'bg-teal-400 text-navy-900'
                          : active
                            ? 'bg-white text-navy-900'
                            : 'bg-white/15 text-white/60'
                      }`}
                    >
                      {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                    {i < steps.length - 1 && (
                      <span
                        className={`h-0.5 flex-1 rounded-full ${done ? 'bg-teal-400' : 'bg-white/15'}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {status === 'success' ? (
            <div className="flex flex-col items-center py-6 text-center animate-fade-in">
              <div className="relative grid h-20 w-20 place-items-center rounded-full bg-teal-100 text-teal-600">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-teal-300/50" />
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-navy-900">
                Appointment requested!
              </h3>
              <p className="mt-2 max-w-sm text-sm text-navy-600">
                Thanks {form.name.split(' ')[0] || 'there'} — we've received your request for{' '}
                <span className="font-semibold text-navy-800">{service}</span>
                {date && (
                  <>
                    {' '}on{' '}
                    <span className="font-semibold text-navy-800">
                      {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </>
                )}
                {time && <> at <span className="font-semibold text-navy-800">{time}</span></>}. Our
                front desk will call to confirm within one business hour.
              </p>

              <div className="mt-6 w-full rounded-2xl border border-navy-100 bg-navy-50/50 p-4 text-left">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-navy-500">Confirmation</span>
                  <span className="font-mono font-semibold text-navy-900">
                    #APX-{Math.random().toString(36).slice(2, 7).toUpperCase()}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-navy-500">Doctor</span>
                  <span className="font-medium text-navy-800">
                    {selectedDoctor?.name ?? 'First available'}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex w-full gap-3">
                <a
                  href="tel:+15125550199"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-navy-200 px-5 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-50"
                >
                  <Phone className="h-4 w-4 text-teal-600" />
                  Call now
                </a>
                <button
                  onClick={closeModal}
                  className="flex-1 rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Step 0 — Service */}
              {step === 0 && (
                <div className="animate-fade-in">
                  <StepTitle icon={Sparkles} title="Which service do you need?" />
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {services.map((s) => {
                      const Icon = s.icon;
                      const selected = service === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setService(s.id)}
                          className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 ${
                            selected
                              ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20'
                              : 'border-navy-100 bg-white hover:border-navy-200 hover:bg-navy-50/50'
                          }`}
                        >
                          <span
                            className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                              selected ? 'bg-teal-500 text-white' : 'bg-navy-50 text-navy-700'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-navy-900">{s.id}</span>
                            <span className="block truncate text-xs text-navy-500">{s.blurb}</span>
                          </span>
                          {selected && (
                            <Check className="ml-auto h-4 w-4 shrink-0 text-teal-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 1 — Doctor */}
              {step === 1 && (
                <div className="animate-fade-in">
                  <StepTitle icon={User} title="Pick your preferred doctor" />
                  <div className="mt-4 space-y-2.5">
                    <button
                      onClick={() => setDoctorId('any')}
                      className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 ${
                        doctorId === 'any'
                          ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20'
                          : 'border-navy-100 hover:border-navy-200 hover:bg-navy-50/50'
                      }`}
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy-100 text-navy-700">
                        <User className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-navy-900">No preference</span>
                        <span className="block text-xs text-navy-500">First available specialist</span>
                      </span>
                      {doctorId === 'any' && <Check className="ml-auto h-4 w-4 text-teal-600" />}
                    </button>

                    {doctors.map((d) => {
                      const selected = doctorId === d.id;
                      return (
                        <button
                          key={d.id}
                          onClick={() => setDoctorId(d.id)}
                          className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 ${
                            selected
                              ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20'
                              : 'border-navy-100 hover:border-navy-200 hover:bg-navy-50/50'
                          }`}
                        >
                          <span
                            className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${d.tint} text-sm font-bold text-white`}
                          >
                            {d.initials}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-navy-900">
                              {d.name}{' '}
                              <span className="text-xs font-medium text-teal-600">{d.credentials}</span>
                            </span>
                            <span className="block truncate text-xs text-navy-500">{d.specialty}</span>
                          </span>
                          {selected && <Check className="ml-auto h-4 w-4 text-teal-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2 — Date & time */}
              {step === 2 && (
                <div className="animate-fade-in">
                  <StepTitle icon={CalendarCheck} title="Choose a date & time" />
                  <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-navy-600">
                    Preferred date
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />

                  <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-navy-600">
                    Available time slots
                  </label>
                  <div className="mt-1.5 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {timeSlots.map((t) => {
                      const selected = time === t;
                      return (
                        <button
                          key={t}
                          onClick={() => setTime(t)}
                          className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-medium transition-all duration-200 ${
                            selected
                              ? 'border-teal-500 bg-teal-500 text-white'
                              : 'border-navy-100 text-navy-700 hover:border-navy-200 hover:bg-navy-50/50'
                          }`}
                        >
                          <Clock className="h-3.5 w-3.5" />
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3 — Details */}
              {step === 3 && (
                <div className="animate-fade-in">
                  <StepTitle icon={Phone} title="Your contact details" />
                  <div className="mt-4 grid gap-3.5">
                    <input
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className={inputCls}
                    />
                    <div className="grid gap-3.5 sm:grid-cols-2">
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        className={inputCls}
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className={inputCls}
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Anything we should know? (optional)"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className={`${inputCls} resize-none`}
                    />

                    {/* Summary */}
                    <div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-4 text-sm">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-navy-500">
                        Summary
                      </p>
                      <SummaryRow label="Service" value={service} />
                      <SummaryRow label="Doctor" value={selectedDoctor?.name ?? 'First available'} />
                      <SummaryRow
                        label="When"
                        value={
                          date && time
                            ? `${new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${time}`
                            : date
                              ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                              : 'Not selected'
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  Something went wrong submitting your request. Please try again or call us at (512)
                  555-0199.
                </p>
              )}
            </>
          )}
        </div>

        {/* Footer nav */}
        {status !== 'success' && (
          <div className="shrink-0 border-t border-navy-100 px-6 py-4">
            <div className="flex items-center gap-3">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 px-4 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  disabled={!canNext}
                  onClick={() => setStep((s) => s + 1)}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-navy-800 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-navy-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  disabled={
                    status === 'submitting' || !form.name || !form.phone || !form.email
                  }
                  onClick={submit}
                  className="ml-auto inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:bg-teal-600 disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Confirming…
                    </>
                  ) : (
                    <>
                      <CalendarCheck className="h-4 w-4" />
                      Confirm appointment
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inputCls =
  'w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-navy-300 transition-all duration-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20';

function StepTitle({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-50 text-teal-600">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <h3 className="font-display text-lg font-semibold text-navy-900">{title}</h3>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-0.5">
      <span className="text-navy-500">{label}</span>
      <span className="font-medium text-navy-900">{value}</span>
    </div>
  );
}
