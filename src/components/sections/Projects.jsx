import { motion } from 'framer-motion';
import { GitBranch, ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/data/projects';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

export const Projects = () => {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-parchment">Projects</h2>
          <div className="mx-auto mt-4 brush-divider" style={{ width: '6rem' }} />
        </motion.div>

        {/* Project Cards */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="glass-panel corner-brackets rounded-xl overflow-hidden transition-all duration-400 hover:border-teal/20"
            >
              {/* Top accent line */}
              <div className="h-[2px] bg-gradient-to-r from-transparent via-teal/60 to-transparent" />

              <div className="p-6 md:p-8">
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-parchment">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-teal/70 mt-1">{project.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Language badge */}
                    <span className="rounded border border-gold/20 bg-gold/5 px-3 py-1 font-mono text-[10px] tracking-wider text-gold/70">
                      {project.language}
                    </span>
                    {/* Status badge */}
                    <span
                      className={`rounded-full px-3 py-1 font-mono text-[10px] tracking-wider ${
                        project.status === 'In Progress'
                          ? 'border border-gold/30 bg-gold/5 text-gold'
                          : 'border border-jade/30 bg-jade/5 text-jade'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-body text-sm leading-relaxed text-parchment/50 mb-6">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="mb-6 grid gap-2 sm:grid-cols-2">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-teal text-[8px] mt-1.5 shrink-0">◆</span>
                      <span className="font-body text-xs text-parchment/55">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Footer: Tech tags + GitHub link */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-subtle">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-teal/20 bg-teal/5 px-2.5 py-1 font-mono text-[10px] tracking-wider text-teal/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded border border-teal/30 bg-teal/5 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-teal transition-all hover:bg-teal/20 hover:border-teal hover:shadow-glow-teal"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <GitBranch size={13} />
                    View Source
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
