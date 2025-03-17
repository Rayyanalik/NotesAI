
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type AnimatedWrapperProps = {
  children: ReactNode;
  animation?: 'fade' | 'slide' | 'none';
  delay?: number;
  className?: string;
};

const AnimatedWrapper = ({ 
  children, 
  animation = 'fade', 
  delay = 0,
  className = '' 
}: AnimatedWrapperProps) => {
  const getAnimationVariants = () => {
    switch (animation) {
      case 'fade':
        return {
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 }
        };
      case 'slide':
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 }
        };
      case 'none':
      default:
        return {
          hidden: {},
          visible: {}
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={getAnimationVariants()}
      transition={{ 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;
