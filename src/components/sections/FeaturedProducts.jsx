import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../../data/content';
import { PLACEHOLDER_PALETTES } from '../../data/images';
import SectionHeader from '../ui/SectionHeader';
import SmartImage from '../ui/SmartImage';
import { StaggerContainer, StaggerItem } from '../ui/Motion';

export default function FeaturedProducts() {
  const [preview, setPreview] = useState(null);

  return (
    <section id="products" className="py-16 md:py-24 lg:py-[120px] px-5 md:px-10 lg:px-[60px] bg-white" aria-labelledby="products-title">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          eyebrow="Boutique Picks"
          title="Featured"
          titleEm="Products"
          subtitle="Beautifully crafted pieces and premium materials available at our boutique — stitched with the same care as our custom orders."
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-14">
          {FEATURED_PRODUCTS.map((product, i) => (
            <StaggerItem key={product.title}>
              <article className="group relative rounded-3xl overflow-hidden border border-beige-dark hover:border-gold hover:shadow-gold transition-all duration-300 hover:-translate-y-1 bg-cream">
                <div className="aspect-[3/4] relative overflow-hidden">
                  {product.tag && (
                    <span className="absolute top-3 left-3 z-10 text-[9px] tracking-widest uppercase bg-maroon text-cream px-2.5 py-1 rounded-full font-semibold shadow-sm">
                      {product.tag}
                    </span>
                  )}
                  <SmartImage
                    src={product.image}
                    alt={product.alt}
                    title={product.title}
                    paletteIndex={i}
                    palettes={PLACEHOLDER_PALETTES}
                    className="absolute inset-0"
                    imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer z-10"
                    onClick={() => setPreview(product)}
                    aria-label={`Quick preview ${product.title}`}
                  >
                    <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <Eye className="w-5 h-5 text-maroon" />
                    </span>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base text-text-dark mb-1">{product.title}</h3>
                  <p className="text-sm text-gold font-medium">{product.price}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${preview.title} preview`}
          >
            <motion.div
              className="bg-cream rounded-3xl overflow-hidden max-w-md w-full shadow-luxury"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <SmartImage
                src={preview.image}
                alt={preview.alt}
                title={preview.title}
                className="w-full aspect-[4/5]"
                imgClassName="w-full h-full object-cover"
              />
              <div className="p-8 text-center">
                <h3 className="font-serif text-2xl text-maroon mb-2">{preview.title}</h3>
                <p className="text-gold font-medium mb-4">{preview.price}</p>
                <p className="text-sm text-text-light font-light mb-6">
                  Visit our boutique in Ghataprabha or book an appointment to explore this collection in person.
                </p>
                <a href="#booking" className="inline-block gradient-gold text-white px-8 py-3 rounded-full text-xs tracking-widest uppercase font-semibold cursor-pointer">
                  Book Appointment
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
