import { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { SEWING_PROCESS } from '../../data/content';
import SectionHeader from '../ui/SectionHeader';
import { FadeIn } from '../ui/Motion';
import { useReducedMotion } from '../../hooks/useScrollPosition';

export default function SewingProcess() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % SEWING_PROCESS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <section id="sewing-process" className="py-16 md:py-24 lg:py-[120px] px-5 md:px-10 lg:px-[60px] bg-cream" aria-labelledby="sewing-title">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          eyebrow="Behind the Scenes"
          title="The Sewing"
          titleEm="Process"
          subtitle="From raw fabric to finished masterpiece — every step is executed with precision and passion."
        />

        <FadeIn>
          <div className="mt-14 flex flex-wrap justify-center gap-4 md:gap-6">
            {SEWING_PROCESS.map((step, i) => {
              const Icon = LucideIcons[step.icon] || LucideIcons.Circle;
              const isActive = i === active;
              return (
                <div
                  key={step.label}
                  className={`flex flex-col items-center gap-3 transition-all duration-500 ${
                    isActive ? 'scale-110' : 'opacity-50'
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isActive ? 'gradient-gold shadow-gold' : 'bg-white border border-beige-dark'
                    }`}
                  >
                    <Icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-maroon'}`} />
                  </div>
                  <span className={`text-xs tracking-widest uppercase font-medium ${isActive ? 'text-maroon' : 'text-text-light'}`}>
                    {step.label}
                  </span>
                  {i < SEWING_PROCESS.length - 1 && (
                    <span className="hidden md:block absolute" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
