import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function FloatingOrbs({ scrollProgress }) {
  return (
    <>
      <motion.div
        className="absolute top-[15%] left-[8%] w-48 h-48 rounded-full pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.15), transparent 70%)',
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-64 h-64 rounded-full pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(circle, rgba(107,26,43,0.25), transparent 70%)',
          opacity: 1 - scrollProgress * 0.6,
        }}
        animate={{ x: [0, -25, 0], y: [0, 15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-[40%] right-[20%] w-3 h-3 rounded-full bg-gold/30 pointer-events-none z-[1]"
        animate={{ y: [0, -40, 0], opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[35%] left-[18%] w-2 h-2 rounded-full bg-gold-light/40 pointer-events-none z-[1]"
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        aria-hidden="true"
      />
    </>
  );
}

export default function ScrollExpandMedia({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend = false,
  children,
  overlay,
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const progressRef = useRef(0);
  const expandedRef = useRef(false);
  const touchRef = useRef(0);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    expandedRef.current = mediaFullyExpanded;
  }, [mediaFullyExpanded]);

  useEffect(() => {
    touchRef.current = touchStartY;
  }, [touchStartY]);

  useEffect(() => {
    setScrollProgress(0);
    progressRef.current = 0;
    setShowContent(false);
    setMediaFullyExpanded(false);
    expandedRef.current = false;
  }, [mediaType]);

  useEffect(() => {
    const updateProgress = (delta) => {
      const newProgress = Math.min(Math.max(progressRef.current + delta, 0), 1);
      progressRef.current = newProgress;
      setScrollProgress(newProgress);

      if (newProgress >= 1) {
        expandedRef.current = true;
        setMediaFullyExpanded(true);
        setShowContent(true);
      } else if (newProgress < 0.75) {
        setShowContent(false);
      }
    };

    const handleWheel = (e) => {
      if (expandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        expandedRef.current = false;
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!expandedRef.current) {
        e.preventDefault();
        updateProgress(e.deltaY * 0.0009);
      }
    };

    const handleTouchStart = (e) => {
      const y = e.touches[0].clientY;
      touchRef.current = y;
      setTouchStartY(y);
    };

    const handleTouchMove = (e) => {
      if (!touchRef.current) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchRef.current - touchY;

      if (expandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        expandedRef.current = false;
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!expandedRef.current) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        updateProgress(deltaY * scrollFactor);
        touchRef.current = touchY;
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => {
      touchRef.current = 0;
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (!expandedRef.current) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mediaWidth = 280 + scrollProgress * (isMobile ? 620 : 1180);
  const mediaHeight = 380 + scrollProgress * (isMobile ? 220 : 420);
  const textTranslateX = scrollProgress * (isMobile ? 16 : 14);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div className="transition-colors duration-700 ease-in-out overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]" id="hero" aria-label="Hero">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress * 0.85 }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt=""
              className="w-full h-full object-cover object-center"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-maroon-dark/92 via-maroon/78 to-maroon-dark/85" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, #C9A84C 49px, #C9A84C 50px),
                  repeating-linear-gradient(90deg, transparent, transparent 49px, #C9A84C 49px, #C9A84C 50px)`,
              }}
              aria-hidden="true"
            />
          </motion.div>

          <FloatingOrbs scrollProgress={scrollProgress} />
          {overlay}

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10 w-full max-w-[1400px] px-5 md:px-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              {/* Rotating decorative ring */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10 pointer-events-none z-[4]"
                style={{
                  width: `${mediaWidth + 48}px`,
                  height: `${mediaHeight + 48}px`,
                  maxWidth: '98vw',
                  maxHeight: '88vh',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold/50" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold-light/40" />
              </motion.div>

              <motion.div
                className="absolute z-[5] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0 0 60px rgba(107, 26, 43, 0.45), 0 0 30px rgba(201, 168, 76, 0.15)',
                }}
                animate={
                  scrollProgress < 0.05
                    ? { y: [0, -6, 0] }
                    : { y: 0 }
                }
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {mediaType === 'video' ? (
                  <div className="relative w-full h-full pointer-events-none rounded-xl overflow-hidden">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover rounded-xl"
                      controls={false}
                    />
                    <motion.div
                      className="absolute inset-0 bg-maroon-dark/40 rounded-xl"
                      animate={{ opacity: 0.5 - scrollProgress * 0.35 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      style={{ scale: 1 + scrollProgress * 0.08 }}
                      animate={
                        scrollProgress < 0.05
                          ? { scale: [1.05, 1.08, 1.05] }
                          : undefined
                      }
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <img
                        src={mediaSrc}
                        alt={title || 'Featured tailoring work'}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </motion.div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-light to-transparent z-10" />
                    {/* Shimmer on media */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none z-[2]"
                      style={{
                        background: 'linear-gradient(105deg, transparent 42%, rgba(228,201,126,0.15) 50%, transparent 58%)',
                      }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                      aria-hidden="true"
                    />
                    <motion.div
                      className="absolute inset-0 bg-maroon-dark/45 rounded-xl"
                      animate={{ opacity: 0.55 - scrollProgress * 0.35 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center text-center relative z-10 mt-4">
                  {date && (
                    <p
                      className="text-[11px] tracking-[0.22em] uppercase text-gold-light font-medium"
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && !mediaFullyExpanded && (
                    <motion.p
                      className="text-gold-light/80 text-sm font-light mt-2 flex items-center justify-center gap-2"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {scrollToExpand}
                      <motion.span
                        className="inline-block w-1 h-1 rounded-full bg-gold-light"
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        aria-hidden="true"
                      />
                    </motion.p>
                  )}
                </div>
              </motion.div>

              <div
                className={`flex items-center justify-center text-center gap-2 md:gap-4 w-full relative z-10 flex-col pointer-events-none ${
                  textBlend ? 'mix-blend-difference' : ''
                }`}
              >
                <motion.h1
                  className="font-serif text-[clamp(2rem,5vw,4.5rem)] font-light text-cream leading-[1.08] tracking-tight"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                  animate={scrollProgress < 0.05 ? { opacity: [0.85, 1, 0.85] } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {firstWord}
                </motion.h1>
                <motion.h1
                  className="font-serif text-[clamp(2rem,5vw,4.5rem)] font-light text-center text-gold-light italic leading-[1.08] tracking-tight"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                  animate={scrollProgress < 0.05 ? { opacity: [0.85, 1, 0.85] } : {}}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  {restOfTitle}
                </motion.h1>
              </div>
            </div>

            <motion.section
              className="relative flex flex-col w-full pb-16 md:pb-24 -mx-5 md:-mx-10 px-5 md:px-10 lg:px-[60px] rounded-t-[40px] overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
              aria-hidden={!showContent}
            >
              <div
                className="absolute inset-0 bg-gradient-to-b from-maroon-dark/90 via-maroon/85 to-maroon-dark/95 backdrop-blur-sm"
                aria-hidden="true"
              />
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden="true" />
              <div className="relative z-10">{children}</div>
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
}
