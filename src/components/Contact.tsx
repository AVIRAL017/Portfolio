import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { Mail, Phone, Github, Linkedin, Send, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const formspreeKey = import.meta.env.VITE_FORMSPREE_KEY;

    if (formspreeKey) {
      fetch(`https://formspree.io/f/${formspreeKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) {
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
          } else {
            fallbackMailto();
          }
        })
        .catch(() => fallbackMailto())
        .finally(() => setSending(false));
    } else {
      fallbackMailto();
      setSending(false);
      setSubmitted(true);
    }
  };

  const fallbackMailto = () => {
    const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${portfolioContent.personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-400 font-mono text-xs mb-3 shadow-md shadow-rose-950/20">
          <Terminal className="w-3.5 h-3.5 text-rose-400" />
          <span>OUTPUT_LAYER // INITIATE_COMMUNICATION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Get In Touch &amp; Collaborate
        </h2>
        <p className="max-w-2xl text-slate-400 text-sm sm:text-base mt-3">
          Available for innovative AI/ML engineering roles, computer vision research, and high-performance technical collaborations.
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-rose-500 to-red-600 rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Direct Contact Telemetry HUD */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-4"
        >
          {/* Email Card */}
          <div className="hud-panel rounded-2xl p-6 border-white/10 hover:border-rose-500/40 bg-[#121826]/85 shadow-lg transition-all flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">DIRECT EMAIL</div>
                <a
                  href={`mailto:${portfolioContent.personal.email}`}
                  className="text-sm sm:text-base font-mono font-bold text-white hover:text-rose-400 transition-colors"
                >
                  {portfolioContent.personal.email}
                </a>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(portfolioContent.personal.email, 'email')}
              aria-label="Copy Email"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              {copied === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone Card */}
          <div className="hud-panel rounded-2xl p-6 border-white/10 hover:border-rose-500/40 bg-[#121826]/85 shadow-lg transition-all flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">PHONE TELEMETRY</div>
                <a
                  href={`tel:${portfolioContent.personal.phone}`}
                  className="text-sm sm:text-base font-mono font-bold text-white hover:text-rose-400 transition-colors"
                >
                  {portfolioContent.personal.phone}
                </a>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(portfolioContent.personal.phone, 'phone')}
              aria-label="Copy Phone"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              {copied === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href={portfolioContent.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-panel rounded-2xl p-5 border-white/10 hover:border-white/20 bg-[#121826]/85 shadow-md flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <Github className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                <span className="font-mono text-xs font-bold text-white">GitHub</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
            </a>

            <a
              href={portfolioContent.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-panel rounded-2xl p-5 border-white/10 hover:border-sky-500/30 bg-[#121826]/85 shadow-md flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <Linkedin className="w-5 h-5 text-sky-400 group-hover:text-sky-300 transition-colors" />
                <span className="font-mono text-xs font-bold text-white">LinkedIn</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-colors" />
            </a>
          </div>
        </motion.div>

        {/* Right Side: Interactive Transmission Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-7 hud-panel rounded-2xl p-6 sm:p-8 border-white/10 bg-[#121826]/85 shadow-xl"
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-mono text-xs text-rose-400 font-bold uppercase tracking-wider">
                MESSAGE_TRANSMISSION // ENCRYPTED
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-500">FORMAT: JSON_PAYLOAD</span>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white">Payload Transmitted</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Thank you for initiating contact. Your message has been dispatched and I will respond promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-bold text-white hover:bg-white/10"
              >
                Send Another Transmission
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1.5 uppercase font-semibold">
                    IDENTITY_NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Alex Vance"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] mb-1.5 uppercase font-semibold">
                    RETURN_EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors font-sans text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1.5 uppercase font-semibold">
                  TOPIC_SUBJECT
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. AI Research / Machine Learning Engineer Opportunity"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors font-sans text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1.5 uppercase font-semibold">
                  PAYLOAD_MESSAGE *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter your message details or project scope..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors font-sans text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold tracking-wide transition-all shadow-xl shadow-rose-600/25 flex items-center justify-center gap-2 border border-rose-400/30 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{sending ? 'TRANSMITTING PAYLOAD...' : 'TRANSMIT MESSAGE'}</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
