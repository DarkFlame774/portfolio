import { motion } from 'framer-motion';
import { Trophy, Award, Cloud, Shield } from 'lucide-react';

const ICON_MAP = { Trophy, Award, Cloud, Shield };

const ACHIEVEMENTS = [
  {
    title: 'TOP 30 Finalist',
    org: 'International 3rd Ideathon by MODA (Taiwan)',
    icon: 'Trophy',
    desc: 'Competed internationally and reached the top 30 out of global participants.',
    accent: 'teal',
  },
  {
    title: 'Hack2Change Finalist',
    org: 'National Hackathon',
    icon: 'Award',
    desc: 'Built an impactful solution advancing to the finals.',
    accent: 'gold',
  },
  {
    title: '15+ Skill Badges',
    org: 'Google Cloud Skills Platform',
    icon: 'Cloud',
    desc: 'GCP Foundations and Infrastructure in Google Cloud certifications.',
    accent: 'jade',
  },
  {
    title: 'Ethical Hacking',
    org: 'Internshala — 2 Month Course',
    icon: 'Shield',
    desc: 'Web and network vulnerabilities, secure development practices, penetration testing workflows.',
    accent: 'gold',
  },
];

const ACCENT_STYLES = {
  teal: {
    border: 'border-t-teal/60',
    iconBg: 'bg-teal/10 border-teal/30',
    iconText: 'text-teal',
    orgText: 'text-teal/60',
    hoverBorder: 'rgba(34,211,238,0.3)',
    glow: '0 0 20px rgba(34,211,238,0.15)',
  },
  gold: {
    border: 'border-t-gold/60',
    iconBg: 'bg-gold/10 border-gold/30',
    iconText: 'text-gold',
    orgText: 'text-gold/60',
    hoverBorder: 'rgba(212,165,116,0.3)',
    glow: '0 0 20px rgba(212,165,116,0.15)',
  },
  jade: {
    border: 'border-t-jade/60',
    iconBg: 'bg-jade/10 border-jade/30',
    iconText: 'text-jade',
    orgText: 'text-jade/60',
    hoverBorder: 'rgba(45,212,191,0.3)',
    glow: '0 0 20px rgba(45,212,191,0.15)',
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const Achievements = () => {
  return (
    <section id="achievements" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-parchment">
            Honors & Certifications
          </h2>
          <div className="mx-auto mt-4 brush-divider" style={{ width: '8rem' }} />
        </motion.div>

        {/* Achievement Cards */}
        <motion.div
          className="grid gap-5 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {ACHIEVEMENTS.map((achievement) => {
            const Icon = ICON_MAP[achievement.icon] || Trophy;
            const styles = ACCENT_STYLES[achievement.accent];

            return (
              <motion.div
                key={achievement.title}
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  borderColor: styles.hoverBorder,
                  boxShadow: styles.glow,
                }}
                className={`glass-panel rounded-xl overflow-hidden border-t-2 ${styles.border} transition-all duration-300`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <motion.div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${styles.iconBg} ${styles.iconText}`}
                      whileHover={{ rotate: 5 }}
                    >
                      <Icon size={22} />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-parchment">
                        {achievement.title}
                      </h3>
                      <p className={`font-mono text-[10px] uppercase tracking-wider mt-0.5 ${styles.orgText}`}>
                        {achievement.org}
                      </p>
                      <p className="mt-3 font-body text-sm leading-relaxed text-parchment/40">
                        {achievement.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
