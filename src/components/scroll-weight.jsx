'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

// NOHEMI ships nine weights; this makes the axis a motion idea rather than a static choice. The
// heading gains weight as it crosses the viewport. Under reduced motion it renders as plain
// markup at its rest weight, so nothing depends on the animation to be readable.
export default function ScrollWeight({
  children,
  className = '',
  from = 400,
  to = 700,
  offset = ['start end', 'end start'],
  ...rest
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const weight = useTransform(scrollYProgress, [0, 0.5, 1], [from, to, from]);

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { fontWeight: weight }} {...rest}>
      {children}
    </motion.div>
  );
}
