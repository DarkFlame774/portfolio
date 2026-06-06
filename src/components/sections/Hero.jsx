import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState('/profile.png');
  const [ResumeSrc, setResumeSrc] = useState('/Abhinav_Resume.pdf');

  const handleImageError = () => {
    if (imageSrc === '/profile.png') {
      setImageSrc('/profile.jpg');
    } else {
      setImageError(true);
    }
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center px-6 pt-20 overflow-hidden">
      <motion.div style={{ y, opacity, willChange: 'transform, opacity' }} className="relative z-10 max-w-4xl text-center">
        {/* Avatar placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mx-auto mb-8"
        >
          <div className="relative mx-auto w-36 h-36 rounded-full border-2 border-gold/40 bg-surface-raised flex items-center justify-center shadow-glow-gold overflow-hidden group/avatar">
            {/* Nine Sols Solar Core Background (Shows through transparent images) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,165,116,0.25)_0%,rgba(220,38,38,0.1)_50%,transparent_75%)] pointer-events-none" />
            
            {/* Rotating Sacred Geometry (Taoist/Sol-Wheel) */}
            <svg 
              className="absolute w-5/6 h-5/6 text-gold/20 animate-spin-slow pointer-events-none" 
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor"
            >
              <circle cx="50" cy="50" r="45" strokeWidth="0.75" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="35" strokeWidth="1" />
              <circle cx="50" cy="50" r="22" strokeWidth="0.5" strokeDasharray="1 2" />
              {/* Trigram/Sun rays */}
              <path d="M 50 5 L 50 15 M 50 85 L 50 95 M 5 50 L 15 50 M 85 50 L 95 50" strokeWidth="1" />
              <path d="M 18 18 L 25 25 M 75 75 L 82 82 M 18 75 L 25 68 M 75 18 L 82 25" strokeWidth="1" />
            </svg>

            {!imageError ? (
              <>
                <img 
                  src={imageSrc} 
                  alt="Abhinav Profile" 
                  onError={handleImageError}
                  className="w-full h-full object-cover relative z-10 filter sepia-[0.25] saturate-[0.8] contrast-[1.1] brightness-[0.85] transition-all duration-500 group-hover/avatar:sepia-0 group-hover/avatar:saturate-100 group-hover/avatar:brightness-100"
                />
                {/* Holographic Taopunk overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gold/10 via-transparent to-teal/5 mix-blend-color pointer-events-none z-20 transition-opacity duration-500 group-hover/avatar:opacity-0" />
                {/* Subtle scanning line effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-40 group-hover/avatar:opacity-10 transition-opacity duration-500" />
              </>
            ) : (
              <span className="font-display text-4xl text-gold relative z-10">A</span>
            )}
            <div className="absolute inset-0 rounded-full border border-teal/20 animate-pulse-teal pointer-events-none z-30" />
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
            href={ResumeSrc} download = "Abhinav_Resume.pdf" blank = "_blank" rel = "noopener noreferrer"
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
            willChange: 'transform, opacity',
            transform: 'translateZ(0)'
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
          <ChevronDown size={30} />
        </motion.div>
      </motion.div>
    </section>
  );
};