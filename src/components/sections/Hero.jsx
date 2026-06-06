import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center px-6 pt-20 overflow-hidden">
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-4xl text-center">
        {/* Avatar placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mx-auto mb-8"
        >
          {/* TODO: Replace with actual photo when provided */}
          <div className="relative mx-auto w-28 h-28 rounded-full border-2 border-gold/40 bg-surface-raised flex items-center justify-center shadow-glow-gold overflow-hidden">
            <span className="font-display text-4xl text-gold">A</span>
            <div className="absolute inset-0 rounded-full border border-teal/20 animate-pulse-teal" />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-teal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Game Engine Developer · Software Engineer
        </motion.p>

        {/* Name with brush reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.1 }}
        >
          <motion.h1
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-parchment text-glow-gold leading-none tracking-tight"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            ABHINAV
          </motion.h1>
        </motion.div>

        {/* Brush divider */}
        <motion.div
          className="mx-auto mt-6 brush-divider"
          initial={{ width: 0 }}
          animate={{ width: '10rem' }}
          transition={{ delay: 1.0, duration: 1, ease: 'easeOut' }}
          style={{ height: 2 }}
        />

        {/* Professional suffixes */}
        <motion.p
          className="mt-5 font-mono text-[11px] tracking-[0.2em] text-gold/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          C++ Architect &nbsp;•&nbsp; Engine Artisan &nbsp;•&nbsp; Systems Designer
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mx-auto mt-6 max-w-xl font-body text-base md:text-lg leading-relaxed text-parchment/50"
        >
          Building digital worlds with precision code and creative vision.
          Specializing in engine architecture, game systems, and immersive experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <motion.button
            onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-3 font-mono text-xs uppercase tracking-widest text-teal transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 rounded border border-teal/30 bg-teal/5 transition-all duration-300 group-hover:bg-teal/20 group-hover:border-teal group-hover:shadow-glow-teal" />
            <span className="relative">Explore Skills</span>
          </motion.button>

          <motion.a
            href="#"
            className="group relative px-8 py-3 font-mono text-xs uppercase tracking-widest text-gold transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 rounded border border-gold/30 bg-gold/5 transition-all duration-300 group-hover:bg-gold/20 group-hover:border-gold group-hover:shadow-glow-gold" />
            <span className="relative">Download Resume</span>
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-10 flex justify-center gap-5"
        >
          {[
            { icon: Github, href: 'https://github.com/DarkFlame774', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/abhinav-3b695129b/', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:abhinavgarg1520@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="text-parchment/30 hover:text-teal transition-colors duration-300"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating decorative elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${15 + i * 14}%`,
            top: `${25 + Math.sin(i * 1.2) * 20}%`,
            width: 3 + (i % 3),
            height: 3 + (i % 3),
            backgroundColor: i % 2 === 0 ? 'rgba(34,211,238,0.2)' : 'rgba(212,165,116,0.15)',
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5 + i * 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.6,
          }}
        />
      ))}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-parchment/20"
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};