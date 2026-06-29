import { FadeIn } from './Motion';

export default function SectionHeader({
  eyebrow,
  title,
  titleEm,
  subtitle,
  centered = true,
  className = '',
}) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <FadeIn delay={0}>
        <p className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-gold font-semibold mb-4">
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-gold" aria-hidden="true" />
          {eyebrow}
          <span className="h-px w-6 bg-gradient-to-l from-transparent to-gold" aria-hidden="true" />
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 className="font-serif text-[clamp(2rem,4.5vw,3.875rem)] font-light tracking-tight text-text-dark leading-[1.1] mb-5">
          {title}
          {titleEm && (
            <>
              {' '}
              <em className="italic text-maroon font-light">{titleEm}</em>
            </>
          )}
        </h2>
      </FadeIn>
      {subtitle && (
        <FadeIn delay={0.2}>
          <p
            className={`text-[clamp(0.875rem,1.3vw,1.0625rem)] text-text-light leading-relaxed font-light max-w-xl ${
              centered ? 'mx-auto' : ''
            }`}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
