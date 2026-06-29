import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { DRESS_TYPES } from '../../data/content';
import SectionHeader from '../ui/SectionHeader';
import { FadeIn } from '../ui/Motion';

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="booking" className="py-16 md:py-24 lg:py-[120px] px-5 md:px-10 lg:px-[60px] bg-cream" aria-labelledby="booking-title">
      <div className="max-w-[900px] mx-auto">
        <div className="bg-white rounded-[40px] border border-beige-dark shadow-luxury overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16">
            <SectionHeader
              eyebrow="Reserve Your Spot"
              title="Book an"
              titleEm="Appointment"
              subtitle="Ready to create something beautiful? Fill in your details and we'll confirm your slot within 2 hours."
            />

            {submitted ? (
              <FadeIn>
                <div className="text-center py-12">
                  <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif text-2xl text-maroon mb-3">Appointment Requested!</h3>
                  <p className="text-text-light font-light">
                    Thank you! We&apos;ll contact you within 2 hours to confirm your appointment.
                  </p>
                </div>
              </FadeIn>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5" noValidate>
                <div>
                  <label htmlFor="b-name" className="block text-xs tracking-widest uppercase text-text-light font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    id="b-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Priya Sharma"
                    className="w-full px-4 py-3.5 rounded-xl border border-beige-dark bg-cream/50 text-text-dark placeholder:text-text-light/50 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="b-phone" className="block text-xs tracking-widest uppercase text-text-light font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    id="b-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3.5 rounded-xl border border-beige-dark bg-cream/50 text-text-dark placeholder:text-text-light/50 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="b-dress" className="block text-xs tracking-widest uppercase text-text-light font-medium mb-2">
                    Dress Type
                  </label>
                  <select
                    id="b-dress"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3.5 rounded-xl border border-beige-dark bg-cream/50 text-text-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled>Select dress type</option>
                    {DRESS_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="b-date" className="block text-xs tracking-widest uppercase text-text-light font-medium mb-2">
                    Preferred Date
                  </label>
                  <input
                    id="b-date"
                    type="date"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-beige-dark bg-cream/50 text-text-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all cursor-pointer"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="b-msg" className="block text-xs tracking-widest uppercase text-text-light font-medium mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    id="b-msg"
                    rows={4}
                    placeholder="Tell us about your design preferences, occasion, or any special requirements…"
                    className="w-full px-4 py-3.5 rounded-xl border border-beige-dark bg-cream/50 text-text-dark placeholder:text-text-light/50 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all resize-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full gradient-gold text-white py-4 rounded-full text-sm tracking-[0.14em] uppercase font-semibold shadow-gold cursor-pointer disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? 'Sending…' : '✦ Confirm Appointment'}
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
