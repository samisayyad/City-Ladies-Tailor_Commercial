/**
 * Local image paths — served from /public/images (always reliable, no external CDN).
 * Premium SVG placeholders used as fallback via SmartImage component.
 */
export const IMAGES = {
  about: {
    main: '/images/about/main.jpg',
    detail: '/images/about/detail.jpg',
    founder: '/images/about/founder.jpg',
  },
  collections: [
    '/images/collections/bridal.jpg',
    '/images/collections/festival.jpg',
    '/images/collections/party.jpg',
    '/images/collections/office.jpg',
    '/images/collections/college.jpg',
    '/images/collections/blouse.jpg',
    '/images/collections/western.jpg',
    '/images/collections/ethnic.jpg',
  ],
  gallery: Array.from({ length: 12 }, (_, i) => `/images/gallery/${String(i + 1).padStart(2, '0')}.jpg`),
  products: Array.from({ length: 10 }, (_, i) => `/images/products/${String(i + 1).padStart(2, '0')}.jpg`),
};

/** Premium gradient palettes for SVG fallbacks when an image is missing */
export const PLACEHOLDER_PALETTES = [
  { from: '#4A0F1C', to: '#8B2A3E', accent: '#C9A84C' },
  { from: '#6B2A1A', to: '#A84A2A', accent: '#E4C97E' },
  { from: '#3A1A4A', to: '#6A3A8A', accent: '#D4948E' },
  { from: '#1A3A4A', to: '#3A6A8A', accent: '#C9A84C' },
  { from: '#2A4A1A', to: '#4A8A3A', accent: '#F5E6B8' },
  { from: '#4A3A1A', to: '#8A6A2A', accent: '#E4C97E' },
  { from: '#1A2A4A', to: '#3A4A8A', accent: '#B5706A' },
  { from: '#3A1A2A', to: '#6A3A5A', accent: '#C9A84C' },
];
