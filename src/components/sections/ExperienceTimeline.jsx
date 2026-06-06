import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';

const TIMELINE = [
  {
    year: '2024 – Present',
    title: 'Core Team Member',
    org: 'Google Developer Groups on Campus MM(DU)',
    type: 'activity',
    desc: "Organizing Google's GDGoC events, speaking at 3 sessions, mentoring juniors in Game Dev & AR, and participating in 12+ hackathons and ideathons.",
  },
  {
    year: '2023 – Present',
    title: 'B.Tech in Computer Science',
    org: 'Maharishi Markandeshwar University, Ambala',
    type: 'edu',
    desc: 'Cumulative GPA: 8.56/10. Coursework in Software Engineering, Operating Systems, Data Structures, Databases, and Mathematics.',
  },
  {
    year: '2023',
    title: 'Class XII — 86.67%',
    org: 'Ram Prasad DAV Sr. Sec. School, Shahbad Markanda',
    type: 'edu',
    desc: 'Completed senior secondary education with strong academic performance.',
  },
];

export const ExperienceTimeline = () => {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        {/* Section Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-parchment">Chronicle</h2>
          <div className="mx-auto mt-4 brush-divider" style={{ width: '6rem' }} />
        </motion.div>

        <div className="relative space-y-12 pl-8 md:pl-0">
          {/* Vertical connecting line */}
          <motion.div
            className="absolute left-[19px] top-0 bottom-0 w-px md:left-1/2 md:-ml-px"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(34,211,238,0.4) 15%, rgba(212,165,116,0.3) 60%, rgba(34,211,238,0.1) 85%, transparent 100%)',
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {TIMELINE.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative flex items-start gap-8 md:gap-14 ${
        index % 2 === 0 ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Content Card */}
      <div className="flex-1 md:text-center">
        <motion.div
          className={`ink-panel corner-brackets inline-block rounded-lg p-5 md:p-6 text-left transition-all duration-300 hover:border-gold/30 ${
            index % 2 === 0 ? 'md:text-right' : 'md:text-left'
          }`}
          whileHover={{ y: -3 }}
        >
          <span className="font-mono text-[11px] text-teal/70">{item.year}</span>
          <h3 className="mt-1 font-display text-lg font-semibold text-parchment">{item.title}</h3>
          <p className="font-body text-sm text-parchment/40">{item.org}</p>
          <motion.p
            className="mt-3 font-body text-xs leading-relaxed text-parchment/30"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {item.desc}
          </motion.p>
        </motion.div>
      </div>

      {/* Center Node */}
      <motion.div
        className="absolute left-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-teal/30 bg-surface text-teal md:left-1/2"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ type: 'spring', delay: index * 0.15 + 0.2 }}
        whileHover={{ scale: 1.2 }}
        style={{
          boxShadow: '0 0 15px rgba(34,211,238,0.15)',
        }}
      >
        {item.type === 'activity' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
      </motion.div>

      {/* Spacer */}
      <div className="hidden flex-1 md:block" />
    </motion.div>
  );
};