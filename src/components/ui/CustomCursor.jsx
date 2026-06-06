import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useSpring(cursorX, { damping: 18, stiffness: 180, mass: 0.6 });
  const ringY = useSpring(cursorY, { damping: 18, stiffness: 180, mass: 0.6 });

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target.matches('button, a, [role="button"], input, textarea, select, label[for]') ||
          target.closest('button, a, [role="button"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      if (target.matches('button, a, [role="button"], input, textarea, select, label[for]') ||
          target.closest('button, a, [role="button"]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.documentElement.addEventListener('mouseleave', () => setIsVisible(false));
    document.documentElement.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  const teal = '#22d3ee';
  const gold = '#d4a574';
  const activeColor = isHovering ? gold : teal;

  return (
    <>
      {/* Outer targeting ring — follows with spring lag */}
      <motion.div
        className="cursor-blade"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <svg
          width={isHovering ? 40 : 30}
          height={isHovering ? 40 : 30}
          viewBox="0 0 40 40"
          fill="none"
          style={{
            transition: 'width 0.2s, height 0.2s',
            filter: `drop-shadow(0 0 4px ${activeColor}40)`,
          }}
        >
          {/* Corner bracket lines — targeting reticle */}
          {/* Top-left */}
          <line x1="4" y1="4" x2="4" y2="12" stroke={activeColor} strokeWidth="1" opacity="0.7" />
          <line x1="4" y1="4" x2="12" y2="4" stroke={activeColor} strokeWidth="1" opacity="0.7" />
          {/* Top-right */}
          <line x1="36" y1="4" x2="36" y2="12" stroke={activeColor} strokeWidth="1" opacity="0.7" />
          <line x1="36" y1="4" x2="28" y2="4" stroke={activeColor} strokeWidth="1" opacity="0.7" />
          {/* Bottom-left */}
          <line x1="4" y1="36" x2="4" y2="28" stroke={activeColor} strokeWidth="1" opacity="0.7" />
          <line x1="4" y1="36" x2="12" y2="36" stroke={activeColor} strokeWidth="1" opacity="0.7" />
          {/* Bottom-right */}
          <line x1="36" y1="36" x2="36" y2="28" stroke={activeColor} strokeWidth="1" opacity="0.7" />
          <line x1="36" y1="36" x2="28" y2="36" stroke={activeColor} strokeWidth="1" opacity="0.7" />
        </svg>
      </motion.div>

      {/* Inner dot — follows cursor exactly */}
      <motion.div
        className="cursor-blade"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.12 }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            backgroundColor: activeColor,
            boxShadow: `0 0 6px ${activeColor}80, 0 0 15px ${activeColor}30`,
            transition: 'background-color 0.2s, box-shadow 0.2s',
          }}
        />
      </motion.div>
    </>
  );
};
