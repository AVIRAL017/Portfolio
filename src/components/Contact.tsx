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
      // Send via Formspree API
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
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>SECTION_07 // INITIATE_COMMUNICATION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Get In Touch &amp; Collaborate
        </h2>
        <p className="max-w-2xl text-slate-400 text-sm sm:text-base mt-3">
          Available for innovative AI/ML engineering roles, computer vision research, and technical collaborations.
        </p>
        <div className="h-0.5 w-20 bg-gradient-to-r from-cyan-400 to-violet-500 mt-4" />
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
          <div className="hud-panel rounded-2xl p-6 border-slate-800 hover:border-cyan-400/40 transition-all flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">DIRECT EMAIL</div>
                <a
                  href={`mailto:${portfolioContent.personal.email}`}
                  className="text-sm sm:text-base font-mono font-semibold text-white hover:text-cyan-300 transition-colors"
                >
                  {portfolioContent.personal.email}
                </a>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(portfolioContent.personal.email, 'email')}
              aria-label="Copy Email address"
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-colors"
            >
              {copied === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone Card */}
          <div className="hud-panel rounded-2xl p-6 border-slate-800 hover:border-cyan-400/40 transition-all flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">VOICE / TELEPHONE</div>
                <a
                  href={`tel:${portfolioContent.personal.phone.replace(/\s+/g, '')}`}
                  className="text-sm sm:text-base font-mono font-semibold text-white hover:text-violet-300 transition-colors"
                >
                  {portfolioContent.personal.phone}
                </a>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(portfolioContent.personal.phone, 'phone')}
              aria-label="Copy Phone number"
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-violet-400 text-slate-400 hover:text-violet-300 transition-colors"
            >
              {copied === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Social Profiles Grid */}
          <div className="hud-panel rounded-2xl p-6 border-slate-800 space-y-4">
            <div className="font-mono text-xs text-slate-400 uppercase tracking-wider">
              SYSTEM PROFILES &amp; REPOSITORIES:
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <a
                href={portfolioContent.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-black/40 border border-slate-800 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>GitHub</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={portfolioContent.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-black/40 border border-slate-800 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={portfolioContent.personal.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-black/40 border border-slate-800 hover:border-amber-400 text-slate-200 hover:text-amber-300 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">LC</span>
                  <span>LeetCode</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={portfolioContent.personal.hackerrank}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-black/40 border border-slate-800 hover:border-emerald-400 text-slate-200 hover:text-emerald-300 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">HR</span>
                  <span>HackerRank</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Working Contact Message Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 hud-panel rounded-2xl p-6 sm:p-8 border-cyan-500/30"
        >
          <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-6">
            <h3 className="font-display font-bold text-xl text-white">
              Transmit Encrypted Message
            </h3>
            <span className="font-mono text-[10px] text-cyan-400/80">
              SOCKET // ACTIVE
            </span>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4 rounded-xl bg-cyan-950/20 border border-cyan-400/40">
              <div className="w-12 h-12 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-display font-bold text-white">
                Transmission Dispatched
              </h4>
              <p className="text-sm font-sans text-slate-300">
                Thank you! Your inquiry packet has been received or queued in the mail pipeline. I will respond promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 rounded-lg bg-cyan-400 text-black font-mono text-xs font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-slate-400 mb-1.5">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ada Lovelace"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-slate-400 mb-1.5">
                    YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ada@domain.org"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans text-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-400 mb-1.5">
                  SUBJECT
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="AI Engineering Opportunity / Research Collaboration"
                  className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-400 mb-1.5">
                  MESSAGE PACKET *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe project requirements, timeline, or technical inquiry..."
                  className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans text-sm transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 hover:from-cyan-300 hover:to-violet-400 text-black font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2"
              >
                {sending ? (
                  <span>TRANSMITTING...</span>
                ) : (
                  <>
                    <span>DISPATCH PACKET</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
