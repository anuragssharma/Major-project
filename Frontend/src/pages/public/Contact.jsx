import React, { useState } from 'react';
import { Mail, Phone, Send, MessageCircle } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipient = 'anuragssharma392@gmail.com';
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );

    window.location.href =
      `mailto:${recipient}?subject=${subject}&body=${body}`;
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
          Have a question about donating electronic devices?
          Send us a message and we will get back to you.
        </p>
      </div>

      {/* Contact Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Contact Details */}
        <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-3xl p-7 sm:p-8">
          <MessageCircle className="h-9 w-9 text-emerald-300 mb-5" />

          <h2 className="text-2xl font-bold">
            Let's Connect
          </h2>

          <p className="text-sm text-emerald-100 mt-3 leading-relaxed">
            We welcome your questions, suggestions, and feedback about
            eDonationHUB.
          </p>

          <div className="mt-8 space-y-6">

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-emerald-300 mt-1 shrink-0" />

              <div>
                <p className="text-sm font-semibold">
                  Email
                </p>

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
                <p className="text-sm font-semibold">
                  Phone
                </p>

                <a
                  href="tel:+917900040123"
                  className="block text-sm text-emerald-100 hover:text-white"
                >
                  +91 79000 40123
                </a>

                <a
                  href="tel:+918591697323"
                  className="block text-sm text-emerald-100 hover:text-white mt-1"
                >
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

          <h2 className="text-xl font-bold text-gray-900">
            Send Us a Message
          </h2>

          <p className="text-sm text-gray-500 mt-2 mb-6">
            Fill in the details below to prepare your message.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is your message about?"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              <Send className="h-4 w-4" />
              Prepare Email
            </button>

          </form>
        </div>
      </div>

      {/* Simple Footer Note */}
      <p className="max-w-3xl mx-auto text-center text-xs text-gray-500 mt-8">
        Thank you for your interest in eDonationHUB and responsible
        electronic device donation.
      </p>

    </div>
  );
};
