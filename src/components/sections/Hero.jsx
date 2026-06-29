import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Scissors, Crown, Sparkles, Ruler } from 'lucide-react';
import { HERO_CARDS } from '../../data/content';
import { IMAGES } from '../../data/images';
import Button from '../ui/Button';
import { useReducedMotion } from '../../hooks/useScrollPosition';

const iconMap = { Scissors, Crown, Sparkles, Ruler };

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${10 + (i * 7) % 80}%`,
  top: `${20 + (i * 11) % 60}%`,
  delay: i * 0.4,
  duration: 6 + (i % 4),
}));

export default function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 80]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-maroon-dark/92 via-maroon/78 to-maroon-dark/85"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0 opacity-35 bg-cover bg-center"
          style={{ backgroundImage: `url("${IMAGES.about.main}")` }}
          role="img"
          aria-label="Luxury tailoring studio with fabrics and sewing equipment"
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, #C9A84C 49px, #C9A84C 50px),
              repeating-linear-gradient(90deg, transparent, transparent 49px, #C9A84C 49px, #C9A84C 50px)`,
          }}
          aria-hidden="true"
        />
      </motion.div>

      {!reduced &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute w-0.5 h-0.5 bg-gold rounded-full pointer-events-none"
            style={{ left: p.left, top: p.top }}
            animate={{ y: [-20, -140], opacity: [0, 0.8, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
            aria-hidden="true"
          />
        ))}

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-[60px] pt-28 pb-20 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.22em] uppercase text-gold-light font-medium mb-6">
            <span className="w-7 h-px bg-gradient-to-r from-transparent to-gold-light" aria-hidden="true" />
            Premium Tailoring Boutique
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,5.5vw,5.125rem)] font-light text-cream leading-[1.08] tracking-tight mb-7">
            Tailored Elegance,
            <em className="block italic text-gold-light font-light">Crafted Just for You</em>
          </h1>
          <p className="text-[clamp(0.875rem,1.4vw,1.0625rem)] text-cream/72 leading-relaxed font-light max-w-md mb-11">
            From designer blouses to bridal wear, traditional outfits, western dresses, and premium
            embroidery — every stitch reflects craftsmanship, perfection, and elegance.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="#booking" icon>
              Book Now
            </Button>
            <Button href="#collections" variant="secondary">
              Explore Collection
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center items-center relative"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="grid grid-cols-2 gap-4 w-full max-w-[380px]">
            {HERO_CARDS.map((card, i) => {
              const Icon = iconMap[card.icon];
              return (
                <motion.div
                  key={card.title}
                  className="glass-dark rounded-3xl p-5 relative overflow-hidden cursor-default"
                  animate={reduced ? {} : { y: [0, -8] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-light to-transparent" />
                  <div className="w-10 h-10 gradient-gold rounded-lg flex items-center justify-center mb-3.5">
                    {Icon && <Icon className="w-5 h-5 text-white" />}
                  </div>
                  <h3 className="font-serif text-base font-medium text-cream mb-1.5 tracking-wide">{card.title}</h3>
                  <p className="text-xs text-beige/65 leading-relaxed font-light">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {!reduced && (
            <motion.div
              className="absolute -top-4 -right-4 text-gold/40"
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              aria-hidden="true"
            >
              <Scissors className="w-8 h-8" />
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/50 text-[10px] tracking-[0.2em] uppercase z-10 cursor-pointer"
        animate={reduced ? {} : { opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll to about section"
      >
        Scroll
        <ChevronDown className="w-4 h-4" />
      </motion.a>
    </section>
  );
}
