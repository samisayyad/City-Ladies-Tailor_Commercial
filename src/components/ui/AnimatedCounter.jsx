import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useScrollPosition';

export default function AnimatedCounter({ value, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    if (reduced) {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(value);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, reduced]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      <span className="text-gold">{suffix}</span>
    </span>
  );
}
