import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useScrollPosition';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, select, textarea');
      setHovering(!!target);
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
    };
  }, [reduced]);

  if (reduced) return null;
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-gold rounded-full pointer-events-none z-[99999] mix-blend-difference"
        animate={{
          x: pos.x,
          y: pos.y,
          scale: hovering ? 2.5 : 1,
          backgroundColor: hovering ? '#B5706A' : '#C9A84C',
        }}
        style={{ translateX: '-50%', translateY: '-50%' }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
        aria-hidden="true"
      />
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 border-[1.5px] border-gold rounded-full pointer-events-none z-[99998]"
        animate={{
          x: pos.x,
          y: pos.y,
          scale: hovering ? 1.5 : 1,
          opacity: hovering ? 0.3 : 0.6,
        }}
        style={{ translateX: '-50%', translateY: '-50%' }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.8 }}
        aria-hidden="true"
      />
    </>
  );
}
