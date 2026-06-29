import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../data/content';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import Button from '../ui/Button';

export default function Navbar() {
  const scrolled = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 px-5 md:px-10 lg:px-[60px] transition-all duration-400 ${
          scrolled ? 'glass shadow-sm' : 'bg-transparent'
        }`}
        role="banner"
      >
        <div
          className={`max-w-[1400px] mx-auto flex items-center justify-between transition-all duration-400 ${
            scrolled ? 'h-[60px]' : 'h-20'
          }`}
        >
          <a
            href="#hero"
            className={`font-serif text-[clamp(1.125rem,2vw,1.5rem)] font-semibold tracking-wide leading-tight transition-colors duration-400 ${
              scrolled ? 'text-maroon' : 'text-white'
            }`}
            aria-label="City Ladies Tailor – Home"
          >
            City Ladies Tailor
            <span
              className={`block text-[0.5em] font-light tracking-[0.25em] uppercase transition-colors duration-400 ${
                scrolled ? 'text-gold' : 'text-gold-light'
              }`}
            >
              Premium Boutique
            </span>
          </a>

          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8" aria-label="Main navigation">
            <ul className="flex items-center gap-6 2xl:gap-8 list-none">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`group relative text-[13px] font-medium tracking-[0.1em] uppercase transition-colors duration-200 cursor-pointer ${
                      scrolled ? 'text-text-mid hover:text-maroon' : 'text-white/85 hover:text-gold-light'
                    }`}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  </a>
                </li>
              ))}
            </ul>
            <Button href="#booking" className="!py-2.5 !px-6 !text-xs">
              Book Stitching
            </Button>
          </nav>

          <button
            type="button"
            className="xl:hidden p-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-gold rounded"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu className={`w-6 h-6 ${scrolled ? 'text-maroon' : 'text-white'}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[999] bg-maroon-dark flex flex-col items-center justify-center gap-8 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <button
              type="button"
              className="absolute top-6 right-6 p-2 text-cream cursor-pointer"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="font-serif text-4xl sm:text-5xl text-cream tracking-wide hover:text-gold-light transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <Button href="#booking" onClick={() => setMobileOpen(false)}>
              Book Stitching
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
