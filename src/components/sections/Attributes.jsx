import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const STATS = [
  { label: 'System Design', value: 90 },
  { label: 'Problem Solving', value: 95 },
  { label: 'Communication', value: 85 },
  { label: 'Creativity', value: 80 },
  { label: 'Leadership', value: 75 },
];

export const Attributes = () => {
  return (
    <section id="attributes" className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <motion.h2 
          className="mb-12 text-center font-sans text-3xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Core Attributes
        </motion.h2>
        
        <motion.div 
          className="glass-panel corner-brackets grid gap-8 rounded-2xl p-8 md:grid-cols-2"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-6">
            {STATS.map((stat, i) => (
              <StatBar key={stat.label} stat={stat} index={i} />
            ))}
          </div>
          
          <motion.div 
            className="flex items-center justify-center rounded-xl border border-border-subtle bg-surface/50 p-8"
            whileHover={{ borderColor: "rgba(212,175,55,0.5)", scale: 1.02 }}
          >
            <div className="text-center">
              <motion.div 
                className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-accent/20 bg-accent/5 text-accent"
                animate={{ boxShadow: ['0_0_0px_rgba(212,175,55,0)', '0_0_30px_rgba(212,175,55,0.3)', '0_0_0px_rgba(212,175,55,0)'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-3xl font-bold">LV.5</span>
              </motion.div>
              <h3 className="font-sans text-xl font-bold text-white">Senior Engineer</h3>
              <p className="mt-2 text-sm text-zinc-500">Class: Full Stack Specialist</p>
              <p className="mt-4 text-xs text-zinc-600">Total XP: 1,240,500</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const StatBar = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1 }}
    >
      <div className="mb-2 flex justify-between font-mono text-xs uppercase tracking-wider">
        <span className="text-zinc-300">{stat.label}</span>
        <motion.span 
          className="text-accent"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          {stat.value}/100
        </motion.span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-highlight">
        <motion.div 
          initial={{ width: 0 }}
          animate={isInView ? { width: `${stat.value}%` } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-accent-dim to-accent shadow-[0_0_10px_#d4af37]"
        />
      </div>
    </motion.div>
  );
};