import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Phone, Github, Linkedin, CheckCircle } from 'lucide-react';

export const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-parchment">Connect</h2>
          <div className="mx-auto mt-4 brush-divider" style={{ width: '6rem' }} />
        </motion.div>

        <motion.div
          className="glass-panel corner-brackets rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid md:grid-cols-2">
            {/* Left: Contact Info */}
            <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-border-subtle">
              <p className="font-body text-lg leading-relaxed text-parchment/60 mb-8">
                Let's create something remarkable together. Whether it's a game engine, a creative
                project, or just a conversation about code.
              </p>

              <div className="space-y-5">
                {/* Email */}
                <motion.a
                  href="mailto:abhinavgarg1520@gmail.com"
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-teal/20 bg-teal/5 text-teal/60 group-hover:text-teal group-hover:border-teal/40 transition-all">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-parchment/25">
                      Email
                    </p>
                    <p className="font-body text-sm text-parchment/60 group-hover:text-teal transition-colors">
                      abhinavgarg1520@gmail.com
                    </p>
                  </div>
                </motion.a>

                {/* Phone */}
                <motion.a
                  href="tel:+919499417601"
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-teal/20 bg-teal/5 text-teal/60 group-hover:text-teal group-hover:border-teal/40 transition-all">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-parchment/25">
                      Phone
                    </p>
                    <p className="font-body text-sm text-parchment/60 group-hover:text-teal transition-colors">
                      +91 94994-17601
                    </p>
                  </div>
                </motion.a>
              </div>

              {/* Social Links */}
              <div className="mt-10 pt-6 border-t border-border-subtle">
                <p className="font-mono text-[10px] uppercase tracking-wider text-parchment/25 mb-4">
                  Find me on
                </p>
                <div className="flex gap-4">
                  {[
                    {
                      icon: Github,
                      href: 'https://github.com/DarkFlame774',
                      label: 'GitHub',
                    },
                    {
                      icon: Linkedin,
                      href: 'https://www.linkedin.com/in/abhinav-3b695129b/',
                      label: 'LinkedIn',
                    },
                  ].map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded border border-parchment/8 bg-surface-highlight/20 px-4 py-2 font-mono text-[11px] text-parchment/40 hover:text-teal hover:border-teal/30 transition-all"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Icon size={14} />
                      {label}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="p-8 md:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center h-full text-center py-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-jade/10 text-jade border border-jade/20"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle size={32} />
                    </motion.div>
                    <p className="font-display text-lg text-parchment">Message Sent</p>
                    <p className="mt-2 font-body text-sm text-parchment/40">
                      I'll get back to you soon.
                    </p>
                    <motion.button
                      className="mt-6 font-mono text-xs text-teal hover:text-teal-light transition-colors"
                      onClick={() => setSubmitted(false)}
                      whileHover={{ scale: 1.05 }}
                    >
                      Send Another →
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name */}
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-parchment/30 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-border-subtle focus:border-teal pb-2 font-body text-sm text-parchment outline-none transition-colors placeholder:text-parchment/15"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-parchment/30 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full bg-transparent border-b border-border-subtle focus:border-teal pb-2 font-body text-sm text-parchment outline-none transition-colors placeholder:text-parchment/15"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-parchment/30 mb-2">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="w-full bg-transparent border-b border-border-subtle focus:border-teal pb-2 font-body text-sm text-parchment outline-none transition-colors resize-none placeholder:text-parchment/15"
                        placeholder="Tell me about your project or idea..."
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      className="flex items-center gap-2 rounded border border-teal bg-teal/10 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-teal transition-all hover:bg-teal hover:text-surface"
                      whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(34,211,238,0.3)' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Send size={14} />
                      Send Message
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};