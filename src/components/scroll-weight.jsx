'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

// NOHEMI's nine weights made a motion idea: the heading gains weight across the viewport, rendering at its rest weight under reduced motion.
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
