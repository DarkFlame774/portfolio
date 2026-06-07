import { motion, AnimatePresence } from 'framer-motion';

export const InkCanvasTransition = ({ isAnimating, direction }) => {
  const isToSamurai = direction === 'to-samurai';

  return (
    <>
      <style>{`
        @keyframes cyber-static-flicker {
          0%, 100% { opacity: 0; transform: translate3d(0,0,0); }
          15% { opacity: 0.12; transform: translate3d(2px, -1px, 0); }
          30% { opacity: 0.35; transform: translate3d(-2px, 2px, 0) scaleY(1.01); }
          45% { opacity: 0.70; transform: translate3d(1px, -2px, 0) skewX(1deg); }
          50% { opacity: 0.95; transform: translate3d(0, 0, 0) scale(1.02); }
          55% { opacity: 0.80; transform: translate3d(-1px, 1px, 0) skewX(-0.5deg); }
          70% { opacity: 0.40; transform: translate3d(2px, -1px, 0); }
          85% { opacity: 0.15; transform: translate3d(-1px, 0, 0); }
        }
        @keyframes electric-glow-flicker {
          0%, 100% { opacity: 0; filter: drop-shadow(0 0 0px rgba(34,211,238,0)); }
          10%, 90% { opacity: 0.7; filter: drop-shadow(0 0 8px rgba(34,211,238,0.7)); }
          30%, 70% { opacity: 0.15; filter: drop-shadow(0 0 2px rgba(212,165,116,0.2)); }
          50% { opacity: 0.95; filter: drop-shadow(0 0 16px #22d3ee) drop-shadow(0 0 6px #d4a574); }
        }
        .cyber-static-layer {
          background-image: 
            radial-gradient(circle, transparent 20%, #050510 80%),
            url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzIiBoZWlnaHQ9IjMiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMyMmQzZWUiIG9wYWNpdHk9IjAuMjUiLz48cmVjdCB4PSIyIiB5PSIxIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZDRhNTc0IiBvcGFjaXR5PSIwLjI1Ii8+PC9zdmc+");
          background-size: auto, 6px 6px;
          will-change: transform, opacity;
          transform: translateZ(0);
        }
        .gpu-accelerated {
          will-change: transform, opacity;
          transform: translate3d(0,0,0);
          backface-visibility: hidden;
        }
      `}</style>

      {/* Hidden SVG defining lightweight filters */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="ink-ripple-blur" x="-20%" y="-20%" width="140%" height="140%">
            {/* Extremely lightweight blur for edges without rendering lag */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>
      </svg>

      <AnimatePresence>
        {isAnimating && (
          <div className="fixed inset-0 z-[95] pointer-events-none flex items-center justify-center h-screen w-screen overflow-hidden bg-transparent">
            {isToSamurai ? (
              /* =========================================================
                 TO SAMURAI MODE: Black Ink Drop & Ripples
                 ========================================================= */
              <>
                {/* Expanding solid ink drop (Irregular vector path for performance) */}
                <motion.svg
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 0.4, 8],
                    opacity: [0, 1, 1] 
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  transition={{
                    duration: 1.1,
                    times: [0, 0.15, 1],
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  viewBox="0 0 100 100"
                  className="absolute w-[50vh] h-[50vh] fill-black gpu-accelerated"
                  style={{ filter: 'url(#ink-ripple-blur)' }}
                >
                  {/* Irregular ink splatter vector path */}
                  <path d="M 50 8 C 58 10, 68 3, 76 10 C 85 18, 92 28, 91 38 C 90 48, 98 56, 94 66 C 90 76, 84 86, 74 91 C 64 96, 52 90, 42 92 C 32 94, 20 98, 12 90 C 4 82, 9 70, 7 60 C 5 50, 1 40, 5 30 C 9 20, 16 12, 26 8 C 36 4, 42 6, 50 8 Z" />
                </motion.svg>

                {/* Ripple Wave 1 */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 3.5,
                    opacity: [0, 0.6, 0] 
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.08,
                    ease: "easeOut",
                  }}
                  className="rounded-full border-[10px] border-black absolute w-[60vh] h-[60vh] gpu-accelerated"
                  style={{ filter: 'url(#ink-ripple-blur)' }}
                />

                {/* Ripple Wave 2 */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 3,
                    opacity: [0, 0.4, 0] 
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2,
                    ease: "easeOut",
                  }}
                  className="rounded-full border-[6px] border-black absolute w-[60vh] h-[60vh] gpu-accelerated"
                  style={{ filter: 'url(#ink-ripple-blur)' }}
                />

                {/* Ripple Wave 3 */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 2.4,
                    opacity: [0, 0.25, 0] 
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.32,
                    ease: "easeOut",
                  }}
                  className="rounded-full border-[3px] border-black absolute w-[60vh] h-[60vh] gpu-accelerated"
                  style={{ filter: 'url(#ink-ripple-blur)' }}
                />
              </>
            ) : (
              /* =========================================================
                 TO NINE SOLS MODE: Cyber/Taopunk Glitch & Static Storm
                 ========================================================= */
              <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                {/* Full-screen Solid Mask that triggers at midpoint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 1.1,
                    times: [0, 0.35, 0.65, 1],
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-[#050510] gpu-accelerated"
                />

                {/* Full-screen Cyber Glitch Static Overlay */}
                <div 
                  className="absolute inset-0 cyber-static-layer mix-blend-screen pointer-events-none"
                  style={{
                    animation: 'cyber-static-flicker 1.1s steps(4) infinite',
                  }}
                />

                {/* horizontal digital glitch bar 1 */}
                <motion.div
                  initial={{ top: '25%', left: '-100%', height: '10px' }}
                  animate={{ left: ['-100%', '100%'] }}
                  transition={{ duration: 0.5, ease: "linear", delay: 0.08 }}
                  className="absolute w-full bg-teal shadow-[0_0_12px_#22d3ee] opacity-75 gpu-accelerated"
                />

                {/* horizontal digital glitch bar 2 */}
                <motion.div
                  initial={{ top: '60%', right: '-100%', height: '6px' }}
                  animate={{ right: ['-100%', '100%'] }}
                  transition={{ duration: 0.45, ease: "linear", delay: 0.22 }}
                  className="absolute w-full bg-gold shadow-[0_0_12px_#d4a574] opacity-75 gpu-accelerated"
                />

                {/* Electric Lightning/Glitch SVG arcs */}
                <svg className="absolute w-full h-full pointer-events-none z-10 gpu-accelerated" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                  {/* Left lightning bolt */}
                  <path 
                    d="M 150 0 L 220 200 L 120 400 L 300 650 L 180 800 L 250 1000" 
                    fill="none" 
                    stroke="#22d3ee" 
                    strokeWidth="3.5"
                    vectorEffect="non-scaling-stroke"
                    style={{ animation: 'electric-glow-flicker 0.7s ease-in-out infinite' }}
                  />
                  {/* Center main electrical surge */}
                  <path 
                    d="M 500 0 L 450 150 L 580 350 L 390 600 L 520 800 L 480 1000" 
                    fill="none" 
                    stroke="#d4a574" 
                    strokeWidth="5"
                    vectorEffect="non-scaling-stroke"
                    style={{ animation: 'electric-glow-flicker 1s ease-in-out infinite' }}
                  />
                  {/* Right lightning bolt */}
                  <path 
                    d="M 850 0 L 780 250 L 880 500 L 720 750 L 820 900 L 750 1000" 
                    fill="none" 
                    stroke="#22d3ee" 
                    strokeWidth="3.5"
                    vectorEffect="non-scaling-stroke"
                    style={{ animation: 'electric-glow-flicker 0.8s ease-in-out infinite' }}
                  />
                </svg>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
