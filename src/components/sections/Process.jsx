import { useEffect, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { PROCESS_STEPS } from '../../data/content';
import SectionHeader from '../ui/SectionHeader';
import { FadeIn } from '../ui/Motion';

export default function Process() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setProgress(100);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="py-16 md:py-24 lg:py-[120px] px-5 md:px-10 lg:px-[60px] bg-cream" aria-labelledby="process-title">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          eyebrow="Our Journey Together"
          title="How We"
          titleEm="Work"
          subtitle="A seamless experience from your first visit to your final fitting — designed around your comfort and vision."
        />

        <FadeIn>
          <div ref={ref} className="relative mt-16 overflow-x-auto pb-4">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-beige-dark">
              <div
                className="h-full bg-gradient-to-r from-gold to-rose-gold transition-all duration-[2s] ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex md:grid md:grid-cols-8 gap-6 md:gap-4 min-w-max md:min-w-0">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = LucideIcons[step.icon] || LucideIcons.Circle;
                return (
                  <div key={step.title} className="flex flex-col items-center text-center w-36 md:w-auto shrink-0" role="listitem">
                    <div className="relative z-10 w-16 h-16 rounded-full gradient-gold flex items-center justify-center shadow-gold mb-4">
                      <Icon className="w-6 h-6 text-white" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-maroon text-cream text-[10px] flex items-center justify-center font-semibold">
                        {i + 1}
                      </span>
                    </div>
                    <h4 className="font-serif text-base text-text-dark mb-1">{step.title}</h4>
                    <p className="text-xs text-text-light leading-relaxed font-light">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
