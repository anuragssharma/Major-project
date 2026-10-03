import React from 'react';
import { ShieldCheck, Target, Eye, Users, Award, Cpu, Sparkles } from 'lucide-react';

export const About = () => {
  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-emerald-50/60 to-white py-16 px-4 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Our Purpose & Vision
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mt-4">
            Building India’s Most Transparent <br/> E-Waste Ecosystem
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
            Founded to bridge the digital gap between urban technological surplus and grassroots community deficit, eDonationHUB provides an auditable, AI-assisted platform for electronic lifecycle disposition.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                To divert obsolete and functional electronic hardware from informal landfills by connecting verified individual and corporate donors directly with vetted non-profits, while channeling irrecoverable assets into state-of-the-art CPCB-compliant recovery plants.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-emerald-700 font-bold uppercase tracking-wider">
              Responsible Lifecycle Allocation
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                A digitally inclusive, zero-e-waste society where every decommissioned device either lights up an educational classroom or supplies pure raw materials back to industrial manufacturing without environmental cost.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-emerald-700 font-bold uppercase tracking-wider">
              Zero Landfill & Circular Economy
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="bg-gray-50 py-16 px-4 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Why eDonationHUB is Different</h2>
            <p className="text-gray-500 text-sm mt-1">Audited security, AI authentication, and verifiable social returns.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <Sparkles className="h-8 w-8 text-emerald-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Gemini AI Image Forensics</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Donated items undergo visual authenticity analysis to ensure genuine physical devices are registered, preventing invalid submissions and optimizing logistical dispatch.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <ShieldCheck className="h-8 w-8 text-emerald-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">NIST 800-88 Data Sanitization</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                We safeguard personal and enterprise security. Storage media is either overwritten using cryptographic data erasure or mechanically destroyed before device re-allocation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <Users className="h-8 w-8 text-emerald-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Direct NGO Verification</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                NGO registrations require statutory registration proof, FCRA/12A/80G validation, and manual admin authorization to ensure devices reach genuine welfare programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Certifications */}
      <section className="py-16 max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Adherence to Statutory Standards</h2>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto leading-relaxed mb-8">
          Our partner recycling facilities operate in compliance with the Central Pollution Control Board (CPCB) E-Waste (Management) Rules, ISO 14001, and R2 Standard practices.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <div className="font-bold text-gray-900 text-sm">CPCB Authorized</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Pollution Board Certified</div>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <div className="font-bold text-gray-900 text-sm">ISO 14001 & 9001</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Environmental Standards</div>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <div className="font-bold text-gray-900 text-sm">EPR Fulfillment</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Corporate Accountability</div>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <div className="font-bold text-gray-900 text-sm">DoD / NIST Sanitized</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Zero Data Liability</div>
          </div>
        </div>
      </section>
    </div>
  );
};