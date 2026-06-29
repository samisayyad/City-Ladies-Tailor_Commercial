import { motion } from 'framer-motion';
import { Scissors, Award } from 'lucide-react';
import { STATS, ABOUT_FEATURES } from '../../data/content';
import { IMAGES } from '../../data/images';
import SectionHeader from '../ui/SectionHeader';
import AnimatedCounter from '../ui/AnimatedCounter';
import SmartImage from '../ui/SmartImage';
import { FadeIn } from '../ui/Motion';

const TIMELINE = [
  { year: '2009', event: 'Founded in Ghataprabha with a passion for precision tailoring' },
  { year: '2014', event: 'Expanded embroidery studio with Aari & Maggam specialists' },
  { year: '2019', event: 'Crossed 3,000 custom dresses — trusted by brides across Belagavi' },
  { year: 'Today', event: 'A premium boutique serving 5,000+ happy customers' },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-16 md:py-24 lg:py-[120px] px-5 md:px-10 lg:px-[60px] overflow-hidden"
      aria-labelledby="about-title"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-white to-cream" aria-hidden="true" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #6B1A2B, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual column */}
          <FadeIn className="relative">
            <div className="relative">
              {/* Main image frame */}
              <div className="relative rounded-[40px] overflow-hidden shadow-luxury border border-gold/15 aspect-[4/5]">
                <SmartImage
                  src={IMAGES.about.main}
                  alt="Master tailor at City Ladies Tailor boutique"
                  title="City Ladies Tailor"
                  subtitle="Est. 2009"
                  paletteIndex={0}
                  className="absolute inset-0"
                  imgClassName="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[1.2s]"
                />
                {/* Cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/80 via-maroon-dark/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-maroon-dark/30 to-transparent pointer-events-none" />

                {/* Floating quote card */}
                <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-2xl p-5 border border-gold/20 backdrop-blur-xl">
                  <p className="font-serif text-[15px] italic text-gold-light leading-relaxed">
                    &ldquo;Every garment tells a story — we make sure yours is beautifully written.&rdquo;
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-cream/50 mt-3">— City Ladies Tailor</p>
                </div>
              </div>

              {/* Secondary inset image */}
              <motion.div
                className="absolute -bottom-8 -right-4 md:-right-8 w-36 md:w-44 aspect-square rounded-3xl overflow-hidden border-4 border-cream shadow-luxury hidden sm:block"
                initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                <SmartImage
                  src={IMAGES.about.detail}
                  alt="Premium fabric and embroidery detail"
                  title="Fine Detail"
                  paletteIndex={1}
                  className="absolute inset-0"
                  imgClassName="w-full h-full object-cover"
                />
              </motion.div>

              {/* Est. badge */}
              <motion.div
                className="absolute -top-5 -left-5 w-24 h-24 gradient-gold rounded-full flex flex-col items-center justify-center shadow-gold z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              >
                <Scissors className="w-5 h-5 text-white mb-1" />
                <span className="text-[8px] tracking-[0.18em] uppercase text-white font-semibold text-center leading-snug">
                  Est.<br />2009
                </span>
              </motion.div>

              {/* Award badge */}
              <div className="absolute top-8 -right-3 md:-right-6 glass rounded-2xl px-4 py-3 shadow-gold border border-gold/20 flex items-center gap-2.5 z-10">
                <Award className="w-5 h-5 text-gold shrink-0" />
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-text-light font-medium">Trusted</p>
                  <p className="font-serif text-sm text-maroon font-medium leading-tight">15+ Years</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Content column */}
          <div>
            <SectionHeader
              eyebrow="Our Story"
              title="A Legacy of"
              titleEm="Craftsmanship"
              subtitle="City Ladies Tailor is a trusted tailoring boutique in Ghataprabha, known for precision stitching, premium finishing, creative embroidery, and personalized fitting — serving women who deserve nothing less than perfection."
              centered={false}
            />

            {/* Timeline */}
            <FadeIn delay={0.2}>
              <div className="relative mt-8 mb-8 pl-6 border-l border-gold/30 space-y-5">
                {TIMELINE.map((item) => (
                  <div key={item.year} className="relative">
                    <span
                      className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full gradient-gold ring-4 ring-cream"
                      aria-hidden="true"
                    />
                    <p className="text-[11px] tracking-[0.2em] uppercase text-gold font-semibold mb-0.5">{item.year}</p>
                    <p className="text-sm text-text-mid font-light leading-relaxed">{item.event}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <ul className="flex flex-col gap-3 mb-10 list-none">
                {ABOUT_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-text-mid">
                    <span className="w-5 h-5 rounded-full bg-maroon/5 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full gradient-gold" aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <FadeIn key={stat.label} delay={0.1 * i}>
                  <div className="group bg-white border border-beige-dark rounded-2xl p-5 hover:border-gold hover:shadow-gold transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="font-serif text-[clamp(2rem,4vw,3rem)] font-semibold text-maroon leading-none mb-1.5">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs text-text-light tracking-[0.1em] uppercase font-medium">{stat.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
