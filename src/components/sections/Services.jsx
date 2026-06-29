import * as LucideIcons from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../../data/content';
import SectionHeader from '../ui/SectionHeader';
import MobileAutoSlider from '../ui/MobileAutoSlider';
import { StaggerItem } from '../ui/Motion';

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 lg:py-[120px] px-5 md:px-10 lg:px-[60px] bg-cream" aria-labelledby="services-title">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          eyebrow="What We Offer"
          title="Our"
          titleEm="Services"
          subtitle="From everyday elegance to once-in-a-lifetime bridal couture — discover our full range of bespoke tailoring services."
        />

        <MobileAutoSlider
          desktopClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-4 mt-14 md:mt-16"
          itemClassName="shrink-0 w-[78vw] max-w-[280px] snap-start"
          fadeFrom="cream"
          ariaLabel="Our services"
          speed={0.35}
        >
          {SERVICES.map((service) => {
            const Icon = LucideIcons[service.icon] || LucideIcons.Shirt;
            return (
              <StaggerItem
                key={service.title}
                className={`group bg-white border border-beige-dark rounded-3xl p-6 flex flex-col justify-between h-full min-h-[200px] hover:border-gold hover:shadow-gold transition-all duration-300 hover:-translate-y-1 cursor-pointer focus-within:ring-2 focus-within:ring-gold/50 ${
                  service.wide ? 'lg:col-span-2' : ''
                } ${service.tall ? 'lg:row-span-2' : ''}`}
              >
                <div>
                  <div className="w-11 h-11 gradient-gold rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-text-dark mb-2">{service.title}</h3>
                  <p className="text-sm text-text-light leading-relaxed font-light">{service.desc}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <span className="w-9 h-9 rounded-full border border-beige-dark flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-cream group-hover:border-maroon transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </StaggerItem>
            );
          })}
        </MobileAutoSlider>
      </div>
    </section>
  );
}
