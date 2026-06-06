import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'experience', label: 'JOURNEY' },
  { id: 'achievements', label: 'HONORS' },
  { id: 'contact', label: 'CONTACT' },
];

export const Navbar = () => {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const observers = [];
    const ids = NAV_ITEMS.map((n) => n.id);

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    });

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-3 transition-all duration-500 border-b',
          scrolled ? 'border-border-subtle bg-surface/80 backdrop-blur-xl' : 'border-transparent'
        )}
      >
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-0.5 rounded-full border border-border-subtle bg-surface-raised/80 p-1 backdrop-blur-md">
          {NAV_ITEMS.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative px-4 py-2 font-mono text-[10px] tracking-[0.25em] text-parchment-dim transition-colors hover:text-parchment"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {active === item.id && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-teal/10 border border-teal/30"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={cn('relative z-10', active === item.id && 'text-teal')}>
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden w-full justify-between items-center">
          <span className="font-display text-sm text-parchment tracking-wider">ABHINAV</span>
          <motion.button
            onClick={() => setMobileOpen(true)}
            className="text-parchment-dim hover:text-teal p-2"
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={22} />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-surface/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <motion.button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 text-parchment-dim hover:text-teal"
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            <nav className="flex flex-col items-center gap-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={cn(
                    'font-display text-xl tracking-[0.3em] transition-colors',
                    active === item.id ? 'text-teal' : 'text-parchment-dim hover:text-parchment'
                  )}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};