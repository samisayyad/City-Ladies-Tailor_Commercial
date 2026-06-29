import { MARQUEE_ITEMS } from '../../data/content';

export default function MarqueeStrip() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="bg-maroon overflow-hidden py-3.5 border-y border-gold/20" aria-hidden="true">
      <div className="flex animate-[marquee_30s_linear_infinite] w-max">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-4 px-8 text-xs tracking-[0.18em] uppercase text-gold/80 font-medium whitespace-nowrap after:content-['✦'] after:text-gold after:text-[8px]"
          >
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
