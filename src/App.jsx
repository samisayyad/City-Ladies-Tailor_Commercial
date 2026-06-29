import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/layout/LoadingScreen';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/layout/CustomCursor';
import { ScrollToTop, WhatsAppFab } from './components/layout/FloatingActions';
import Hero from './components/sections/Hero';
import MarqueeStrip from './components/sections/MarqueeStrip';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Embroidery from './components/sections/Embroidery';
import Collections from './components/sections/Collections';
import Process from './components/sections/Process';
import WhyChooseUs from './components/sections/WhyChooseUs';
import Gallery from './components/sections/Gallery';
import FeaturedProducts from './components/sections/FeaturedProducts';
import Testimonials from './components/sections/Testimonials';
import SewingProcess from './components/sections/SewingProcess';
import FAQ from './components/sections/FAQ';
import Booking from './components/sections/Booking';
import Contact from './components/sections/Contact';

export default function App() {
  const [loading, setLoading] = useState(true);
  const onLoadComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={onLoadComplete} />}
      </AnimatePresence>

      <CustomCursor />
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <Hero />
        <MarqueeStrip />
        <About />
        <Services />
        <Embroidery />
        <Collections />
        <Process />
        <WhyChooseUs />
        <Gallery />
        <FeaturedProducts />
        <Testimonials />
        <SewingProcess />
        <FAQ />
        <Booking />
        <Contact />
      </motion.main>

      <Footer />
      <ScrollToTop />
      <WhatsAppFab />
    </>
  );
}
