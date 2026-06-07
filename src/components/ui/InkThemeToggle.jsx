import { motion } from 'framer-motion';
import { Sparkles, Palette } from 'lucide-react';

export const InkThemeToggle = ({ theme, onToggle }) => {
  const isSamurai = theme === 'samurai';

  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-6 right-6 z-[100] flex items-center gap-2 rounded-full border border-border-subtle bg-surface-raised/80 px-4 py-2 backdrop-blur-md transition-all duration-300 hover:border-teal/50 hover:bg-surface-overlay"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <span className="font-mono text-[10px] tracking-[0.2em] text-parchment-dim">
        MODE: <span className={isSamurai ? "text-parchment font-bold" : "text-teal font-bold"}>
          {isSamurai ? "SAMURAI (侍)" : "NINE SOLS (九陽)"}
        </span>
      </span>
      <div className="relative flex h-5 w-5 items-center justify-center">
        {isSamurai ? (
          <motion.div
            key="samurai-icon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Palette size={14} className="text-parchment" />
          </motion.div>
        ) : (
          <motion.div
            key="nine-sol-icon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles size={14} className="text-teal" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
};
