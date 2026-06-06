import { motion } from 'framer-motion';
import { GraduationCap, School, Users, Trophy } from 'lucide-react';

const INFO_CARDS = [
  {
    icon: GraduationCap,
    title: 'B.Tech CSE',
    org: 'Maharishi Markandeshwar University',
    detail: 'GPA: 8.56/10 · 2023–Present',
  },
  {
    icon: School,
    title: 'Class XII — 86.67%',
    org: 'Ram Prasad DAV Sr. Sec. School',
    detail: 'Shahbad Markanda · 2023',
  },
  {
    icon: Users,
    title: 'GDG on Campus',
    org: 'Core Team Member',
    detail: '2024–Present · Speaker, Mentor',
  },
  {
    icon: Trophy,
    title: '12+ Hackathons',
    org: 'Active Participant',
    detail: 'Pitch decks & technical builds',
  },
];

const COURSEWORK = [
  'Software Engineering',
  'Operating Systems',
  'Data Structures',
  'Databases',
  'Mathematics',
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const About = () => {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-parchment">About</h2>
          <div className="mx-auto mt-4 brush-divider" style={{ width: '6rem' }} />
        </motion.div>

        <motion.div
          className="grid gap-12 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Left: Personal Statement */}
          <motion.div variants={itemVariants}>
            <div className="ink-panel rounded-xl p-8">
              <p className="font-body text-base leading-relaxed text-parchment/65 mb-5">
                A B.Tech Computer Science student at Maharishi Markandeshwar University with a deep
                passion for game engine architecture and systems programming. I thrive at the
                intersection of low-level code and creative design — building the tools that bring
                digital worlds to life.
              </p>
              <p className="font-body text-base leading-relaxed text-parchment/55">
                As a Core Team Member of Google Developer Groups on Campus, I contribute to
                organizing events, mentor juniors in Game Development and AR, and have participated
                in 12+ hackathons. I believe in learning by building and sharing knowledge.
              </p>

              {/* Coursework Tags */}
              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-parchment/30 mb-3">
                  Relevant Coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {COURSEWORK.map((course) => (
                    <span
                      key={course}
                      className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1 font-mono text-[10px] tracking-wider text-gold/70"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Info Cards Grid */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={containerVariants}>
            {INFO_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  whileHover={{ y: -4, borderColor: 'rgba(34,211,238,0.3)' }}
                  className="glass-panel corner-brackets rounded-lg p-5 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-teal/20 bg-teal/5 text-teal">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-sm font-semibold text-parchment truncate">
                        {card.title}
                      </h3>
                      <p className="font-body text-xs text-parchment/50 mt-0.5">{card.org}</p>
                      <p className="font-mono text-[10px] text-gold/50 mt-1">{card.detail}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
