import { Share2, Users, MessageCircle, Video, ArrowRight } from 'lucide-react';
import { NAV_LINKS } from '../../data/content';

const footerServices = [
  'Designer Blouses',
  'Bridal Wear',
  'Lehenga Stitching',
  'Salwar Suits',
  'Western Dresses',
  'Aari & Maggam Work',
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-maroon-dark text-cream" role="contentinfo">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-[60px] py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <div className="font-serif text-2xl font-semibold tracking-wide leading-tight mb-4">
              City Ladies Tailor
              <span className="block text-[0.5em] font-light tracking-[0.25em] uppercase text-gold-light mt-1">
                Premium Boutique · Est. 2009
              </span>
            </div>
            <p className="text-sm text-cream/55 leading-relaxed font-light mb-6">
              Where every thread is a promise of perfection. Creating bespoke fashion experiences for the modern Indian woman since 2009.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Share2, label: 'Instagram' },
                { icon: Users, label: 'Facebook' },
                { icon: MessageCircle, label: 'WhatsApp' },
                { icon: Video, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold-light hover:bg-gold hover:text-white transition-all duration-300 cursor-pointer"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-xs tracking-[0.2em] uppercase text-gold font-semibold mb-5">Quick Links</h5>
            <ul className="space-y-3 list-none">
              {NAV_LINKS.filter((l) => l.href !== '#hero').map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-cream/60 hover:text-gold-light transition-colors cursor-pointer">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#booking" className="text-sm text-cream/60 hover:text-gold-light transition-colors cursor-pointer">
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs tracking-[0.2em] uppercase text-gold font-semibold mb-5">Services</h5>
            <ul className="space-y-3 list-none">
              {footerServices.map((service) => (
                <li key={service}>
                  <a href="#services" className="text-sm text-cream/60 hover:text-gold-light transition-colors cursor-pointer">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs tracking-[0.2em] uppercase text-gold font-semibold mb-5">Newsletter</h5>
            <p className="text-sm text-cream/55 leading-relaxed font-light mb-4">
              Get seasonal lookbook updates, early access to new collections, and exclusive offers.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email for newsletter"
                className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-gold/20 text-cream placeholder:text-cream/30 text-sm focus:border-gold outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-11 h-11 rounded-full gradient-gold flex items-center justify-center text-white shrink-0 cursor-pointer hover:shadow-gold transition-shadow"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/10">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-[60px] py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <p>
            © {new Date().getFullYear()} <span className="text-gold-light">City Ladies Tailor</span>. All rights reserved.
          </p>
          <p>Privacy Policy · Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
