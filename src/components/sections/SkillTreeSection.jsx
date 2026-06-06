import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Cpu, Braces, Terminal, Gamepad2, Box, Shapes, Cog,
  Server, Route, Database, Wrench, GitBranch, Monitor, Bug, X, Zap,
} from 'lucide-react';
import { SKILL_TREE_ROOT } from '@/data/skills';

const ICON_MAP = {
  code: Code, cpu: Cpu, braces: Braces, terminal: Terminal,
  gamepad: Gamepad2, box: Box, shapes: Shapes, cog: Cog,
  server: Server, route: Route, database: Database,
  wrench: Wrench, gitBranch: GitBranch, monitor: Monitor, bug: Bug,
};

const PROF_CONFIG = {
  Proficient: { color: 'text-teal', bg: 'bg-teal', border: 'border-teal', diamonds: 3, label: 'Proficient' },
  Comfortable: { color: 'text-gold', bg: 'bg-gold', border: 'border-gold', diamonds: 2, label: 'Comfortable' },
  Familiar: { color: 'text-jade', bg: 'bg-jade', border: 'border-jade', diamonds: 1, label: 'Familiar' },
};

const ProficiencyDiamonds = ({ proficiency }) => {
  const config = PROF_CONFIG[proficiency];
  if (!config) return null;
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`text-xs ${i <= config.diamonds ? config.color : 'text-parchment/15'}`}
        >
          ◆
        </span>
      ))}
      <span className={`ml-2 font-mono text-[10px] uppercase tracking-wider ${config.color}`}>
        {config.label}
      </span>
    </div>
  );
};

// Helpers to flatten tree for rendering
const getAllNodes = (node, arr = []) => {
  arr.push(node);
  if (node.children) {
    node.children.forEach(child => getAllNodes(child, arr));
  }
  return arr;
};

const getAllEdges = (node, arr = []) => {
  if (node.children) {
    node.children.forEach(child => {
      arr.push({ source: node, target: child });
      getAllEdges(child, arr);
    });
  }
  return arr;
};

export const SkillTreeSection = () => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_TREE_ROOT);
  const [hoveredNode, setHoveredNode] = useState(null);

  const allNodes = useMemo(() => getAllNodes(SKILL_TREE_ROOT), []);
  const allEdges = useMemo(() => getAllEdges(SKILL_TREE_ROOT), []);

  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-parchment">
            Technical Arsenal
          </h2>
          <div className="mx-auto mt-4 brush-divider" style={{ width: '8rem' }} />
        </motion.div>

        {/* Skill Tree Container */}
        <motion.div
          className="glass-panel corner-brackets relative flex flex-col md:flex-row min-h-[600px] lg:min-h-[650px] overflow-hidden rounded-2xl"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          {/* LEFT: Detail Panel */}
          <AnimatePresence mode="wait">
            {selectedSkill ? (
              <motion.div
                key="inspector"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="relative z-20 w-full border-b md:border-b-0 md:border-r border-border-subtle bg-surface-raised/90 p-6 md:p-8 backdrop-blur-xl md:w-[380px] shrink-0"
              >
                {/* Close */}
                <motion.button
                  onClick={() => setSelectedSkill(null)}
                  className="absolute right-4 top-4 text-parchment/30 hover:text-parchment transition-colors"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} />
                </motion.button>

                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-xl border border-teal/30 bg-teal/10 text-teal"
                    animate={{
                      boxShadow: [
                        '0 0 15px rgba(34,211,238,0.15)',
                        '0 0 30px rgba(34,211,238,0.3)',
                        '0 0 15px rgba(34,211,238,0.15)',
                      ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    {(() => {
                      const Icon = ICON_MAP[selectedSkill.icon] || Zap;
                      return <Icon size={28} />;
                    })()}
                  </motion.div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-parchment">
                      {selectedSkill.label}
                    </h3>
                    {selectedSkill.proficiency && (
                      <ProficiencyDiamonds proficiency={selectedSkill.proficiency} />
                    )}
                    {!selectedSkill.proficiency && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-gold/50">
                        {selectedSkill.isRoot ? 'Foundation' : 'Category'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-parchment/30">
                      Description
                    </h4>
                    <p className="font-body text-sm leading-relaxed text-parchment/60">
                      {selectedSkill.desc || 'Core discipline encompassing multiple technologies.'}
                    </p>
                  </motion.div>

                  {/* Forged In */}
                  {selectedSkill.usedIn && (
                    <motion.div
                      className="ink-panel rounded-lg p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-teal/70">
                        Forged In
                      </h4>
                      <p className="font-body text-sm italic text-parchment/45">
                        "{selectedSkill.usedIn}"
                      </p>
                    </motion.div>
                  )}

                  {/* Proficiency visual */}
                  {selectedSkill.proficiency && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                    >
                      <h4 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-parchment/30">
                        Mastery
                      </h4>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => {
                          const filled =
                            selectedSkill.proficiency === 'Proficient'
                              ? i <= 5
                              : selectedSkill.proficiency === 'Comfortable'
                              ? i <= 3
                              : i <= 2;
                          const config = PROF_CONFIG[selectedSkill.proficiency];
                          return (
                            <motion.div
                              key={i}
                              className={`h-2 flex-1 rounded-full ${
                                filled ? config.bg + '/60' : 'bg-surface-highlight'
                              }`}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                            />
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hidden md:flex w-[380px] shrink-0 flex-col items-center justify-center border-r border-border-subtle bg-surface-raised/50 p-8 text-center backdrop-blur-sm"
              >
                <motion.div
                  className="mb-4 h-16 w-16 rounded-full border border-dashed border-parchment/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <p className="font-mono text-xs text-parchment/25">
                  Select a discipline to inspect
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* RIGHT: Skill Tree Canvas */}
          <div className="relative flex-1 bg-[radial-gradient(circle_at_50%_50%,#0d0d1a_0%,#050510_100%)] min-h-[500px] md:min-h-0">
            {/* Connection Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {allEdges.map((edge) => {
                const isActive =
                  hoveredNode === edge.target.id ||
                  selectedSkill?.id === edge.target.id;
                
                return (
                  <motion.line
                    key={`line-${edge.source.id}-${edge.target.id}`}
                    x1={edge.source.x}
                    y1={edge.source.y}
                    x2={edge.target.x}
                    y2={edge.target.y}
                    stroke={isActive ? '#22d3ee' : '#1e1e2a'}
                    strokeWidth={isActive ? 0.4 : 0.2}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {allNodes.map((node, index) => {
              const isCategory = !!node.children;
              const isSelected = selectedSkill?.id === node.id;
              const isHovered = hoveredNode === node.id;
              const Icon = ICON_MAP[node.icon] || Zap;
              const profConfig = node.proficiency ? PROF_CONFIG[node.proficiency] : null;

              return (
                <motion.button
                  key={node.id}
                  onClick={() => setSelectedSkill(node)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ left: `${node.x}%`, top: `${node.y}%`, x: '-50%', y: '-50%' }}
                  className="absolute z-10 group flex flex-col items-center gap-1.5 outline-none"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: index * 0.04 + 0.3,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Node Circle */}
                  <motion.div
                    className={`relative flex items-center justify-center rounded-full border transition-all duration-300 ${
                      node.isRoot ? 'h-16 w-16 md:h-20 md:w-20 border-teal/40 bg-teal/10 text-teal shadow-[0_0_20px_rgba(34,211,238,0.2)]' :
                      isCategory ? 'h-12 w-12 md:h-14 md:w-14' : 'h-10 w-10 md:h-11 md:w-11'
                    } ${
                      isSelected && !node.isRoot
                        ? 'border-teal bg-teal text-surface shadow-glow-teal'
                        : isHovered && !node.isRoot
                        ? 'border-teal/60 bg-teal/15 text-teal shadow-glow-teal'
                        : isCategory && !node.isRoot
                        ? 'border-gold/30 bg-surface-overlay text-gold/70 group-hover:border-gold/60 group-hover:text-gold'
                        : !node.isRoot
                        ? 'border-parchment/10 bg-surface-overlay text-parchment/40 group-hover:border-teal/40 group-hover:text-teal'
                        : ''
                    }`}
                  >
                    {/* Solid backdrop to hide lines passing underneath */}
                    <div className="absolute inset-0 rounded-full bg-[#0d0d1a] -z-10" />

                    <Icon size={node.isRoot ? 28 : isCategory ? 20 : 16} className="relative z-10" />
                    
                    {(isSelected || node.isRoot) && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-teal/20"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* Label */}
                  <motion.span
                    className={`font-mono ${node.isRoot ? 'text-[11px] md:text-xs text-teal font-bold' : 'text-[9px] md:text-[10px]'} tracking-wider whitespace-nowrap transition-colors ${
                      isSelected && !node.isRoot
                        ? 'text-teal'
                        : isCategory && !node.isRoot
                        ? 'text-gold/50 group-hover:text-gold'
                        : !node.isRoot
                        ? 'text-parchment/30 group-hover:text-parchment/60'
                        : ''
                    }`}
                    animate={isHovered ? { y: -2 } : { y: 0 }}
                  >
                    {node.label}
                  </motion.span>

                  {/* Proficiency dot */}
                  {profConfig && !isSelected && (
                    <motion.div
                      className={`absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-surface ${profConfig.bg}/80`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.04 + 0.5 }}
                    />
                  )}
                </motion.button>
              );
            })}

            {/* Subtle floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`p-${i}`}
                className="absolute rounded-full bg-teal/10"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${30 + Math.sin(i) * 25}%`,
                  width: 2,
                  height: 2,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};