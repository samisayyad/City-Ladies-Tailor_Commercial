import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { GALLERY_CATS, GALLERY_ITEMS } from '../../data/content';
import { PLACEHOLDER_PALETTES } from '../../data/images';
import SectionHeader from '../ui/SectionHeader';
import SmartImage from '../ui/SmartImage';
import MobileAutoSlider from '../ui/MobileAutoSlider';
import { StaggerItem } from '../ui/Motion';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.cat === filter);

  return (
    <section id="gallery" className="py-16 md:py-24 lg:py-[120px] px-5 md:px-10 lg:px-[60px] bg-cream" aria-labelledby="gallery-title">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          eyebrow="Our Portfolio"
          title="Design"
          titleEm="Gallery"
          subtitle="A glimpse into the artistry that leaves every customer breathless. Browse our portfolio of custom-crafted masterpieces."
        />

        <div className="flex flex-wrap justify-center gap-2 mt-10 mb-8" role="group" aria-label="Gallery filters">
          {GALLERY_CATS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`px-5 py-2 rounded-full text-xs tracking-widest uppercase font-medium transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-gold ${
                filter === cat
                  ? 'gradient-gold text-white shadow-gold'
                  : 'bg-white border border-beige-dark text-text-mid hover:border-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <MobileAutoSlider
          key={filter}
          desktopClassName="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
          itemClassName="shrink-0 w-[72vw] max-w-[260px] snap-start"
          fadeFrom="cream"
          ariaLabel="Design gallery"
          speed={0.34}
          stagger={0.05}
        >
          {filtered.map((item, i) => (
            <StaggerItem key={`${item.cat}-${item.label}-${i}`}>
              <button
                type="button"
                className="group relative w-full h-80 rounded-2xl overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-gold shadow-sm hover:shadow-luxury transition-shadow lg:mb-4 lg:break-inside-avoid"
                onClick={() => setLightbox(item)}
                aria-label={`View ${item.label}`}
              >
                <SmartImage
                  src={item.image}
                  alt={item.alt}
                  title={item.label}
                  subtitle={item.cat}
                  paletteIndex={i}
                  palettes={PLACEHOLDER_PALETTES}
                  className="absolute inset-0"
                  imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/75 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                  <p className="font-serif text-lg text-cream text-left mb-1 drop-shadow-md">{item.label}</p>
                  <span className="inline-block text-[10px] tracking-widest uppercase bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-full text-maroon font-medium">
                    {item.cat}
                  </span>
                </div>
                <div className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Search className="w-8 h-8 text-cream drop-shadow-lg" />
                </div>
              </button>
            </StaggerItem>
          ))}
        </MobileAutoSlider>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${lightbox.label} preview`}
          >
            <motion.div
              className="relative max-w-lg w-full rounded-3xl overflow-hidden bg-cream shadow-luxury"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center cursor-pointer z-10 shadow-md"
                onClick={() => setLightbox(null)}
                aria-label="Close preview"
              >
                <X className="w-5 h-5 text-maroon" />
              </button>
              <SmartImage
                src={lightbox.image}
                alt={lightbox.alt}
                title={lightbox.label}
                subtitle={lightbox.cat}
                className="w-full aspect-[4/5]"
                imgClassName="w-full h-full object-cover"
              />
              <div className="p-6 text-center">
                <p className="text-xs tracking-widest uppercase text-gold mb-2">{lightbox.cat}</p>
                <h3 className="font-serif text-2xl text-maroon">{lightbox.label}</h3>
                <p className="text-sm text-text-light mt-3 font-light">Custom crafted at City Ladies Tailor</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
