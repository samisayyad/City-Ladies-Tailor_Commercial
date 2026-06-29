import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../../data/content';
import { PLACEHOLDER_PALETTES } from '../../data/images';
import SectionHeader from '../ui/SectionHeader';
import SmartImage from '../ui/SmartImage';
import MobileAutoSlider from '../ui/MobileAutoSlider';
import { StaggerItem } from '../ui/Motion';

export default function Collections() {
  return (
    <section id="collections" className="py-16 md:py-24 lg:py-[120px] px-5 md:px-10 lg:px-[60px] bg-white" aria-labelledby="collections-title">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          eyebrow="Curated For You"
          title="Our"
          titleEm="Collections"
          subtitle="From bridal grandeur to everyday chic, explore collections designed to celebrate every woman, every occasion."
        />

        <MobileAutoSlider
          desktopClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14"
          itemClassName="shrink-0 w-[80vw] max-w-[300px] snap-start"
          fadeFrom="white"
          ariaLabel="Our collections"
          speed={0.38}
        >
          {COLLECTIONS.map((col, i) => (
            <StaggerItem key={col.title}>
              <article className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-gold shadow-md hover:shadow-luxury transition-shadow duration-500">
                <SmartImage
                  src={col.image}
                  alt={col.alt}
                  title={col.title}
                  subtitle={col.tag}
                  paletteIndex={i}
                  palettes={PLACEHOLDER_PALETTES}
                  className="absolute inset-0"
                  imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/90 via-maroon-dark/30 to-maroon-dark/10 group-hover:from-maroon-dark/80 transition-colors duration-500 pointer-events-none" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
                  <span className="inline-block text-[10px] tracking-[0.2em] uppercase text-gold-light font-semibold mb-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full w-fit border border-gold/20">
                    {col.tag}
                  </span>
                  <h3 className="font-serif text-2xl text-cream mb-2 drop-shadow-md">{col.title}</h3>
                  <p className="text-sm text-cream/75 leading-relaxed font-light line-clamp-3 lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-24 lg:group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    {col.desc}
                  </p>
                  <span className="hidden lg:inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gold-light mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </MobileAutoSlider>
      </div>
    </section>
  );
}
