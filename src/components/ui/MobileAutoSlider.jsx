import { useRef, useEffect, useState, useCallback, Children } from 'react';
import { StaggerContainer } from './Motion';
import { useReducedMotion } from '../../hooks/useScrollPosition';

const FADE_FROM = {
  cream: 'from-cream',
  white: 'from-white',
  'maroon-dark': 'from-maroon-dark',
};

export function useMobileLayout(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [breakpoint]);

  return isMobile;
}

export default function MobileAutoSlider({
  children,
  desktopClassName = '',
  mobileClassName = 'mt-14',
  itemClassName = 'shrink-0 w-[82vw] max-w-[300px] snap-start',
  fadeFrom = 'cream',
  speed = 0.4,
  gap = 'gap-4',
  ariaLabel = 'Browse items',
  stagger = 0.08,
  hintClassName = 'text-text-light/70',
}) {
  const scrollRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const userInteractingRef = useRef(false);
  const isMobile = useMobileLayout();
  const reduced = useReducedMotion();

  const childArray = Children.toArray(children);
  const loopChildren = [...childArray, ...childArray];
  const fadeClass = FADE_FROM[fadeFrom] || FADE_FROM.cream;

  const pauseAuto = useCallback(() => {
    userInteractingRef.current = true;
    clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      userInteractingRef.current = false;
    }, 2500);
  }, []);

  const normalizeScroll = useCallback((el) => {
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
  }, []);

  useEffect(() => {
    if (!isMobile || reduced) return;
    const el = scrollRef.current;
    if (!el) return;

    let rafId;
    const tick = () => {
      if (!userInteractingRef.current) {
        el.scrollLeft += speed;
        normalizeScroll(el);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isMobile, reduced, speed, normalizeScroll]);

  useEffect(() => () => clearTimeout(pauseTimeoutRef.current), []);

  const handleScroll = useCallback(() => {
    pauseAuto();
    const el = scrollRef.current;
    if (el) normalizeScroll(el);
  }, [pauseAuto, normalizeScroll]);

  if (!isMobile) {
    return (
      <StaggerContainer className={desktopClassName} stagger={stagger}>
        {children}
      </StaggerContainer>
    );
  }

  return (
    <div className={`relative ${mobileClassName}`}>
      <div
        className={`pointer-events-none absolute left-0 top-0 bottom-2 w-10 z-10 bg-gradient-to-r ${fadeClass} to-transparent`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute right-0 top-0 bottom-2 w-10 z-10 bg-gradient-to-l ${fadeClass} to-transparent`}
        aria-hidden="true"
      />

      <div
        ref={scrollRef}
        className={`flex ${gap} overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide -mx-5 px-5 touch-pan-x`}
        onTouchStart={pauseAuto}
        onMouseDown={pauseAuto}
        onScroll={handleScroll}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
      >
        {loopChildren.map((child, i) => (
          <div key={`slide-${i}`} className={itemClassName}>
            {child}
          </div>
        ))}
      </div>

      <p className={`text-center text-[10px] tracking-[0.18em] uppercase mt-3 font-medium ${hintClassName}`}>
        Swipe to explore
      </p>
    </div>
  );
}
