import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useScrollPosition';

export default function LoadingScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    const duration = reduced ? 300 : 2200;
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 800);
    }, duration);
    return () => clearTimeout(timer);
  }, [onComplete, reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99990] bg-maroon-dark flex flex-col items-center justify-center gap-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          role="status"
          aria-label="Loading"
        >
          <div className="font-serif text-[clamp(1.75rem,5vw,3rem)] text-gold-light font-light tracking-[0.12em] text-center leading-tight">
            City Ladies Tailor
            <span className="block text-[0.45em] text-beige-dark tracking-[0.3em] uppercase mt-1.5">
              Premium Boutique
            </span>
          </div>
          <div className="w-40 h-px bg-white/12 relative overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-rose-gold-light"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: reduced ? 0.2 : 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            />
          </div>
          <motion.div
            className="w-0.5 h-10 bg-gradient-to-b from-transparent via-gold to-transparent"
            animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.8, 1, 0.8] }}
            transition={{ duration: 1, repeat: Infinity }}
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
