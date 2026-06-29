import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../../data/content';
import SectionHeader from '../ui/SectionHeader';
import { FadeIn } from '../ui/Motion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 lg:py-[120px] px-5 md:px-10 lg:px-[60px] bg-white" aria-labelledby="faq-title">
      <div className="max-w-[800px] mx-auto">
        <SectionHeader
          eyebrow="Common Questions"
          title="Frequently Asked"
          titleEm="Questions"
          subtitle="Everything you need to know before your first visit or order."
        />

        <div className="mt-12 space-y-3" role="list">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <FadeIn key={faq.q} delay={i * 0.05}>
                <div className="border border-beige-dark rounded-2xl overflow-hidden hover:border-gold/50 transition-colors">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="font-serif text-lg text-text-dark font-medium">{faq.q}</span>
                    <span className="w-8 h-8 rounded-full border border-beige-dark flex items-center justify-center shrink-0 text-maroon">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-text-light leading-relaxed font-light">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
