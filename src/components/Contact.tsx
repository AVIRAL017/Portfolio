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
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
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
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-mono text-xs mb-3 shadow-sm">
          <Terminal className="w-3.5 h-3.5 text-rose-600" />
          <span>OUTPUT_LAYER // INITIATE_COMMUNICATION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Get In Touch &amp; Collaborate
        </h2>
        <p className="max-w-2xl text-slate-600 text-sm sm:text-base mt-3">
          Available for innovative AI/ML engineering roles, computer vision research, and high-performance technical collaborations.
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-rose-500 via-indigo-500 to-sky-500 rounded-full mt-4" />
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
          <div className="hud-panel rounded-2xl p-6 border-slate-200/80 hover:border-rose-400 bg-white/90 shadow-xl transition-all flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">DIRECT EMAIL</div>
                <a
                  href={`mailto:${portfolioContent.personal.email}`}
                  className="text-sm sm:text-base font-mono font-bold text-slate-900 hover:text-rose-600 transition-colors"
                >
                  {portfolioContent.personal.email}
                </a>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(portfolioContent.personal.email, 'email')}
              aria-label="Copy Email"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 shadow-sm transition-colors"
            >
              {copied === 'email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone Card */}
          <div className="hud-panel rounded-2xl p-6 border-slate-200/80 hover:border-rose-400 bg-white/90 shadow-xl transition-all flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">PHONE TELEMETRY</div>
                <a
                  href={`tel:${portfolioContent.personal.phone}`}
                  className="text-sm sm:text-base font-mono font-bold text-slate-900 hover:text-rose-600 transition-colors"
                >
                  {portfolioContent.personal.phone}
                </a>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(portfolioContent.personal.phone, 'phone')}
              aria-label="Copy Phone"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 shadow-sm transition-colors"
            >
              {copied === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href={portfolioContent.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-panel rounded-2xl p-5 border-slate-200/80 hover:border-slate-400 bg-white/90 shadow-lg flex items-center justify-between group transition-all"
            >
              <div className="flex items-center space-x-3">
                <Github className="w-5 h-5 text-slate-700 group-hover:text-slate-900 transition-colors" />
                <span className="font-mono text-xs font-bold text-slate-900">GitHub</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
            </a>

            <a
              href={portfolioContent.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-panel rounded-2xl p-5 border-slate-200/80 hover:border-sky-400 bg-white/90 shadow-lg flex items-center justify-between group transition-all"
            >
              <div className="flex items-center space-x-3">
                <Linkedin className="w-5 h-5 text-sky-600 group-hover:text-sky-700 transition-colors" />
                <span className="font-mono text-xs font-bold text-slate-900">LinkedIn</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 transition-colors" />
            </a>
          </div>
        </motion.div>

        {/* Right Side: Interactive Transmission Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-7 hud-panel rounded-2xl p-6 sm:p-8 border-slate-200/80 bg-white/90 shadow-2xl"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 mb-6">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-mono text-xs text-rose-600 font-bold uppercase tracking-wider">
                MESSAGE_TRANSMISSION // ENCRYPTED
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-500 font-semibold">FORMAT: JSON_PAYLOAD</span>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-900">Payload Transmitted</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Thank you for initiating contact. Your message has been dispatched and I will respond promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800 hover:bg-slate-200 shadow-sm transition-colors"
              >
                Send Another Transmission
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 text-[11px] mb-1.5 uppercase font-semibold">
                    IDENTITY_NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Alex Vance"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/90 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 shadow-xs font-sans text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 text-[11px] mb-1.5 uppercase font-semibold">
                    RETURN_EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/90 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 shadow-xs font-sans text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 text-[11px] mb-1.5 uppercase font-semibold">
                  TOPIC_SUBJECT
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. AI Research / Machine Learning Engineer Opportunity"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50/90 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 shadow-xs font-sans text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-600 text-[11px] mb-1.5 uppercase font-semibold">
                  PAYLOAD_MESSAGE *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter your message details or project scope..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50/90 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 shadow-xs font-sans text-sm resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold tracking-wide transition-all shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 border border-rose-400/30 disabled:opacity-50"
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
