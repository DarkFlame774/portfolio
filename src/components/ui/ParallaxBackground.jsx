import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useMemo } from 'react';

// Generates drifting particles (like cyber-sparks or falling cherry blossoms in a tech-world)
const generateParticles = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    // Mix of teal (cyber) and gold (traditional)
    color: Math.random() > 0.7 ? 'rgba(212,165,116,' : 'rgba(34,211,238,',
    opacity: Math.random() * 0.5 + 0.2,
  }));

export const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 60, damping: 25, restDelta: 0.001 });
  
  const mouseX = useSpring(0, { stiffness: 40, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 30 });
  
  // Reduced particle count significantly to 8 for maximum scroll performance
  const particles = useMemo(() => generateParticles(8), []);

  // Parallax mappings based on smoothed scroll
  const yLayer1 = useTransform(smoothScrollY, [0, 5000], [0, 800]);  // Far background (slow)
  const yLayer2 = useTransform(smoothScrollY, [0, 5000], [0, -400]); // Midground (moves up)
  const yLayer3 = useTransform(smoothScrollY, [0, 5000], [0, 300]);  // Foreground (faster down)

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse to -1 to 1
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Mouse parallax
  const mParX1 = useTransform(mouseX, [-1, 1], [-20, 20]);
  const mParY1 = useTransform(mouseY, [-1, 1], [-20, 20]);
  const mParX2 = useTransform(mouseX, [-1, 1], [30, -30]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#05050a]" style={{ transform: 'translateZ(0)' }}>
      
      {/* 1. Base Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#0c1020_0%,#030408_100%)] opacity-80" />

      {/* 2. Cyber-Circuit Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          backgroundPosition: 'center center',
          transform: 'translateZ(0)'
        }}
      />

      {/* 3. Deep Background Geometric Seal (Taopunk Mandala/Bagua) */}
      <motion.div
        style={{ y: yLayer1, x: mParX1, willChange: 'transform' }}
        className="absolute top-[10%] -left-[10%] w-[800px] h-[800px] opacity-[0.08] text-teal"
      >
        <motion.svg
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="w-full h-full"
          style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
        >
          {/* Octagon base */}
          <polygon points="60,10 140,10 190,60 190,140 140,190 60,190 10,140 10,60" />
          <circle cx="100" cy="100" r="85" />
          <circle cx="100" cy="100" r="70" />
          <circle cx="100" cy="100" r="30" />
          {/* Inner radiating lines */}
          <path d="M100 15 L100 85 M100 115 L100 185 M15 100 L85 100 M115 100 L185 100" />
          <path d="M40 40 L75 75 M160 160 L125 125 M160 40 L125 75 M40 160 L75 125" />
        </motion.svg>
      </motion.div>

      {/* 4. Midground Secondary Seal (Gold/Bronze) */}
      <motion.div
        style={{ y: yLayer2, x: mParX2, willChange: 'transform' }}
        className="absolute bottom-[20%] -right-[5%] w-[600px] h-[600px] opacity-[0.06] text-gold"
      >
        <motion.svg
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="w-full h-full"
          style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 240, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="100" cy="100" r="90" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="75" />
          {/* Hexagon */}
          <polygon points="100,25 165,62.5 165,137.5 100,175 35,137.5 35,62.5" />
          <polygon points="100,45 147,72.5 147,127.5 100,155 53,127.5 53,72.5" />
        </motion.svg>
      </motion.div>

      {/* 5. Glowing Nebula/Orbs - OPTIMIZED: Removed scale animations to eliminate repaint lag */}
      <motion.div
        className="absolute -top-[20%] left-[20%] w-[700px] h-[700px]"
        style={{ 
          y: yLayer2, 
          x: mParY1, 
          willChange: 'transform, opacity',
          background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 60%)',
          transform: 'translateZ(0)'
        }}
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[40%] right-[10%] w-[500px] h-[500px]"
        style={{ 
          y: yLayer3, 
          x: mParX1, 
          willChange: 'transform, opacity',
          background: 'radial-gradient(circle, rgba(212,165,116,0.15) 0%, transparent 60%)',
          transform: 'translateZ(0)'
        }}
        animate={{ opacity: [0.12, 0.20, 0.12] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px]"
        style={{ 
          y: yLayer1, 
          x: mParX2, 
          willChange: 'transform, opacity',
          background: 'radial-gradient(circle, rgba(45,212,191,0.2) 0%, transparent 60%)',
          transform: 'translateZ(0)'
        }}
        animate={{ opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* 6. Falling/Drifting "Cyber-Sparks" (Particles) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size * 2,
            height: p.size * 2,
            background: `radial-gradient(circle, ${p.color}${p.opacity + 0.4}) 0%, transparent 70%)`,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)'
          }}
          animate={{
            y: ['-10vh', '110vh'],
            x: [0, Math.random() * 40 - 20, Math.random() * 40 - 20],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay },
            x: { duration: p.duration * 0.8, repeat: Infinity, ease: 'easeInOut', yoyo: Infinity },
            opacity: { duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay },
          }}
        />
      ))}

      {/* 7. Subtle vertical tech-scanline */}
      <motion.div
        className="absolute top-0 bottom-0 w-[1px] shadow-[0_0_15px_rgba(34,211,238,0.5)]"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(34,211,238,0.4), transparent)',
          left: '15%'
        }}
        animate={{ opacity: [0, 0.3, 0], top: ['-50%', '150%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 1 }}
      />
      <motion.div
        className="absolute top-0 bottom-0 w-[1px] shadow-[0_0_15px_rgba(212,165,116,0.3)]"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(212,165,116,0.3), transparent)',
          right: '25%'
        }}
        animate={{ opacity: [0, 0.2, 0], top: ['-100%', '200%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 5 }}
      />

      {/* Edge darkening to frame the content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(3,4,8,0.85)_100%)] pointer-events-none" />
    </div>
  );
};