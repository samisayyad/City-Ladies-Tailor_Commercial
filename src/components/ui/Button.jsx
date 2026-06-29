import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const variants = {
  primary: 'gradient-gold text-white shadow-gold hover:shadow-[0_16px_40px_rgba(201,168,76,0.5)]',
  secondary: 'border border-gold/50 text-gold-light backdrop-blur-sm hover:bg-gold/10 hover:border-gold-light',
  outline: 'border border-maroon/20 text-maroon hover:border-gold hover:text-gold',
  ghost: 'text-maroon hover:text-gold',
};

export default function Button({
  children,
  variant = 'primary',
  href,
  className = '',
  icon = false,
  onClick,
  type = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[13px] font-semibold tracking-[0.1em] uppercase rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold';

  const classes = `${base} ${variants[variant]} ${className}`;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && <ArrowRight className="w-4 h-4 relative z-10" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      {...props}
    >
      {content}
    </motion.button>
  );
}
