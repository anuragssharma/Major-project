import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      {/* Top Banner / Newsletter */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <img src="/logo-icon.png" alt="Logo Icon" className="h-6 w-6 object-contain bg-white rounded-full p-0.5" />
              Join India's Zero-Landfill Movement
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Receive quarterly e-waste compliance updates, collection drive alerts, and NGO impact reports.
            </p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter corporate or personal email"
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-72"
            />
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition shrink-0 flex items-center gap-1.5">
              Subscribe <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Col 1: Brand Logo & Certification Statement */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="inline-block bg-white p-2 rounded-xl">
            <img 
              src="/logo.png" 
              alt="eDonationHUB" 
              className="h-8 w-auto object-contain" 
            />
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
            India's audited digital platform connecting verified individual and enterprise donors directly with educational NGOs and CPCB-authorized zero-landfill e-waste recyclers.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 rounded-xl px-3 py-2 w-fit">
            <ShieldCheck className="h-4 w-4" />
            NIST 800-88 Sanitization & CPCB Certified Facilities
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-emerald-400 transition">Home</Link></li>
            <li><Link to="/impact" className="hover:text-emerald-400 transition">Our Impact & ESG</Link></li>
            <li><Link to="/about" className="hover:text-emerald-400 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-400 transition">Contact & Schedule</Link></li>
            <li><Link to="/register" className="hover:text-emerald-400 transition">Donate Hardware</Link></li>
          </ul>
        </div>

        {/* Col 3: Programs & Solutions */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Programs</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-emerald-400 transition">Corporate ITAD & EPR</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-400 transition">Society Eco-Bin Drives</Link></li>
            <li><Link to="/register" className="hover:text-emerald-400 transition">NGO Tech Grants</Link></li>
            <li><Link to="/about" className="hover:text-emerald-400 transition">Data Erasure Standard</Link></li>
            <li><Link to="/impact" className="hover:text-emerald-400 transition">Urban Mining & Carbon Offset</Link></li>
          </ul>
        </div>

        {/* Col 4: Central Support Desk */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contact & Help</h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Ghatkopar, Mumbai, Maharashtra 400086</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>+91 90000 00123 <br/> +91 91111 00123</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>ops@edonationhub.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>© {new Date().getFullYear()} eDonationHUB. Central Pollution Control Board (CPCB) & E-Waste Management Rules Compliant.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-gray-300 transition">Privacy Policy</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-gray-300 transition">Data Destruction Guarantee</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-gray-300 transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};