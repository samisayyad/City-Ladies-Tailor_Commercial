import { MapPin, Phone, MessageCircle, Clock, Share2, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../../data/content';
import SectionHeader from '../ui/SectionHeader';
import { FadeIn } from '../ui/Motion';

const contactCards = [
  {
    icon: MapPin,
    title: 'Visit Us',
    content: (
      <p className="text-sm text-text-light leading-relaxed font-light">{CONTACT_INFO.address}</p>
    ),
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: (
      <div className="space-y-1">
        {CONTACT_INFO.phones.map((phone) => (
          <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="block text-sm text-maroon hover:text-gold transition-colors cursor-pointer">
            {phone}
          </a>
        ))}
      </div>
    ),
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    content: (
      <div>
        <a
          href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-maroon hover:text-gold transition-colors cursor-pointer"
        >
          {CONTACT_INFO.whatsapp}
        </a>
        <p className="text-xs text-text-light mt-1 font-light">Quickest response — usually within 30 mins</p>
      </div>
    ),
  },
  {
    icon: Mail,
    title: 'Email',
    content: (
      <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-maroon hover:text-gold transition-colors cursor-pointer">
        {CONTACT_INFO.email}
      </a>
    ),
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: (
      <p className="text-sm text-text-light leading-relaxed font-light whitespace-pre-line">{CONTACT_INFO.hours}</p>
    ),
  },
  {
    icon: Share2,
    title: 'Follow Our Work',
    content: (
      <div className="space-y-1">
        <a href="#" className="block text-sm text-maroon hover:text-gold transition-colors cursor-pointer">
          {CONTACT_INFO.instagram} on Instagram
        </a>
        <a href="#" className="block text-sm text-maroon hover:text-gold transition-colors cursor-pointer">
          {CONTACT_INFO.facebook} on Facebook
        </a>
      </div>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 lg:py-[120px] px-5 md:px-10 lg:px-[60px] bg-white" aria-labelledby="contact-title">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          eyebrow="Find Us"
          title="Get in"
          titleEm="Touch"
          subtitle="We're here for you — in person, on call, or on WhatsApp. Come say hello."
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-14">
          <div className="space-y-4">
            {contactCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.05}>
                <div className="flex gap-4 p-5 rounded-2xl border border-beige-dark hover:border-gold hover:shadow-gold transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-maroon/5 flex items-center justify-center shrink-0">
                    <card.icon className="w-5 h-5 text-maroon" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-text-dark mb-1">{card.title}</h4>
                    {card.content}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="rounded-3xl overflow-hidden border border-beige-dark h-full min-h-[400px] relative bg-cream">
              <iframe
                title="City Ladies Tailor location on Google Maps"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(CONTACT_INFO.mapQuery)}&z=15&ie=UTF8&iwloc=&output=embed`}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
