'use client';

import { motion } from "motion/react";

type StaggerGridProps = {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  delay?: number;
  staggerDelay?: number;
};

export default function StaggerGrid({
  children,
  className,
  itemClassName,
  delay = 0,
  staggerDelay = 0.08,
}: StaggerGridProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 32 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: delay + i * staggerDelay, ease: [0.23, 1, 0.32, 1] }}
          className={itemClassName}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
