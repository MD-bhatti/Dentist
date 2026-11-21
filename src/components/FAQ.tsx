import { useState } from 'react';
import { HelpCircle, Minus, Plus } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useReveal } from '@/hooks/useReveal';

const faqs = [
  {
    q: 'Do you accept my insurance?',
    a: "We're in-network with most major PPO plans including Delta Dental, Cigna, Aetna, MetLife, and BlueCross BlueShield. Even if we're not in-network, we file claims on your behalf and offer flexible payment plans. Call us with your plan details and we'll verify your benefits before your visit.",
  },
  {
    q: 'I have a dental emergency — how fast can you see me?',
    a: 'We reserve same-day slots every weekday for emergencies like severe pain, broken teeth, or lost crowns. Call (512) 555-0199 and we\'ll get you in as quickly as possible — often within a few hours.',
  },
  {
    q: 'Is teeth whitening safe for sensitive teeth?',
    a: "Yes. Our professional whitening uses desensitizing agents and is calibrated to your enamel. Most patients experience little to no sensitivity, and we'll review your history before treatment to make sure it's the right fit.",
  },
  {
    q: 'How long does Invisalign treatment take?',
    a: 'Most Invisalign cases at Apex finish in 9–15 months, though simpler corrections can take as few as 6 months. At your free consultation we\'ll take a 3D iTero scan and show you a digital preview of your finished smile and timeline before you commit.',
  },
  {
    q: 'Do you see children and families?',
    a: 'Absolutely. Dr. Lindqvist specializes in gentle family dentistry and loves seeing patients of all ages — from first checkups at age one through every stage of life. We make the chair a calm, friendly place for kids.',
  },
  {
    q: 'What payment options do you offer?',
    a: 'We accept all major credit cards, HSA/FSA dollars, and offer 0% interest financing through CareCredit for treatment plans over $300. We\'ll walk you through every option so cost never stands between you and a healthy smile.',
  },
];

export function FAQ() {
  const { openModal } = useBooking();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-navy-50/40 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} text-center`}
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">
            <HelpCircle className="h-3.5 w-3.5" />
            Questions &amp; answers
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-navy-900 sm:text-5xl text-balance">
            Everything you might be wondering
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Can't find your answer? Our front desk is a quick call away.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`reveal ${visible ? 'is-visible' : ''} overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                  isOpen ? 'border-teal-300 shadow-soft' : 'border-navy-100'
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-navy-900">{f.q}</span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                      isOpen ? 'bg-teal-500 text-white' : 'bg-navy-50 text-navy-700'
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-navy-600">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl bg-gradient-to-br from-navy-800 to-navy-700 px-7 py-7 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-display text-lg font-semibold text-white">Still have questions?</p>
            <p className="mt-1 text-sm text-navy-200">
              Book a free consultation and we'll answer everything in person.
            </p>
          </div>
          <button
            onClick={() => openModal('Consultation')}
            className="shrink-0 rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-teal-300"
          >
            Book a free consult
          </button>
        </div>
      </div>
    </section>
  );
}
