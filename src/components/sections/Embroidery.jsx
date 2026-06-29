import * as LucideIcons from 'lucide-react';
import { EMBROIDERIES } from '../../data/content';
import SectionHeader from '../ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '../ui/Motion';

export default function Embroidery() {
  return (
    <section id="embroidery" className="py-16 md:py-24 lg:py-[120px] px-5 md:px-10 lg:px-[60px] bg-maroon-dark relative overflow-hidden" aria-labelledby="embroidery-title">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(201,168,76,0.08),transparent_50%)]" aria-hidden="true" />
      <div className="max-w-[1400px] mx-auto relative">
        <SectionHeader
          eyebrow="Artisan Craft"
          title="Embroidery"
          titleEm="Excellence"
          subtitle="Each thread is placed with intention. Explore our range of traditional and contemporary embroidery techniques mastered over decades."
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-14">
          {EMBROIDERIES.map((item) => {
            const Icon = LucideIcons[item.icon] || LucideIcons.Sparkles;
            return (
              <StaggerItem key={item.name}>
                <article className="group glass-dark rounded-2xl p-6 h-full hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center mb-4 group-hover:bg-gold/25 transition-colors">
                    <Icon className="w-5 h-5 text-gold-light" />
                  </div>
                  <h3 className="font-serif text-lg text-cream mb-2">{item.name}</h3>
                  <p className="text-sm text-cream/55 leading-relaxed font-light">{item.desc}</p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
