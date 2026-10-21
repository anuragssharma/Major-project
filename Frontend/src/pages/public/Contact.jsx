import React, { useState } from 'react';
import { Mail, Phone, Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../api/axios';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: '', text: '' });
    setSubmitting(true);

    try {
      const res = await api.post('/messages', formData);
      setAlert({
        type: 'success',
        text: res.data?.message || 'Your inquiry has been submitted directly to the NGO team!'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setAlert({
        type: 'error',
        text: err.response?.data?.message || 'Failed to send inquiry. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          Get in Touch
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4">
          Contact Us
        </h1>

        <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
          Have a question about donating electronic devices? Send our NGO team a message directly.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Details Column */}
        <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-3xl p-7 sm:p-8">
          <MessageCircle className="h-9 w-9 text-emerald-300 mb-5" />

          <h2 className="text-2xl font-bold">Let's Connect</h2>

          <p className="text-sm text-emerald-100 mt-3 leading-relaxed">
            We welcome your questions, suggestions, and feedback about eDonationHUB.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-emerald-300 mt-1 shrink-0" />
              <div>
                <p className="text-sm font-semibold">Email</p>
                <a
                  href="mailto:anuragssharma392@gmail.com"
                  className="text-sm text-emerald-100 hover:text-white break-all"
                >
                  anuragssharma392@gmail.com
                </a>
                <a
                  href="mailto:maneniraj12.2006@gmail.com"
                  className="block text-sm text-emerald-100 hover:text-white break-all mt-1"
                >
                  maneniraj12.2006@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-emerald-300 mt-1 shrink-0" />
              <div>
                <p className="text-sm font-semibold">Phone</p>
                <a href="tel:+917900040123" className="block text-sm text-emerald-100 hover:text-white">
                  +91 79000 40123
                </a>
                <a href="tel:+918591697323" className="block text-sm text-emerald-100 hover:text-white mt-1">
                  +91 85916 97323
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/20">
            <p className="text-xs text-emerald-100 leading-relaxed">
              eDonationHUB — E-Waste Donation Platform
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Send Us a Message</h2>
          <p className="text-sm text-gray-500 mt-2 mb-6">
            Fill in the details below. Messages go straight to the NGO operations desk.
          </p>

          {alert.text && (
            <div
              className={`mb-5 p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                alert.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {alert.type === 'success' ? (
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              )}
              <span>{alert.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is your inquiry about?"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message..."
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#054425] hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-sm disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};