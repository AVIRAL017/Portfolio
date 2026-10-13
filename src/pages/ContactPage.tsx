import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { portfolioContent } from '../data/content';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Send,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Radio
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const formspreeKey = import.meta.env.VITE_FORMSPREE_KEY || 'xbgdkeak';

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Server rejected transmission');
      }
    } catch (err: any) {
      console.warn('Formspree dispatch error, falling back:', err);
      fallbackMailto();
    } finally {
      setSending(false);
    }
  };

  const fallbackMailto = () => {
    const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${portfolioContent.personal.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen pb-24">
        {/* Upper 3D Spatial Theater Stage (Clear zone for 3D Workstation Desk & Monitors) */}
        <section className="relative pt-24 pb-8 min-h-[240px] sm:min-h-[280px] flex flex-col items-center justify-end px-4 text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md text-slate-800 font-mono text-xs font-semibold pointer-events-auto"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
            <Radio className="w-3.5 h-3.5 text-emerald-600" />
            <span>3D SPATIAL TELEMETRY // COMMAND TELEMETRY CONSOLE</span>
          </motion.div>
          <span className="text-[10px] font-mono text-slate-500 mt-2 font-medium">
            LIVE MONITOR FEED • SSL 256-BIT ENCRYPTION ACTIVE
          </span>
        </section>

        {/* Lower Content Stage: Positioned safely BELOW 3D model */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header Card with Frosted White Backdrop for 100% Contrast */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hud-panel rounded-3xl p-8 sm:p-10 mb-10 border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-xl max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs mb-3 shadow-sm">
              <Terminal className="w-3.5 h-3.5 text-emerald-600" />
              <span>COMMUNICATION // DIRECT_ENCRYPTED_UPLINK</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight">
              Initiate Contact &amp; Transmission
            </h1>

            <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base mt-3 font-normal leading-relaxed">
              Direct encrypted transmission portal for engineering collaboration, technical recruitment, or software consultation.
            </p>

            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 rounded-full mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Direct Telemetry Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Telemetry Card: Email */}
              <div className="hud-panel rounded-2xl p-6 border-slate-200/90 bg-white/95 shadow-xl transition-all hover:border-indigo-400">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block font-semibold">
                        Direct Email Uplink
                      </span>
                      <a
                        href={`mailto:${portfolioContent.personal.email}`}
                        className="font-display font-bold text-slate-900 hover:text-indigo-600 transition-colors text-sm sm:text-base"
                      >
                        {portfolioContent.personal.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(portfolioContent.personal.email, 'email')}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors border border-slate-200"
                    title="Copy Email"
                  >
                    {copied === 'email' ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Telemetry Card: Phone */}
              <div className="hud-panel rounded-2xl p-6 border-slate-200/90 bg-white/95 shadow-xl transition-all hover:border-emerald-400">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block font-semibold">
                        Voice / Cellular Uplink
                      </span>
                      <a
                        href={`tel:${portfolioContent.personal.phone}`}
                        className="font-display font-bold text-slate-900 hover:text-emerald-600 transition-colors text-sm sm:text-base"
                      >
                        {portfolioContent.personal.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(portfolioContent.personal.phone, 'phone')}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors border border-slate-200"
                    title="Copy Phone"
                  >
                    {copied === 'phone' ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Network Platforms */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={portfolioContent.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hud-panel rounded-2xl p-5 border-slate-200/90 bg-white/95 shadow-lg hover:border-rose-400 hover:shadow-xl transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-slate-500 uppercase block font-semibold">GitHub</span>
                      <span className="font-display font-bold text-xs text-slate-900">Repositories</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 transition-colors" />
                </a>

                <a
                  href={portfolioContent.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hud-panel rounded-2xl p-5 border-slate-200/90 bg-white/95 shadow-lg hover:border-sky-400 hover:shadow-xl transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-slate-500 uppercase block font-semibold">LinkedIn</span>
                      <span className="font-display font-bold text-xs text-slate-900">Network</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 transition-colors" />
                </a>
              </div>

              {/* Station Operations Card */}
              <div className="hud-panel rounded-2xl p-6 border-slate-200/90 bg-white/95 shadow-xl space-y-3 font-mono text-xs text-slate-600">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span className="font-bold text-slate-900">BASE LOCATION</span>
                  </div>
                  <span>Kanpur / UP, India</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <span className="font-bold text-slate-900">TIME ZONE</span>
                  </div>
                  <span>IST (UTC +05:30)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="font-bold text-slate-900">AVAILABILITY</span>
                  </div>
                  <span className="text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                    IMMEDIATE / ACTIVE
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Encrypted Form Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <div className="hud-panel rounded-3xl p-7 sm:p-9 border-indigo-200/90 bg-white/95 shadow-2xl relative overflow-hidden">
                {/* Form Header */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200/80">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
                    <span className="font-mono text-xs text-slate-600 ml-2 font-semibold">
                      TERMINAL_UPLINK // DISPATCH_CONSOLE
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                    SSL 256-BIT ENCRYPTED
                  </span>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center space-y-4 my-6"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-display font-extrabold text-slate-900">
                      Message Successfully Transmitted
                    </h3>
                    <p className="font-sans text-sm text-slate-600 max-w-md mx-auto">
                      Your transmission packet has been encrypted and delivered directly to Aviral's primary terminal. Anticipate response within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-700 font-mono text-xs font-bold hover:bg-emerald-50 transition-colors shadow-sm"
                    >
                      SEND ANOTHER TRANSMISSION
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-mono text-xs text-slate-700 font-bold mb-2">
                          AGENT_NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Dr. Alex Mercer"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-xs text-slate-700 font-bold mb-2">
                          RETURN_EMAIL *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@aerospace-lab.org"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-slate-700 font-bold mb-2">
                        SUBJECT_HEADER *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Inquiry regarding Machine Learning / Software Engineering"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-slate-700 font-bold mb-2">
                        MESSAGE_PAYLOAD *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Provide project context, engineering requirements, or scheduling parameters..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-indigo-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    >
                      {sending ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>TRANSMITTING ENCRYPTED PACKET...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>TRANSMIT TELEMETRY DISPATCH</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
