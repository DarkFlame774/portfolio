import { useRef, lazy, Suspense } from 'react';
import { useScroll, useSpring, motion, useTransform } from 'framer-motion';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/ui/Navbar';
import { ParallaxBackground } from './components/ui/ParallaxBackground';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';

// Lazy load below-the-fold components for performance
const SkillTreeSection = lazy(() => import('./components/sections/SkillTreeSection').then(m => ({ default: m.SkillTreeSection })));
const Projects = lazy(() => import('./components/sections/Projects').then(m => ({ default: m.Projects })));
const ExperienceTimeline = lazy(() => import('./components/sections/ExperienceTimeline').then(m => ({ default: m.ExperienceTimeline })));
const Achievements = lazy(() => import('./components/sections/Achievements').then(m => ({ default: m.Achievements })));
const ContactSection = lazy(() => import('./components/sections/ContactTerminal').then(m => ({ default: m.ContactSection })));

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Noise Overlay - Optimized with transform to prevent scroll repaints */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-noise opacity-[0.02]" style={{ transform: 'translateZ(0)' }} />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-surface-highlight/20 z-[60]">
        <motion.div
          style={{ scaleX }}
          className="h-full origin-left bg-gradient-to-r from-teal-dim via-teal to-gold shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        />
      </div>

      {/* Parallax Background */}
      <ParallaxBackground />

      <Navbar />

      <main className="relative z-10 space-y-0 pb-32">
        <Hero />
        <About />
        
        <Suspense fallback={
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-r-2 border-teal opacity-50"></div>
          </div>
        }>
          <SkillTreeSection />
          <Projects />
          <ExperienceTimeline />
          <Achievements />
          <ContactSection />
        </Suspense>

        <footer className="border-t border-border-subtle py-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[11px] text-parchment/20 tracking-wider"
          >
            © {new Date().getFullYear()} Abhinav · Crafted with code and curiosity
          </motion.p>
        </footer>
      </main>
    </div>
  );
}

export default App;