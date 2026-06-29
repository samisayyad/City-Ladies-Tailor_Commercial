import { useState, useId } from 'react';

function PremiumPlaceholder({ title, subtitle, palette, className = '' }) {
  const { from, to, accent } = palette;
  const patternId = useId();
  return (
    <div
      className={`relative w-full h-full overflow-hidden flex flex-col items-center justify-center ${className}`}
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
      role="img"
      aria-label={title}
    >
      {/* Fabric weave pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" aria-hidden="true">
        <defs>
          <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10h20M10 0v20" stroke={accent} strokeWidth="0.5" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 50% 30%, ${accent}33, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* Decorative rings */}
      <div
        className="absolute w-32 h-32 rounded-full border opacity-20"
        style={{ borderColor: accent }}
        aria-hidden="true"
      />
      <div
        className="absolute w-48 h-48 rounded-full border opacity-10"
        style={{ borderColor: accent }}
        aria-hidden="true"
      />

      {/* Scissors icon */}
      <svg viewBox="0 0 24 24" className="w-10 h-10 mb-3 opacity-60" fill="none" aria-hidden="true">
        <path
          d="M6 6c1.5-1.5 3.5-1.5 5 0M6 18c1.5 1.5 3.5 1.5 5 0M14 8l6-4M14 16l6 4M14 8l6 4M14 16l6-4"
          stroke={accent}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {title && (
        <p className="relative z-10 font-serif text-lg text-white/90 text-center px-4 leading-snug">
          {title}
        </p>
      )}
      {subtitle && (
        <p className="relative z-10 text-[10px] tracking-[0.2em] uppercase mt-2 px-4" style={{ color: accent }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function SmartImage({
  src,
  alt,
  title,
  subtitle,
  paletteIndex = 0,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  palettes,
  ...props
}) {
  const [status, setStatus] = useState('loading'); // loading | loaded | error

  const palette = (palettes || [])[paletteIndex % (palettes?.length || 8)] || {
    from: '#4A0F1C',
    to: '#8B2A3E',
    accent: '#C9A84C',
  };

  if (status === 'error' || !src) {
    return (
      <PremiumPlaceholder
        title={title || alt}
        subtitle={subtitle}
        palette={palette}
        className={className}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {status === 'loading' && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`${imgClassName} transition-opacity duration-500 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        {...props}
      />
    </div>
  );
}

export { PremiumPlaceholder };
