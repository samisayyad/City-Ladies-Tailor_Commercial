import * as LucideIcons from 'lucide-react';
import { WHY_REASONS } from '../../data/content';
import SectionHeader from '../ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '../ui/Motion';

export default function WhyChooseUs() {
  return (
    <section id="why" className="py-16 md:py-24 lg:py-[120px] px-5 md:px-10 lg:px-[60px] bg-white" aria-labelledby="why-title">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          eyebrow="The Difference"
          title="Why"
          titleEm="Choose Us"
          subtitle="We don't just stitch garments — we build relationships. Here's what sets City Ladies Tailor apart from the rest."
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {WHY_REASONS.map((reason) => {
            const Icon = LucideIcons[reason.icon] || LucideIcons.Star;
            return (
              <StaggerItem key={reason.title}>
                <article className="group p-7 rounded-3xl border border-beige-dark bg-cream/50 hover:bg-white hover:border-gold hover:shadow-gold transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-maroon/5 flex items-center justify-center mb-5 group-hover:bg-maroon group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-maroon group-hover:text-cream transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl text-text-dark mb-2">{reason.title}</h3>
                  <p className="text-sm text-text-light leading-relaxed font-light">{reason.desc}</p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
