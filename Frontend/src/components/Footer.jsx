
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div className="space-y-4">
          <Link to="/" className="inline-block bg-white p-2 rounded-xl">
            <img
              src="/logo.png"
              alt="eDonationHUB"
              className="h-8 w-auto object-contain"
            />
          </Link>

          <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
            eDonationHUB connects electronic device donors with NGOs
            and supports responsible e-waste management.
          </p>

          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            Responsible E-Waste Management
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            Explore
          </h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-emerald-400 transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-emerald-400 transition">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/impact" className="hover:text-emerald-400 transition">
                Our Impact
              </Link>
            </li>

            <li>
              <Link to="/register" className="hover:text-emerald-400 transition">
                Donate a Device
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-emerald-400 transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            Contact & Help
          </h4>

          <ul className="space-y-4 text-sm text-gray-400">

            {/* Phone Numbers */}
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />

              <div className="space-y-1">
                <p>+91 79000 40123</p>
                <p>+91 85916 97323</p>
              </div>
            </li>

            {/* Email Addresses */}
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />

              <div className="space-y-2 break-all">
                <p>
                  <a
                    href="mailto:anuragssharma392@gmail.com"
                    className="hover:text-emerald-400 transition"
                  >
                    anuragssharma392@gmail.com
                  </a>
                </p>

                <p>
                  <a
                    href="mailto:maneniraj12.2006@gmail.com"
                    className="hover:text-emerald-400 transition"
                  >
                    maneniraj12.2006@gmail.com
                  </a>
                </p>
              </div>
            </li>

          </ul>

          <Link
            to="/contact"
            className="inline-block text-sm text-emerald-400 hover:text-emerald-300 transition"
          >
            Open Contact Form →
          </Link>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-3">

          <p>
            © {new Date().getFullYear()} eDonationHUB. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-gray-300 transition">
              About
            </Link>

            <Link to="/contact" className="hover:text-gray-300 transition">
              Contact
            </Link>
          </div>

        </div>
      </div>

    </footer>
  );
};
