import { TESTIMONIALS } from '../../data/content';
import SectionHeader from '../ui/SectionHeader';
import { FadeIn } from '../ui/Motion';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="py-16 md:py-24 lg:py-[120px] px-5 md:px-10 lg:px-[60px] bg-maroon-dark overflow-hidden" aria-labelledby="testimonials-title">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          eyebrow="Voices of Delight"
          title="What Our"
          titleEm="Customers Say"
          subtitle="Real stories from real women who trusted us with their most precious moments."
        />

        <FadeIn>
          <div className="mt-14 relative">
            <div className="flex gap-5 animate-[testimonialScroll_40s_linear_infinite] w-max hover:[animation-play-state:paused]">
              {doubled.map((t, i) => (
                <article
                  key={`${t.name}-${i}`}
                  className="w-[340px] sm:w-[380px] shrink-0 glass-dark rounded-3xl p-7 border border-gold/15"
                  aria-label={`Testimonial from ${t.name}`}
                >
                  <div className="flex gap-0.5 mb-4" aria-label="5 star rating">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-cream/80 text-sm leading-relaxed font-light italic mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full gradient-gold flex items-center justify-center text-white font-serif text-lg font-semibold" aria-hidden="true">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-cream font-medium text-sm">{t.name}</p>
                      <p className="text-cream/50 text-xs">{t.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
      <style>{`
        @keyframes testimonialScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
