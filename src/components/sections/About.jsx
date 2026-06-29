import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Scissors, Award } from 'lucide-react';
import { STATS, ABOUT_FEATURES } from '../../data/content';
import { IMAGES } from '../../data/images';
import SectionHeader from '../ui/SectionHeader';
import AnimatedCounter from '../ui/AnimatedCounter';
import SmartImage from '../ui/SmartImage';
import { FadeIn } from '../ui/Motion';
import { useReducedMotion } from '../../hooks/useScrollPosition';

const TIMELINE = [
  { year: '2009', event: 'Founded in Ghataprabha with a passion for precision tailoring' },
  { year: '2014', event: 'Expanded embroidery studio with Aari & Maggam specialists' },
  { year: '2019', event: 'Crossed 3,000 custom dresses — trusted by brides across Belagavi' },
  { year: 'Today', event: 'A premium boutique serving 5,000+ happy customers' },
];

function FounderPortrait() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-24, 24]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1.08, 1.04, 1.1]);
  const frameRotate = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-1.5, 1.5]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.7, 0.5]);

  return (
    <FadeIn className="relative">
      <div ref={ref} className="relative">
        {/* Ambient glow behind frame */}
        <motion.div
          className="absolute -inset-6 rounded-[48px] blur-3xl pointer-events-none"
          style={{
            opacity: glowOpacity,
            background: 'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.35), rgba(107,26,43,0.2) 50%, transparent 75%)',
          }}
          aria-hidden="true"
        />

        {/* Main portrait frame */}
        <motion.div
          className="relative rounded-[40px] overflow-hidden shadow-luxury border border-gold/20 aspect-[4/5]"
          style={{ rotate: frameRotate }}
          whileHover={reduced ? {} : { scale: 1.01 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
            <SmartImage
              src={IMAGES.about.founder}
              alt="Founder of City Ladies Tailor — master tailor and craftsman"
              title="City Ladies Tailor"
              subtitle="Founder"
              paletteIndex={0}
              className="absolute inset-0"
              imgClassName="w-full h-full object-cover object-[center_20%]"
            />
          </motion.div>

          {/* Premium color grade */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30"
            style={{ background: 'linear-gradient(160deg, #4A0F1C 0%, transparent 45%, #6B1A2B 100%)' }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/90 via-maroon-dark/25 to-maroon/10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-maroon-dark/40 via-transparent to-gold/10 pointer-events-none" />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 80px rgba(26,10,15,0.55)' }}
            aria-hidden="true"
          />

          {/* Shimmer sweep */}
          {!reduced && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-[2]"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(228,201,126,0.12) 50%, transparent 60%)',
              }}
              animate={{ x: ['-120%', '220%'] }}
              transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
              aria-hidden="true"
            />
          )}

          {/* Gold corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/40 rounded-tl-[40px] pointer-events-none z-[3]" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/40 rounded-br-[40px] pointer-events-none z-[3]" aria-hidden="true" />

          {/* Floating quote card */}
          <motion.div
            className="absolute bottom-6 left-6 right-6 glass-dark rounded-2xl p-5 border border-gold/25 backdrop-blur-xl z-[4]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={reduced ? undefined : { y: [0, -4, 0] }}
            transition={
              reduced
                ? { delay: 0.5, duration: 0.7 }
                : { y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }, delay: 0.5, duration: 0.7 }
            }
          >
            <p className="font-serif text-[15px] italic text-gold-light leading-relaxed">
              &ldquo;Every garment tells a story — we make sure yours is beautifully written.&rdquo;
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-cream/50 mt-3">— Founder, City Ladies Tailor</p>
          </motion.div>
        </motion.div>

        {/* Owner highlight */}
        <motion.div
          className="mt-8 flex justify-center relative z-20"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <p className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
            <span className="text-[11px] tracking-[0.22em] uppercase text-gold font-semibold">
              Owner
            </span>
            <span className="text-gold/50 font-light" aria-hidden="true">
              =
            </span>
            <span className="relative font-serif text-[clamp(1rem,2.2vw,1.25rem)] font-medium text-maroon tracking-wide px-4 py-2 rounded-xl bg-gradient-to-r from-gold/20 via-gold-pale/40 to-gold/20 border border-gold/35 shadow-gold">
              <span
                className="absolute inset-x-3 bottom-1 h-2 bg-gold/25 rounded-sm -z-10"
                aria-hidden="true"
              />
              SHAKILAHMED SAYYAD
            </span>
          </p>
        </motion.div>

        {/* Secondary inset image */}
        <motion.div
          className="absolute -bottom-8 -right-4 md:-right-8 w-36 md:w-44 aspect-square rounded-3xl overflow-hidden border-4 border-cream shadow-luxury hidden sm:block z-10"
          initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
          viewport={{ once: true }}
          animate={reduced ? undefined : { y: [0, -6, 0], rotate: [3, 6, 3] }}
          transition={
            reduced
              ? { delay: 0.4, duration: 0.7 }
              : {
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                  delay: 0.4,
                  duration: 0.7,
                }
          }
        >
          <SmartImage
            src={IMAGES.about.detail}
            alt="Premium fabric and embroidery detail"
            title="Fine Detail"
            paletteIndex={1}
            className="absolute inset-0"
            imgClassName="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/50 to-transparent pointer-events-none" />
        </motion.div>

        {/* Est. badge */}
        <motion.div
          className="absolute -top-5 -left-5 w-24 h-24 gradient-gold rounded-full flex flex-col items-center justify-center shadow-gold z-10"
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          <Scissors className="w-5 h-5 text-white mb-1" />
          <span className="text-[8px] tracking-[0.18em] uppercase text-white font-semibold text-center leading-snug">
            Est.<br />2009
          </span>
        </motion.div>

        {/* Award badge */}
        <motion.div
          className="absolute top-8 -right-3 md:-right-6 glass rounded-2xl px-4 py-3 shadow-gold border border-gold/20 flex items-center gap-2.5 z-10"
          animate={reduced ? {} : { y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Award className="w-5 h-5 text-gold shrink-0" />
          <div>
            <p className="text-[10px] tracking-widest uppercase text-text-light font-medium">Trusted</p>
            <p className="font-serif text-sm text-maroon font-medium leading-tight">15+ Years</p>
          </div>
        </motion.div>

        {/* Decorative floating thread lines */}
        {!reduced && (
          <>
            <motion.span
              className="absolute -left-3 top-1/3 w-px h-20 bg-gradient-to-b from-transparent via-gold/40 to-transparent"
              animate={{ opacity: [0.3, 0.8, 0.3], scaleY: [0.8, 1.1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
              aria-hidden="true"
            />
            <motion.span
              className="absolute -right-2 bottom-1/4 w-px h-16 bg-gradient-to-b from-transparent via-gold/30 to-transparent"
              animate={{ opacity: [0.2, 0.6, 0.2], scaleY: [1, 0.85, 1] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              aria-hidden="true"
            />
          </>
        )}
      </div>
    </FadeIn>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative py-16 md:py-24 lg:py-[120px] px-5 md:px-10 lg:px-[60px] overflow-hidden"
      aria-labelledby="about-title"
    >
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
          <FounderPortrait />

          <div>
            <SectionHeader
              eyebrow="Our Story"
              title="A Legacy of"
              titleEm="Craftsmanship"
              subtitle="City Ladies Tailor is a trusted tailoring boutique in Ghataprabha, known for precision stitching, premium finishing, creative embroidery, and personalized fitting — serving women who deserve nothing less than perfection."
              centered={false}
            />

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
