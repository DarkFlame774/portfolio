import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Briefcase, GraduationCap, Trophy, Send, Mail, Phone, CheckCircle } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { SKILL_TREE_ROOT } from '../../data/skills';

/* ═══════════════════════════════════════════════════════════
   INK SPLASH SVG PATHS — various splash shapes
   ═══════════════════════════════════════════════════════════ */
const SPLASH_PATHS = [
  // Splash 1 — wide organic splatter
  "M 0 50 C 5 20, 25 5, 50 8 C 75 2, 90 15, 95 35 C 100 55, 92 78, 75 88 C 55 98, 30 95, 15 82 C 2 70, -5 65, 0 50 Z",
  // Splash 2 — rough ink blob
  "M 10 40 C 15 10, 40 0, 60 5 C 80 -2, 98 18, 95 42 C 100 60, 88 85, 65 92 C 40 100, 12 90, 5 70 C -3 55, 5 48, 10 40 Z",
  // Splash 3 — asymmetric splat
  "M 5 55 C 0 30, 20 8, 45 5 C 65 0, 85 12, 92 30 C 100 50, 95 72, 80 85 C 60 100, 35 95, 18 80 C 5 68, 8 62, 5 55 Z",
  // Splash 4 — elongated horizontal
  "M 2 45 C 0 25, 15 10, 35 8 C 55 3, 75 6, 88 18 C 100 30, 98 55, 90 70 C 78 88, 55 95, 35 90 C 15 85, 5 72, 2 45 Z",
];

/* ═══════════════════════════════════════════════════════════
   INK SPLASH CONTAINER — splashes ink behind content on hover
   ═══════════════════════════════════════════════════════════ */
const USER_INK_IMAGES = ['/user_splash1.png', '/user_splash2.png', '/user_splash3.png', '/user_splash4.png'];

const InkSplashWrap = ({ children, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [img1] = useState(() => USER_INK_IMAGES[Math.floor(Math.random() * USER_INK_IMAGES.length)]);
  const [img2] = useState(() => USER_INK_IMAGES[Math.floor(Math.random() * USER_INK_IMAGES.length)]);
  const [img3] = useState(() => USER_INK_IMAGES[Math.floor(Math.random() * USER_INK_IMAGES.length)]);
  const [rot1] = useState(() => Math.floor(Math.random() * 360));
  const [rot2] = useState(() => Math.floor(Math.random() * 360));
  const [flipX1] = useState(() => (Math.random() > 0.5 ? 1 : -1));
  const [flipY1] = useState(() => (Math.random() > 0.5 ? 1 : -1));
  const [flipX2] = useState(() => (Math.random() > 0.5 ? 1 : -1));
  const [flipY2] = useState(() => (Math.random() > 0.5 ? 1 : -1));

  useEffect(() => {
    if (!isHovered) return;
    const handleScroll = () => setIsHovered(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHovered]);

  return (
    <div className={`ink-splash-target relative bg-white transition-all duration-500 overflow-visible ${isHovered ? 'is-hovered z-0' : 'z-10'} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={() => !isHovered && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Organic ink splatters layered to create a dense core covering the entire section */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none overflow-visible"
        initial={false}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >

        {/* Layer 1: Dense core blot to ensure text readability */}
        <img src="/user_splash2.png" className="absolute top-1/2 left-[40%] w-[200vw] h-[200vh] md:w-[150vw] md:h-[150vh] max-w-none object-contain mix-blend-multiply opacity-100 filter grayscale contrast-[200%] brightness-[120%]" style={{ transform: `translate(-50%, -50%) scaleX(${flipX1}) scaleY(${flipY1})` }} alt="" />
        
        {/* Layer 2: Chaotic splatter for the edges */}
        <img src={img2} className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] md:w-[150vw] md:h-[150vh] max-w-none object-contain mix-blend-multiply opacity-100 filter grayscale contrast-[200%] brightness-[120%]" style={{ transform: `translate(-50%, -50%) rotate(${rot1}deg) scaleX(${flipX2})` }} alt="" />
        
        {/* Layer 3: Sweeping dynamic stroke */}
        <img src={img3} className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] md:w-[150vw] md:h-[150vh] max-w-none object-contain mix-blend-multiply opacity-90 filter grayscale contrast-[200%] brightness-[120%]" style={{ transform: `translate(-50%, -50%) rotate(${rot2}deg) scaleY(${flipY2})` }} alt="" />
      </motion.div>

      {/* Content on top */}
      <div className="relative z-10 transition-colors duration-300">
        {children}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   BACKGROUND BRUSH STROKES — bold visible strokes on white
   ═══════════════════════════════════════════════════════════ */
const BackgroundStrokes = () => (
  <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">

    {/* Horizontal sweep — top area */}
    <svg className="absolute" style={{ top: '8%', left: '-5%', width: '60%', height: '80px' }} viewBox="0 0 600 40" preserveAspectRatio="none">
      <path d="M 0 20 C 80 8, 160 32, 250 18 C 340 4, 420 28, 520 15 C 560 10, 590 18, 600 20"
        stroke="black" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.04" />
      <path d="M 20 25 C 100 35, 200 10, 300 22 C 380 30, 480 12, 580 25"
        stroke="black" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.03" />
    </svg>

    {/* Diagonal slash — right side */}
    <svg className="absolute" style={{ top: '18%', right: '-2%', width: '35%', height: '300px' }} viewBox="0 0 300 250" preserveAspectRatio="none">
      <path d="M 280 10 C 250 40, 200 100, 150 140 C 100 180, 60 210, 20 240"
        stroke="black" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.035" />
      {/* Ink droplets from the stroke */}
      <circle cx="40" cy="230" r="4" fill="black" opacity="0.03" />
      <circle cx="55" cy="235" r="2" fill="black" opacity="0.025" />
      <circle cx="25" cy="245" r="3" fill="black" opacity="0.02" />
    </svg>

    {/* Bold vertical stroke — left */}
    <svg className="absolute" style={{ top: '35%', left: '3%', width: '60px', height: '400px' }} viewBox="0 0 30 250" preserveAspectRatio="none">
      <path d="M 15 0 C 12 30, 18 60, 14 100 C 10 140, 16 180, 15 220 C 14 240, 15 250, 15 250"
        stroke="black" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.03" />
    </svg>

    {/* Wide horizontal sweep — mid section */}
    <svg className="absolute" style={{ top: '50%', left: '10%', width: '80%', height: '60px' }} viewBox="0 0 800 30" preserveAspectRatio="none">
      <path d="M 0 15 C 100 5, 200 25, 350 12 C 500 0, 600 22, 800 15"
        stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.025" />
    </svg>

    {/* Short aggressive strokes — scattered */}
    <svg className="absolute" style={{ top: '65%', right: '8%', width: '200px', height: '120px' }} viewBox="0 0 200 100">
      <path d="M 10 50 C 30 30, 70 70, 100 40 C 130 10, 170 60, 190 45"
        stroke="black" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.035" />
      <path d="M 30 70 C 60 55, 90 85, 130 65"
        stroke="black" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.025" />
    </svg>

    {/* Diagonal slash — bottom left */}
    <svg className="absolute" style={{ top: '75%', left: '5%', width: '40%', height: '250px' }} viewBox="0 0 400 200" preserveAspectRatio="none">
      <path d="M 10 190 C 60 150, 140 100, 220 70 C 300 40, 350 20, 390 10"
        stroke="black" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.03" />
    </svg>

    {/* Vertical drip marks — right side bottom */}
    <svg className="absolute" style={{ top: '82%', right: '15%', width: '30px', height: '200px' }} viewBox="0 0 20 150">
      <path d="M 10 0 L 10 80" stroke="black" strokeWidth="2" strokeLinecap="round" opacity="0.04" />
      <circle cx="10" cy="85" r="3" fill="black" opacity="0.04" />
      <path d="M 10 95 L 10 130" stroke="black" strokeWidth="1.5" strokeLinecap="round" opacity="0.03" />
      <circle cx="10" cy="135" r="2" fill="black" opacity="0.03" />
    </svg>

    {/* Ink splash spots — scattered across page */}
    {[
      { x: '75%', y: '12%', size: 60, opacity: 0.03 },
      { x: '20%', y: '28%', size: 45, opacity: 0.025 },
      { x: '85%', y: '42%', size: 50, opacity: 0.02 },
      { x: '10%', y: '58%', size: 55, opacity: 0.03 },
      { x: '65%', y: '72%', size: 40, opacity: 0.025 },
      { x: '90%', y: '88%', size: 50, opacity: 0.02 },
    ].map((spot, i) => (
      <svg key={i} className="absolute" style={{ left: spot.x, top: spot.y, width: spot.size, height: spot.size }} viewBox="0 0 100 100">
        <path d={SPLASH_PATHS[i % SPLASH_PATHS.length]} fill="black" opacity={spot.opacity} />
      </svg>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   ANIMATED INK SPLASHES — periodic splash animations
   in empty background areas
   ═══════════════════════════════════════════════════════════ */
const AnimatedSplashes = () => {
  const [splashes, setSplashes] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const spawn = () => {
      const id = ++idRef.current;
      const splash = {
        id,
        x: 10 + Math.random() * 80,
        y: 5 + Math.random() * 90,
        size: 40 + Math.random() * 80,
        path: SPLASH_PATHS[Math.floor(Math.random() * SPLASH_PATHS.length)],
        rotation: Math.random() * 360,
        opacity: 0.02 + Math.random() * 0.03,
      };
      setSplashes(prev => [...prev.slice(-6), splash]);

      // Remove after animation
      setTimeout(() => {
        setSplashes(prev => prev.filter(s => s.id !== id));
      }, 4000);
    };

    // Initial burst
    for (let i = 0; i < 3; i++) setTimeout(spawn, i * 800);

    const interval = setInterval(spawn, 2500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
      <AnimatePresence>
        {splashes.map(s => (
          <motion.div
            key={s.id}
            className="absolute flex items-center justify-center mix-blend-multiply"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              transform: `rotate(${s.rotation}deg)`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: s.opacity * 2.5, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{
              opacity: { duration: 0.8, ease: 'easeOut' },
              scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <img src={USER_INK_IMAGES[s.id % USER_INK_IMAGES.length]} className="w-full h-full object-contain filter grayscale contrast-[200%] brightness-[120%]" alt="splash" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

/* ── Floating Ink Specks ── */
const InkSpecks = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h;
    const resize = () => {
      if (!canvasRef.current) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Speck {
      constructor() { this.reset(); this.y = Math.random() * h; }
      reset() {
        this.x = Math.random() * w;
        this.y = -5;
        this.size = Math.random() * 1.8 + 0.3;
        this.vx = Math.random() * 0.3 - 0.15;
        this.vy = Math.random() * 0.25 + 0.08;
        this.opacity = Math.random() * 0.3 + 0.08;
        this.drift = Math.random() * 100;
      }
      update() {
        this.x += this.vx + Math.sin((this.y + this.drift) / 80) * 0.08;
        this.y += this.vy;
        if (this.y > h || this.x < -10 || this.x > w + 10) this.reset();
      }
      draw() {
        ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const specks = Array.from({ length: 25 }, () => new Speck());
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      specks.forEach(s => { s.update(); s.draw(); });
      animId = requestAnimationFrame(render);
    };
    render();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[3]" />;
};

/* ── Red Seal ── */
const RedSeal = ({ char = '印', size = 'md', className = '' }) => {
  const s = { sm: 'w-7 h-7 text-[7px]', md: 'w-9 h-9 text-[9px]', lg: 'w-12 h-12 text-sm' };
  return (
    <div className={`${s[size]} border-[1.5px] border-black/20 flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ borderRadius: '2px', transform: 'rotate(5deg)' }}>
      <span className="text-black/20 font-bold" style={{ fontFamily: "'Noto Serif JP', serif" }}>{char}</span>
    </div>
  );
};

/* ── Animated Brush Stroke Divider ── */
const BrushStroke = ({ width = 200, delay = 0, className = '' }) => (
  <motion.svg width={width} height="8" viewBox={`0 0 ${width} 8`} className={className}
    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
    <motion.path
      d={`M 2 4 C ${width * 0.15} 1, ${width * 0.3} 7, ${width * 0.5} 3 C ${width * 0.7} -1, ${width * 0.85} 6, ${width - 2} 4`}
      stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0.3 }}
      whileInView={{ pathLength: 1, opacity: 0.25 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay, ease: 'easeInOut' }}
    />
  </motion.svg>
);

/* ═══════════════════════════════════════════════════════════
   NAVIGATION & FOOTER
   ═══════════════════════════════════════════════════════════ */
const SamuraiNavbar = () => {
  const navLinks = [
    { name: 'Home', href: '#hero', kanji: '始' },
    { name: 'Journey', href: '#about', kanji: '旅' },
    { name: 'Quests', href: '#projects', kanji: '任' },
    { name: 'Arts', href: '#skills', kanji: '技' },
    { name: 'Chronicle', href: '#experience', kanji: '歴' },
    { name: 'Connect', href: '#contact', kanji: '文' },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="bg-white/90 backdrop-blur-md border border-black/15 shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-6 py-3 rounded-full flex items-center gap-6 md:gap-10 pointer-events-auto"
      >
        <a href="#hero" className="font-bold text-lg md:text-xl tracking-[0.2em] text-black pr-4 border-r border-black/10" style={{ fontFamily: "'Cinzel', serif" }}>
          AG.
        </a>
        <div className="flex gap-5 md:gap-8 items-center">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="group relative flex flex-col items-center hover:-translate-y-1 transition-transform duration-300">
              <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-black/60 group-hover:text-black transition-colors duration-300">
                {link.name}
              </span>
              <span className="absolute -bottom-4 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-black" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                {link.kanji}
              </span>
            </a>
          ))}
        </div>
      </motion.nav>
    </div>
  );
};

const SamuraiFooter = () => (
  <footer className="relative z-10 border-t border-black/[0.08] py-12 mt-20">
    <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
      <RedSeal char="完" size="sm" className="mb-6 opacity-50" />
      <p className="ink-heading text-lg font-bold tracking-widest mb-2">ABHINAV GARG</p>
      <p className="ink-label text-[6px] tracking-[0.4em] opacity-60 mb-6">Software Engineer · Warrior of Code</p>
      <div className="flex gap-6 mb-8">
        <a href="https://github.com/DarkFlame774" target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black transition-colors">
          <Github size={16} />
        </a>
        <a href="mailto:abhinavgarg1520@gmail.com" className="text-black/40 hover:text-black transition-colors">
          <Mail size={16} />
        </a>
      </div>
      <p className="font-mono text-[8px] text-black/30 tracking-widest uppercase">
        © {new Date().getFullYear()} · The way of the warrior is resolute.
      </p>
    </div>
  </footer>
);


/* ═══════════════════════════════════════════════════════════
   MAIN LAYOUT
   ═══════════════════════════════════════════════════════════ */
export const SamuraiLayout = () => {
  const [swordHovered, setSwordHovered] = useState(false);
  const [activeQuest, setActiveQuest] = useState(PROJECTS[0]?.id || null);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState(SKILL_TREE_ROOT.children[0]?.id || null);
  const [selectedSubSkill, setSelectedSubSkill] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const skillCategories = SKILL_TREE_ROOT.children;
  const currentCategory = skillCategories.find(c => c.id === selectedSkillCategory);

  useEffect(() => {
    if (currentCategory && currentCategory.children) {
      setSelectedSubSkill(currentCategory.children[0]);
    }
  }, [selectedSkillCategory]);

  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden select-none">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;600;700;900&display=swap');
        .ink-heading { font-family: 'Cinzel', 'Noto Serif JP', serif; letter-spacing: 0.15em; color: #000; transition: color 0.3s, text-shadow 0.3s; }
        .ink-body { font-family: 'Noto Serif', 'Noto Serif JP', serif; color: #1a1a1a; line-height: 1.9; transition: color 0.3s, text-shadow 0.3s; }
        .ink-label { font-family: 'JetBrains Mono', monospace; letter-spacing: 0.35em; color: #888; font-size: 7px; text-transform: uppercase; transition: color 0.3s, text-shadow 0.3s; }
        
        /* Hover state inversions with text shadow to ensure organic readability */
        .is-hovered .ink-heading { color: #ffffff !important; text-shadow: 0 0 12px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.8); }
        .is-hovered .ink-body { color: #f0f0f0 !important; text-shadow: 0 0 10px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,0.8); }
        .is-hovered .ink-label { color: #dddddd !important; text-shadow: 0 0 8px rgba(0,0,0,0.9); }
        .is-hovered .text-black { color: #ffffff !important; text-shadow: 0 0 8px rgba(0,0,0,0.8); }
        .is-hovered .text-black\\/60 { color: rgba(255,255,255,0.9) !important; text-shadow: 0 0 8px rgba(0,0,0,0.8); }
        .is-hovered .text-black\\/50 { color: rgba(255,255,255,0.8) !important; text-shadow: 0 0 8px rgba(0,0,0,0.8); }
        .is-hovered .text-black\\/40 { color: rgba(255,255,255,0.7) !important; text-shadow: 0 0 8px rgba(0,0,0,0.8); }
        .is-hovered .bg-black\\/\\[0\\.03\\] { background-color: rgba(255,255,255,0.1) !important; }
        .is-hovered .bg-black\\/\\[0\\.04\\] { background-color: rgba(255,255,255,0.15) !important; }
        .is-hovered .border-black\\/\\[0\\.06\\] { border-color: rgba(255,255,255,0.2) !important; }
        .is-hovered .border-black\\/\\[0\\.08\\] { border-color: rgba(255,255,255,0.3) !important; }
        .is-hovered .bg-black\\/\\[0\\.06\\] { background-color: rgba(255,255,255,0.2) !important; }
        .is-hovered .bg-white { background-color: transparent !important; border-color: rgba(255,255,255,0.4) !important; color: #fff !important; }
        .is-hovered .border-black\\/10 { border-color: rgba(255,255,255,0.4) !important; }
        .is-hovered .text-black\\/30 { color: rgba(255,255,255,0.6) !important; text-shadow: 0 0 6px rgba(0,0,0,0.8); }
        .is-hovered .border-black\\/20 { border-color: rgba(255,255,255,0.5) !important; }
        .is-hovered button { color: #ffffff !important; border-color: rgba(255,255,255,0.5) !important; text-shadow: 0 0 4px rgba(0,0,0,0.8); }
        .is-hovered input { color: #ffffff !important; text-shadow: 0 0 4px rgba(0,0,0,0.8); }
        .is-hovered input::placeholder { color: rgba(255,255,255,0.5) !important; text-shadow: none; }
        .is-hovered textarea { color: #ffffff !important; text-shadow: 0 0 4px rgba(0,0,0,0.8); }
        .is-hovered textarea::placeholder { color: rgba(255,255,255,0.5) !important; text-shadow: none; }
        .is-hovered path[fill="black"] { fill: #ffffff !important; filter: drop-shadow(0 0 4px rgba(0,0,0,0.8)); }
        .is-hovered path[stroke="black"] { stroke: #ffffff !important; filter: drop-shadow(0 0 4px rgba(0,0,0,0.8)); }
        .is-hovered path[stroke="currentColor"] { stroke: #ffffff !important; }
      `}</style>

      {/* ── NAVBAR ── */}
      <SamuraiNavbar />

      {/* ── BACKGROUND BRUSH STROKES ── */}
      <BackgroundStrokes />

      {/* ── ANIMATED INK SPLASHES ── */}
      <AnimatedSplashes />

      {/* ── FLOATING INK SPECKS ── */}
      <InkSpecks />


      {/* ══════════════════════════════════════════
          HERO
          ══════════════════════════════════════════ */}
      <section id="hero" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 md:pt-32 pb-16">

        {/* Giant kanji watermark */}
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 0.03 }} transition={{ duration: 3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] text-[24rem] md:text-[36rem] pointer-events-none select-none leading-none"
          style={{ fontFamily: "'Noto Serif JP', serif", color: '#000' }}>
          武
        </motion.span>

        <div className="relative z-10 text-center max-w-3xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5 }}
            className="ink-label mb-8 tracking-[0.7em]">
            武士道 · BUSHIDŌ
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="ink-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-12">
            THE WAY
            <br /><span className="text-6xl md:text-8xl lg:text-9xl">OF THE</span>
            <br />WARRIOR
          </motion.h1>

          {/* Hanging Painting Profile */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="mb-14 relative group inline-block"
          >
            {/* Big Realistic Ink Splash Behind Painting */}
            <div className="absolute inset-0 z-[-1] flex items-center justify-center pointer-events-none mix-blend-multiply opacity-100">
              <img src="/user_splash2.png" className="absolute w-[200%] h-[200%] max-w-none object-contain -translate-y-4 filter grayscale contrast-[200%] brightness-[120%]" alt="splash" />
            </div>

            {/* Scroll hanging string */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-8 border-t-2 border-black/30 rounded-t-full pointer-events-none" />
            
            {/* Scroll frame */}
            <div className="relative p-3 bg-[#fdfdfd] border border-black/20 shadow-xl w-48 h-64 md:w-56 md:h-72 mx-auto transform transition-transform duration-700 hover:scale-[1.02]">
              {/* Wooden rod top */}
              <div className="absolute -top-1 -left-2 -right-2 h-3 bg-[#111] rounded-sm shadow-md" />
              
              {/* Inner border */}
              <div className="w-full h-full border border-black/15 p-1 bg-white">
                <img 
                  src="/profile.png" 
                  alt="Warrior Profile" 
                  className="w-full h-full object-cover grayscale contrast-[1.1] brightness-[0.95]"
                  onError={(e) => { e.target.src = '/profile.jpg'; }}
                />
              </div>

              {/* Wooden rod bottom */}
              <div className="absolute -bottom-1 -left-3 -right-3 h-4 bg-[#111] rounded-sm shadow-md flex justify-between items-center px-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#333]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#333]" />
              </div>
              
              {/* Seal on the painting */}
              <RedSeal char="我" size="sm" className="absolute bottom-5 right-4 opacity-90 mix-blend-multiply" />
            </div>
          </motion.div>

          {/* Katana */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 1.2 }}
            className="my-6 flex justify-center flex-col items-center">
            <div className="relative cursor-pointer"
              onMouseEnter={() => setSwordHovered(true)} onMouseLeave={() => setSwordHovered(false)}>
              <svg className={`w-72 md:w-96 h-12 transition-all duration-700 ${swordHovered ? 'scale-[1.04] -translate-y-1' : 'opacity-50'}`}
                viewBox="0 0 400 50" fill="none">
                <path d="M 130 42 L 133 30 L 140 30 L 143 42 Z" fill="black" opacity="0.5" />
                <path d="M 258 42 L 261 30 L 268 30 L 271 42 Z" fill="black" opacity="0.5" />
                <path d="M 115 42 L 285 42" stroke="black" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                <rect x="60" y="24" width="50" height="6" rx="2" fill="black" opacity="0.35" />
                <path d="M 65 24 L 65 30 M 72 24 L 72 30 M 79 24 L 79 30 M 86 24 L 86 30 M 93 24 L 93 30" stroke="black" strokeWidth="0.6" opacity="0.3" />
                <ellipse cx="110" cy="27" rx="3" ry="8" fill="black" opacity="0.4" />
                <path d="M 113 25 C 160 23, 260 21, 345 21 L 344 25 C 260 25, 160 27, 113 29 Z" fill="rgba(0,0,0,0.15)" stroke="rgba(0,0,0,0.25)" strokeWidth="0.5" />
              </svg>
            </div>
            <p className="mt-4 ink-label text-[6px] tracking-[0.5em] transition-all duration-500">
              {swordHovered ? '鋼の冷たき輝き — THE STEEL GLEAMS' : 'HOVER TO UNSHEATH'}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }} className="mt-16">
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2">
              <span className="ink-label text-[6px] tracking-[0.6em]">SCROLL</span>
              <div className="w-[1px] h-10 bg-gradient-to-b from-black/20 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          ABOUT — ink splashes behind on hover
          ══════════════════════════════════════════ */}
      <section id="about" className="relative z-10 max-w-3xl mx-auto px-6 py-28">
        <InkSplashWrap>
          <div className="relative p-8 md:p-12">
            <RedSeal char="道" size="lg" className="absolute top-0 right-0" />
            <p className="ink-label mb-4">Journey Log · 旅の記録</p>
            <h2 className="ink-heading text-2xl md:text-4xl font-bold mb-3">ABOUT THE WARRIOR</h2>
            <BrushStroke width={120} delay={0.2} className="mb-10" />
            <p className="ink-body text-sm md:text-base max-w-2xl">
              Like a nameless Shinobi carving their own path through the Ashina lands,
              I approach software engineering with absolute discipline and strategic design.
              I combine a deep low-level command of C++ and Unity game architectures with
              full-stack capabilities, forging digital frameworks that are optimized, modular,
              and built to withstand any battle.
            </p>
          </div>
        </InkSplashWrap>
      </section>

      <BrushStroke width={300} className="mx-auto" />


      {/* ══════════════════════════════════════════
          QUEST LOG — Projects
          ══════════════════════════════════════════ */}
      <section id="projects" className="relative z-10 max-w-5xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <p className="ink-label mb-4">Battle Objectives · 戦闘目標</p>
          <h2 className="ink-heading text-2xl md:text-4xl font-bold">QUEST LOG</h2>
          <BrushStroke width={160} delay={0.2} className="mx-auto mt-4" />
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 flex flex-col gap-1 relative z-20 bg-white/60 backdrop-blur-md self-start p-3 rounded-2xl">
              {PROJECTS.map((project) => {
                const isActive = activeQuest === project.id;
                return (
                  <button key={project.id} onClick={() => setActiveQuest(project.id)}
                    className={`w-full text-left px-5 py-4 transition-all duration-300 relative ${
                      isActive ? 'bg-black/[0.04] border border-black/[0.08]' : 'hover:bg-black/[0.02]'
                    }`}>
                    {isActive && <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-black/30" />}
                    <span className={`block ink-label text-[6px] mb-1 ${isActive ? 'text-black' : ''}`}>{project.language}</span>
                    <span className="ink-heading font-bold text-sm block">{project.title}</span>
                  </button>
                );
              })}
          </div>

          {/* Quest detail — splashes on hover */}
          <InkSplashWrap className="w-full md:w-2/3">
            <div className="p-8 relative min-h-[340px] z-10">
              <RedSeal char="任" size="sm" className="absolute top-2 right-2" />
              {PROJECTS.map((project) => {
                if (project.id !== activeQuest) return null;
                return (
                  <motion.div key={project.id}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <span className="ink-label text-[6px] block mb-1">Quest · {project.status}</span>
                          <h3 className="ink-heading text-xl md:text-2xl font-bold">{project.title}</h3>
                          <span className="ink-body italic text-xs opacity-50 block mt-1">"{project.subtitle}"</span>
                        </div>
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="p-2 hover:bg-black/5 text-black/40 hover:text-black transition-colors">
                            <Github size={15} />
                          </a>
                        )}
                      </div>
                      <div className="w-full h-[1px] bg-black/[0.06] mb-6" />
                      <p className="ink-body text-sm mb-6">{project.description}</p>
                      <div className="mb-6">
                        <p className="ink-label text-[6px] mb-3">Highlights</p>
                        <ul className="space-y-2 ink-body text-xs pl-4">
                          {project.highlights.map((h, idx) => (
                            <li key={idx} className="relative pl-3 before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-1.5 before:h-[1px] before:bg-black/30">
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-black/[0.05]">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="ink-label text-[6px] tracking-[0.15em] bg-black/[0.03] border border-black/[0.06] px-2.5 py-1">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </InkSplashWrap>
        </div>
      </section>

      <BrushStroke width={300} className="mx-auto" />


      {/* ══════════════════════════════════════════
          SKILL SCROLLS
          ══════════════════════════════════════════ */}
      <section id="skills" className="relative z-10 max-w-5xl mx-auto px-6 py-28">
        <div className="text-center mb-14">
          <p className="ink-label mb-4">Combat Arts · 武技</p>
          <h2 className="ink-heading text-2xl md:text-4xl font-bold">ESOTERIC SKILL SCROLLS</h2>
          <BrushStroke width={160} delay={0.2} className="mx-auto mt-4" />
        </div>

        <div className="flex justify-center gap-1 md:gap-2 mb-10 flex-wrap">
          {skillCategories.map((cat) => {
            const isSelected = selectedSkillCategory === cat.id;
            return (
              <button key={cat.id} onClick={() => setSelectedSkillCategory(cat.id)}
                className={`px-4 py-2.5 ink-label text-[7px] tracking-[0.2em] transition-all duration-300 relative ${
                  isSelected ? 'text-black font-bold' : 'text-black/30 hover:text-black/60'
                }`}>
                {cat.label}
                {isSelected && (
                  <motion.div layoutId="skill-tab-ink" className="absolute bottom-0 left-2 right-2 h-[2px] bg-black/30" />
                )}
              </button>
            );
          })}
        </div>

        {currentCategory && (
          <InkSplashWrap>
            <div className="p-6 md:p-10 relative">
              <RedSeal char="極" className="absolute right-5 top-5" />
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex items-center justify-around w-full lg:w-2/3 py-8 relative">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                    <line x1="15%" y1="50%" x2="85%" y2="50%" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" strokeDasharray="8 6" />
                  </svg>
                  {currentCategory.children.map((sub, idx) => {
                    const isSelected = selectedSubSkill?.id === sub.id;
                    return (
                      <div key={sub.id} className="flex flex-col items-center z-10 relative">
                        <motion.button onClick={() => setSelectedSubSkill(sub)}
                          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                          className={`w-14 h-14 rounded-full flex items-center justify-center relative transition-all duration-300 ${
                            isSelected ? 'bg-black text-white shadow-xl' : 'bg-white border-2 border-black/10 text-black/40 hover:border-black/25'
                          }`}>
                          <span className="font-bold text-base" style={{ fontFamily: "'Noto Serif JP', serif" }}>{idx + 1}</span>
                          {isSelected && <span className="absolute -inset-2 rounded-full border border-black/10" />}
                        </motion.button>
                        <span className="mt-3 ink-label text-[6px] tracking-[0.15em] text-center block max-w-[80px]">{sub.label}</span>
                      </div>
                    );
                  })}
                </div>

                <InkSplashWrap className="w-full lg:w-1/3">
                  <div className="p-6 min-h-[180px]">
                    {selectedSubSkill ? (
                      <AnimatePresence mode="wait">
                        <motion.div key={selectedSubSkill.id}
                          initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.3 }}>
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="ink-heading font-bold text-base">{selectedSubSkill.label}</h4>
                            <span className="ink-label text-[6px] bg-black/[0.04] border border-black/10 px-2 py-0.5">
                              {selectedSubSkill.proficiency}
                            </span>
                          </div>
                          <p className="ink-body text-xs mb-4">{selectedSubSkill.desc}</p>
                          {selectedSubSkill.usedIn && (
                            <div className="border-t border-black/[0.05] pt-3">
                              <span className="ink-label text-[5px] block mb-1">Used In:</span>
                              <span className="ink-body text-[10px] opacity-60">{selectedSubSkill.usedIn}</span>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    ) : (
                      <div className="flex items-center justify-center h-full ink-label">SELECT TECHNIQUE</div>
                    )}
                  </div>
                </InkSplashWrap>
              </div>
            </div>
          </InkSplashWrap>
        )}
      </section>

      <BrushStroke width={300} className="mx-auto" />


      {/* ══════════════════════════════════════════
          CHRONICLE — Timeline
          ══════════════════════════════════════════ */}
      <section id="experience" className="relative z-10 max-w-3xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <p className="ink-label mb-4">The Legend · 年代記</p>
          <h2 className="ink-heading text-2xl md:text-4xl font-bold">CHRONICLE</h2>
          <BrushStroke width={160} delay={0.2} className="mx-auto mt-4" />
        </div>

        <div className="relative space-y-16 pl-10 md:pl-0">
          <div className="absolute left-[18px] top-0 bottom-0 w-[1px] md:left-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.1) 90%, transparent 100%)' }} />

          {[
            { year: '2024 – Present', title: 'Core Team Member', org: 'Google Developer Groups on Campus MM(DU)', type: 'activity',
              desc: "Organizing Google's GDGoC events, speaking at 3 sessions, mentoring juniors in Game Dev & AR, and participating in 12+ hackathons." },
            { year: '2023 – Present', title: 'B.Tech in Computer Science', org: 'Maharishi Markandeshwar University, Ambala', type: 'edu',
              desc: 'Cumulative GPA: 8.56/10. Coursework in Software Engineering, Operating Systems, Data Structures, Databases.' },
            { year: '2023', title: 'Class XII — 86.67%', org: 'Ram Prasad DAV Sr. Sec. School', type: 'edu',
              desc: 'Completed senior secondary education with strong academic performance.' },
          ].map((item, index) => (
            <motion.div key={index}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: index * 0.15 }}
              className={`relative flex items-start gap-8 md:gap-14 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1 md:text-center">
                <InkSplashWrap>
                  <div className={`p-5 md:p-6 text-left inline-block max-w-md ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <span className="ink-label text-[6px] block mb-1.5 text-black/60">{item.year}</span>
                    <h3 className="ink-heading text-base md:text-lg font-bold">{item.title}</h3>
                    <p className="ink-body text-[11px] italic opacity-40 mt-0.5">{item.org}</p>
                    <p className="ink-body text-xs mt-3">{item.desc}</p>
                  </div>
                </InkSplashWrap>
              </div>
              <div className="absolute left-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-white border-2 border-black/10 text-black/40 md:left-1/2">
                {item.type === 'activity' ? <Briefcase size={12} /> : <GraduationCap size={12} />}
              </div>
              <div className="hidden flex-1 md:block" />
            </motion.div>
          ))}
        </div>
      </section>

      <BrushStroke width={300} className="mx-auto" />


      {/* ══════════════════════════════════════════
          HONORS
          ══════════════════════════════════════════ */}
      <section id="achievements" className="relative z-10 max-w-5xl mx-auto px-6 py-28">
        <div className="text-center mb-14">
          <p className="ink-label mb-4">Distinctions · 栄誉</p>
          <h2 className="ink-heading text-2xl md:text-4xl font-bold">HONORS</h2>
          <BrushStroke width={160} delay={0.2} className="mx-auto mt-4" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            { title: 'TOP 30 Finalist', org: 'International 3rd Ideathon by MODA (Taiwan)', desc: 'Competed internationally and reached the top 30 out of global participants.', seal: '勝' },
            { title: 'Hack2Change Finalist', org: 'National Hackathon', desc: 'Built an impactful solution advancing to the finals.', seal: '闘' },
            { title: '15+ Skill Badges', org: 'Google Cloud Skills Platform', desc: 'GCP Foundations and Infrastructure in Google Cloud certifications.', seal: '雲' },
            { title: 'Ethical Hacking', org: 'Internshala — 2 Month Course', desc: 'Web and network vulnerabilities, secure development practices.', seal: '隠' },
          ].map((ach, idx) => (
            <motion.div key={idx}
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
              <InkSplashWrap>
                <div className="p-6 relative flex gap-4 items-start group">
                  <RedSeal char={ach.seal} size="sm" className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white border-2 border-black/10 text-black/40">
                    <Trophy size={14} />
                  </div>
                  <div>
                    <h3 className="ink-heading text-base font-bold">{ach.title}</h3>
                    <p className="ink-label text-[6px] tracking-[0.15em] mt-0.5">{ach.org}</p>
                    <p className="ink-body text-xs mt-2.5">{ach.desc}</p>
                  </div>
                </div>
              </InkSplashWrap>
            </motion.div>
          ))}
        </div>
      </section>

      <BrushStroke width={300} className="mx-auto" />


      {/* ══════════════════════════════════════════
          CONTACT
          ══════════════════════════════════════════ */}
      <section id="contact" className="relative z-10 max-w-4xl mx-auto px-6 py-28 pb-32">
        <div className="text-center mb-14">
          <p className="ink-label mb-4">Messenger · 使者</p>
          <h2 className="ink-heading text-2xl md:text-4xl font-bold">CONNECT</h2>
          <BrushStroke width={160} delay={0.2} className="mx-auto mt-4" />
        </div>

        <InkSplashWrap>
          <div className="p-8 md:p-12 relative">
            <RedSeal char="書" size="lg" className="absolute top-4 right-4" />
            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex flex-col justify-between">
                <div>
                  <p className="ink-body text-sm mb-8">
                    Let's create something remarkable together. Whether it's a game engine, a creative
                    project, or just a conversation about code.
                  </p>
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-black/10 text-black/40"><Mail size={13} /></div>
                      <div>
                        <p className="ink-label text-[5px]">Email</p>
                        <a href="mailto:abhinavgarg1520@gmail.com" className="ink-body text-xs hover:underline">abhinavgarg1520@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-black/10 text-black/40"><Phone size={13} /></div>
                      <div>
                        <p className="ink-label text-[5px]">Phone</p>
                        <a href="tel:+919499417601" className="ink-body text-xs hover:underline">+91 94994-17601</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-black/[0.05] flex gap-3">
                  <a href="https://github.com/DarkFlame774" target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 border border-black/10 ink-label text-[6px] tracking-[0.15em] text-black/50 hover:bg-black/[0.03] hover:text-black transition-all flex items-center gap-1.5">
                    <Github size={11} /> GITHUB
                  </a>
                </div>
              </div>

              <div>
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div key="success" className="flex flex-col items-center justify-center h-full text-center py-6"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-black/10 text-black/40"><CheckCircle size={22} /></div>
                      <p className="ink-heading text-base font-bold">Message Dispatched</p>
                      <p className="ink-body text-xs mt-1 opacity-50">The messenger has departed.</p>
                      <button className="mt-5 ink-label text-[7px] text-black hover:underline" onClick={() => setSubmitted(false)}>Send Another →</button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" className="space-y-6"
                      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div>
                        <label className="ink-label text-[5px] block mb-2">Your Name</label>
                        <input type="text" required className="w-full bg-transparent border-b border-black/10 focus:border-black/30 pb-2 ink-body text-xs outline-none transition-colors placeholder:text-black/20" placeholder="E.g., Jin Sakai" />
                      </div>
                      <div>
                        <label className="ink-label text-[5px] block mb-2">Your Email</label>
                        <input type="email" required className="w-full bg-transparent border-b border-black/10 focus:border-black/30 pb-2 ink-body text-xs outline-none transition-colors placeholder:text-black/20" placeholder="your@email.com" />
                      </div>
                      <div>
                        <label className="ink-label text-[5px] block mb-2">Your Message</label>
                        <textarea required rows={3} className="w-full bg-transparent border-b border-black/10 focus:border-black/30 pb-2 ink-body text-xs outline-none transition-colors resize-none placeholder:text-black/20" placeholder="Write your scroll here..." />
                      </div>
                      <button type="submit" className="flex items-center gap-2 bg-black px-6 py-2.5 ink-label text-[7px] tracking-[0.2em] text-white hover:bg-black/80 transition-all">
                        <Send size={11} /> Dispatch Messenger
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </InkSplashWrap>
      </section>

      {/* ── FOOTER ── */}
      <SamuraiFooter />
    </div>
  );
};
