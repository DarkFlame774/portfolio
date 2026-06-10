import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * Ink Brush Cursor — shaped like a calligraphy brush tip.
 * On hover over content containers (.ink-splash-target),
 * dispatches a custom event to trigger ink splashes behind the container.
 */
export const InkBrushCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const trailX = useSpring(cursorX, { damping: 30, stiffness: 250, mass: 0.4 });
  const trailY = useSpring(cursorY, { damping: 30, stiffness: 250, mass: 0.4 });

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    // Hide default cursor globally
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = 'ink-cursor-hide';
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.matches('button, a, [role="button"], input, textarea, select, label[for]') ||
        target.closest('button, a, [role="button"]')
      ) {
        setIsHovering(true);
      }

      // Trigger ink splash on content containers
      const splashTarget = target.closest('.ink-splash-target');
      if (splashTarget && !splashTarget.dataset.splashed) {
        splashTarget.dataset.splashed = 'true';
        splashTarget.dispatchEvent(new CustomEvent('inksplash', { bubbles: false }));
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.matches('button, a, [role="button"], input, textarea, select, label[for]') ||
        target.closest('button, a, [role="button"]')
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.documentElement.addEventListener('mouseleave', () => setIsVisible(false));
    document.documentElement.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.body.style.cursor = '';
      const el = document.getElementById('ink-cursor-hide');
      if (el) el.remove();
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Brush tip — follows cursor exactly */}
      <motion.div
        className="cursor-blade"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-4px',
          translateY: '-2px',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.15 : 1,
          rotate: isHovering ? -10 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <svg width="28" height="38" viewBox="0 0 28 38" fill="none"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))' }}>
          {/* Brush handle */}
          <rect x="12" y="0" width="4" height="20" rx="1.5" fill="#3a3a3a" />
          <rect x="11.5" y="16" width="5" height="4" rx="1" fill="#2a2a2a" />
          {/* Ferrule (metal band) */}
          <rect x="10.5" y="19" width="7" height="3" rx="0.5" fill="#666" />
          {/* Brush tip — ink-loaded */}
          <path d="M 10.5 22 C 10.5 22, 9 28, 11 33 C 12 35, 14 37, 14 37 C 14 37, 16 35, 17 33 C 19 28, 17.5 22, 17.5 22 Z"
            fill="#111" />
          {/* Ink shine on tip */}
          <path d="M 12.5 24 C 12.5 24, 12 28, 13 31" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none" />
        </svg>
      </motion.div>

      {/* Trailing ink dot — follows with spring lag */}
      <motion.div
        className="cursor-blade"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 0.3 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div style={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: '#000',
        }} />
      </motion.div>
    </>
  );
};
