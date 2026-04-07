import { Variants } from 'framer-motion';

/**
 * Standard transition for subtle, professional feel
 */
export const transition = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
  duration: 0.2
} as const;

/**
 * Fade and Slide Up entrance - Refined for "snappy" feels (6px travel)
 */
export const slideUp: Variants = {
  initial: { opacity: 0, y: 6 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1] // Faster out-cubic ease
    }
  },
  exit: { opacity: 0, y: -6 }
};

/**
 * Staggered container for lists - Tightened for immediate feedback
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05
    }
  }
};

/**
 * Simple fade in - Fast and essential
 */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { opacity: 0 }
};

/**
 * Hover and Tap scale - Very subtle, high-speed feedback
 */
export const buttonClickProps = {
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.99 },
  transition: { type: 'spring' as const, stiffness: 500, damping: 20 }
};
