import React, { useState, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PathfinderSelection, EnquiryData } from '../types';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Download,
  FileSpreadsheet,
  Send,
  Loader2
} from 'lucide-react';

interface ContactSectionProps {
  pathfinderSelection?: PathfinderSelection | null;
  selectedOffering?: string | null;
}

export const ContactSection = forwardRef<HTMLDivElement, ContactSectionProps>(({
  pathfinderSelection,
  selectedOffering
}, ref) => {
  const [formData, setFormData] = useState<EnquiryData>({
    name: '',
    email: '',
    phone: '',
    yearGroup: 'Year 11 (Exam Year)',
    struggleArea: 'Algebra & Equations',
    mode: 'In-Person (Sale, M33)',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [downloadCsvUrl, setDownloadCsvUrl] = useState('');

  // Synchronize when pathfinder selection changes
  useEffect(() => {
    if (pathfinderSelection) {
      setFormData(prev => ({
        ...prev,
        yearGroup: pathfinderSelection.yearGroup,
        struggleArea: pathfinderSelection.struggleArea,
        mode: pathfinderSelection.mode,
        message: prev.message || `Hi Tia, I'm inquiring about tutoring for my child in ${pathfinderSelection.yearGroup} focusing on ${pathfinderSelection.struggleArea} (${pathfinderSelection.mode}).`
      }));
    }
  }, [pathfinderSelection]);

  useEffect(() => {
    if (selectedOffering) {
      setFormData(prev => ({
        ...prev,
        message: `Hi Tia, I would like to inquire about ${selectedOffering}.`
      }));
    }
  }, [selectedOffering]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmitted(true);
        setDownloadCsvUrl('/api/enquiries/csv');
      } else {
        setErrorMsg(resData.error || 'Something went wrong. Please call or message on WhatsApp.');
      }
    } catch (err: any) {
      setErrorMsg('Network issue submitting form. Please send us a WhatsApp message directly or call +44 7402 786523.');
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppMessageUrl = () => {
    const text = `Hi Tia, my name is ${formData.name || 'a parent'}. I'm interested in GCSE maths tutoring for my child in ${formData.yearGroup} (${formData.struggleArea}, ${formData.mode}). ${formData.message}`;
    return `https://wa.me/447402786523?text=${encodeURIComponent(text)}`;
  };

  return (
    <section ref={ref} className="py-12 sm:py-16 bg-[#F9F9F7] border-b border-[#E5E5E5]" id="contact">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-[720px] mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4A7C59] mb-2">
            <span>Check Availability</span>
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2D2D2D]">
            Get in touch with Tia
          </h2>
          <p className="text-[18px] text-[#666666] leading-[1.6] mt-2">
            Send an inquiry below to check current session spaces. Every enquiry is automatically recorded in Tia’s spreadsheet log.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Form (8 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded border border-[#E5E5E5]">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 py-4"
                >
                  <div className="flex items-center gap-3 text-[#4A7C59]">
                    <CheckCircle className="w-8 h-8 shrink-0" />
                    <div>
                      <h3 className="font-serif font-bold text-xl text-[#2D2D2D]">
                        Enquiry Received &amp; Logged!
                      </h3>
                      <p className="text-xs text-[#666666]">
                        Row added to Tia's Google Sheets spreadsheet log with timestamp.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#F9F9F7] p-4 rounded border border-[#E5E5E5] text-sm text-[#2D2D2D] space-y-2">
                    <p>
                      Thank you, <strong>{formData.name}</strong>! Tia will review your request for <strong>{formData.yearGroup}</strong> ({formData.mode}) and respond shortly.
                    </p>
                    <p className="text-xs text-[#666666]">
                      Need an instant answer tonight? You can also message Tia on WhatsApp right away.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={getWhatsAppMessageUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#4A7C59] text-white font-semibold text-sm py-3 px-4 rounded hover:bg-[#3A6346] transition-all text-center flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp Now</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="bg-[#F9F9F7] text-[#2D2D2D] border border-[#E5E5E5] font-semibold text-sm py-3 px-4 rounded hover:bg-[#E5E5E5] transition-all"
                    >
                      Send Another Inquiry
                    </button>
                  </div>

                  {/* Spreadsheet Log Link for Owner */}
                  <div className="pt-4 border-t border-[#E5E5E5] text-xs text-[#666666] flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium text-[#2D2D2D]">
                      <FileSpreadsheet className="w-4 h-4 text-[#4A7C59]" />
                      Spreadsheet CSV Log
                    </span>
                    <a
                      href="/api/enquiries/csv"
                      className="text-[#4A7C59] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Spreadsheet CSV
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-xs font-bold text-[#2D2D2D]">
                        Parent / Guardian Name <span className="text-[#4A7C59]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-[#F9F9F7] border border-[#E5E5E5] rounded p-2.5 text-sm text-[#2D2D2D] focus:bg-white focus:border-[#4A7C59] transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-bold text-[#2D2D2D]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@example.co.uk"
                        className="w-full bg-[#F9F9F7] border border-[#E5E5E5] rounded p-2.5 text-sm text-[#2D2D2D] focus:bg-white focus:border-[#4A7C59] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="block text-xs font-bold text-[#2D2D2D]">
                        Phone Number (Mobile) <span className="text-[#4A7C59]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 07123 456789"
                        className="w-full bg-[#F9F9F7] border border-[#E5E5E5] rounded p-2.5 text-sm text-[#2D2D2D] focus:bg-white focus:border-[#4A7C59] transition-all"
                      />
                    </div>

                    {/* Year Group */}
                    <div className="space-y-1.5">
                      <label htmlFor="yearGroup" className="block text-xs font-bold text-[#2D2D2D]">
                        Student Year Group
                      </label>
                      <select
                        id="yearGroup"
                        value={formData.yearGroup}
                        onChange={e => setFormData({ ...formData, yearGroup: e.target.value })}
                        className="w-full bg-[#F9F9F7] border border-[#E5E5E5] rounded p-2.5 text-sm text-[#2D2D2D] focus:bg-white focus:border-[#4A7C59] transition-all"
                      >
                        <option value="Year 9 (Building Foundations)">Year 9 (Building Foundations)</option>
                        <option value="Year 10 (GCSE Prep)">Year 10 (GCSE Prep)</option>
                        <option value="Year 11 (Exam Year)">Year 11 (Exam Year)</option>
                        <option value="Adult / Resit">Adult / Resit</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Focus Area */}
                    <div className="space-y-1.5">
                      <label htmlFor="struggleArea" className="block text-xs font-bold text-[#2D2D2D]">
                        Key Focus Area
                      </label>
                      <select
                        id="struggleArea"
                        value={formData.struggleArea}
                        onChange={e => setFormData({ ...formData, struggleArea: e.target.value })}
                        className="w-full bg-[#F9F9F7] border border-[#E5E5E5] rounded p-2.5 text-sm text-[#2D2D2D] focus:bg-white focus:border-[#4A7C59] transition-all"
                      >
                        <option value="Algebra & Equations">Algebra &amp; Equations</option>
                        <option value="Geometry & Trigonometry">Geometry &amp; Trigonometry</option>
                        <option value="Word Problems & Reasoning">Word Problems &amp; Reasoning</option>
                        <option value="Exam Speed & Confidence">Exam Speed &amp; Confidence</option>
                      </select>
                    </div>

                    {/* Mode Preference */}
                    <div className="space-y-1.5">
                      <label htmlFor="mode" className="block text-xs font-bold text-[#2D2D2D]">
                        Session Preference
                      </label>
                      <select
                        id="mode"
                        value={formData.mode}
                        onChange={e => setFormData({ ...formData, mode: e.target.value })}
                        className="w-full bg-[#F9F9F7] border border-[#E5E5E5] rounded p-2.5 text-sm text-[#2D2D2D] focus:bg-white focus:border-[#4A7C59] transition-all"
                      >
                        <option value="In-Person (Sale, M33)">In-Person (Sale, M33)</option>
                        <option value="Online (Zoom)">Online (Zoom)</option>
                        <option value="Flexible / Hybrid">Flexible / Hybrid</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-xs font-bold text-[#2D2D2D]">
                      Additional Notes or Questions
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Looking for weekly Tuesday evening sessions before mock exams."
                      className="w-full bg-[#F9F9F7] border border-[#E5E5E5] rounded p-2.5 text-sm text-[#2D2D2D] focus:bg-white focus:border-[#4A7C59] transition-all"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto bg-[#4A7C59] text-white font-semibold text-base py-3 px-8 rounded hover:bg-[#3A6346] active:bg-[#2D4D36] transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#4A7C59]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Logging Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Enquiry</span>
                        </>
                      )}
                    </button>

                    <span className="text-xs text-[#666666]">
                      Logged directly to owner's spreadsheet.
                    </span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Contact & Location Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp CTA Card */}
            <div className="bg-white p-6 rounded border border-[#E5E5E5] space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded bg-[#4A7C59]/10 text-[#4A7C59]">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#2D2D2D]">
                    Prefer WhatsApp?
                  </h3>
                  <p className="text-xs text-[#666666]">
                    Get a fast response directly from Tia.
                  </p>
                </div>
              </div>

              <a
                href={getWhatsAppMessageUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#4A7C59] text-white font-semibold text-sm py-3 px-4 rounded hover:bg-[#3A6346] active:bg-[#2D4D36] transition-all flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+44 7402 786523)</span>
              </a>
            </div>

            {/* Address & Direct Details Card */}
            <div className="bg-white p-6 rounded border border-[#E5E5E5] space-y-4">
              <h3 className="font-serif font-bold text-base text-[#2D2D2D] pb-2 border-b border-[#E5E5E5]">
                Real Business Location
              </h3>

              <div className="space-y-3.5 text-xs text-[#2D2D2D]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#2D2D2D]">Tutoring Premises Address:</span>
                    <p className="text-[#666666]">
                      First Floor, 19B School Rd, Cheshire, Sale M33 7XX, UK
                    </p>
                    <a
                      href="https://maps.google.com/?q=First+Floor,+19B+School+Rd,+Sale+M33+7XX,+UK"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4A7C59] font-semibold hover:underline inline-block mt-1"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#4A7C59] shrink-0" />
                  <div>
                    <span className="font-bold block text-[#2D2D2D]">Phone Number:</span>
                    <a
                      href="tel:+447402786523"
                      className="text-[#4A7C59] font-semibold hover:underline tabular-nums"
                    >
                      +44 7402 786523
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#4A7C59] shrink-0" />
                  <div>
                    <span className="font-bold block text-[#2D2D2D]">Area Served:</span>
                    <span className="text-[#666666]">Sale, Altrincham, Timperley, Trafford &amp; Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Owner Spreadsheet Access Notice */}
            <div className="bg-[#F9F9F7] p-4 rounded border border-[#E5E5E5] text-xs space-y-1.5">
              <span className="font-bold text-[#2D2D2D] flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-[#4A7C59]" />
                Owner Log &amp; Google Sheets Export
              </span>
              <p className="text-[#666666] leading-relaxed">
                All submitted enquiries are formatted as CSV rows with timestamps. Owner can download the log file directly via{' '}
                <a href="/api/enquiries/csv" className="text-[#4A7C59] underline font-semibold">
                  /api/enquiries/csv
                </a>.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';
