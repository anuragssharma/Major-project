import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Laptop,
  Smartphone,
  Server,
  Printer,
  HardDrive,
  Cpu,
  Tv,
  Cable,
  Truck,
  ShieldCheck,
  FileCheck2,
  Building2,
  Home as HomeIcon,
  ChevronDown,
  Sparkles,
  ArrowRight,
  School,
  CheckCircle2,
  Flame,
  Award,
  BarChart3
} from 'lucide-react';

export const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('it');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const categories = {
    it: [
      { name: "Laptops & MacBooks", desc: "Working units donated to schools; dead units stripped for rare metals.", icon: Laptop },
      { name: "Smartphones & Tablets", desc: "Erased of personal data and refurbished for digital learning initiatives.", icon: Smartphone },
      { name: "Desktop Workstations & CPUs", desc: "Core computing processors salvaged for education labs.", icon: Cpu },
      { name: "Servers & Data Center Racks", desc: "De-racked, asset tagged, and shredded under enterprise ITAD.", icon: Server }
    ],
    peripherals: [
      { name: "Monitors & LED Displays", desc: "Safely handled to prevent mercury bulb breakage and landfill leaching.", icon: Tv },
      { name: "Printers, Scanners & Toners", desc: "Non-biodegradable plastics and printer logic boards recycled safely.", icon: Printer },
      { name: "Hard Drives, SSDs & Flash", desc: "100% cryptographic wipe or DoD 5220.22-M physical shredding.", icon: HardDrive },
      { name: "Cables, Adapters & Chargers", desc: "Pure high-grade copper recovery through insulation granulators.", icon: Cable }
    ]
  };

  const faqs = [
    {
      q: "Is doorstep collection free?",
      a: "Yes, doorstep pickup is 100% free for 5 or more electronic devices across major cities. For individual items, donors can drop them off at affiliated regional eco-hubs or pool them during scheduled society drives."
    },
    {
      q: "How do you guarantee our private and corporate data is destroyed?",
      a: "We adhere strictly to NIST 800-88 and DoD 5220.22-M sanitization standards. Working storage units receive a 3-pass cryptographic wipe, while damaged or end-of-life memory drives are mechanically shredded into sub-12mm fragments."
    },
    {
      q: "What is the Green Certificate and who receives it?",
      a: "Every verified donor (individual, housing society, or corporate enterprise) receives an authentic Green Certificate specifying the total kilograms of e-waste diverted, estimated carbon reduction, and serial registration numbers."
    },
    {
      q: "How does eDonationHUB select and audit beneficiary NGOs?",
      a: "Non-profits must submit official 12A/80G registrations and government credentials. Our central administrators manually review and verify every application before allowing NGOs to claim refurbished hardware."
    },
    {
      q: "Can our company fulfill Extended Producer Responsibility (EPR) targets through you?",
      a: "Yes. We partner with Central Pollution Control Board (CPCB) registered recyclers to provide end-to-end documentation, passbooks, and EPR fulfillment compliance records."
    }
  ];

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-gray-50 pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            AI-Audited Redistribution & Zero-Landfill E-Waste Recycling
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Give Your Old Electronics A <br className="hidden md:block" />
            <span className="text-emerald-600  decoration-emerald-300 ">
              Second Life
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't let working tech gather dust or rot in toxic scrap dumps. Connect directly with vetted non-profits to empower classrooms, or route obsolete hardware to CPCB-authorized recovery centers.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-emerald-600/25 transition flex items-center gap-2"
            >
              Donate Hardware Now <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/impact"
              className="bg-white border border-gray-300 hover:border-gray-400 text-gray-800 px-8 py-4 rounded-xl font-bold transition shadow-sm"
            >
              View Verified ESG Impact
            </Link>
          </div>

          {/* Core Trust Indicators */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-3">
              <Truck className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-gray-900">Doorstep Pickup</div>
                <div className="text-xs text-gray-500">Free collection for 5+ items</div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-3">
              <HardDrive className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-gray-900">NIST Data Wiped</div>
                <div className="text-xs text-gray-500">Military-grade multi-pass erasure</div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-3">
              <FileCheck2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-gray-900">Green Certificate</div>
                <div className="text-xs text-gray-500">Official carbon offset metrics</div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-3">
              <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-gray-900">Audited NGOs</div>
                <div className="text-xs text-gray-500">Direct classroom distribution</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive "What We Accept & Recycle" Section */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Inventory Coverage</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-1">What Electronics Can You Donate or Recycle?</h2>
          <p className="text-sm text-gray-500 mt-2">We manage both working equipment for social reuse and dead units for safe metallurgical recovery.</p>
          
          {/* Tab Selector */}
          <div className="inline-flex mt-6 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setActiveTab('it')}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition ${
                activeTab === 'it' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Computing & Mobile Tech
            </button>
            <button
              onClick={() => setActiveTab('peripherals')}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition ${
                activeTab === 'peripherals' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Displays & Peripherals
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories[activeTab].map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition">
                <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">{cat.name}</h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{cat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Three Audiences (Individual / Society / Corporate) */}
      <section className="bg-gray-50 py-16 px-4 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Tailored Solutions</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">Donation Pathways For Every Donor</h2>
            <p className="text-gray-500 text-sm mt-1">Whether you are clearing a single home drawer or decommissioning a 500-seat corporate office.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                  <HomeIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Individual & Household Donors</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  Declutter cupboards of old chargers, tablets, and computers. Functional gadgets receive fresh operating systems and directly empower underprivileged students.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link to="/register" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                  Book Free Home Pickup <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-5">
                  <School className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Housing Societies & RWAs</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  Host an Eco-Collection Weekend in your apartment complex. We provide branded secure bins, arrange reverse logistics, and issue a collective certificate of appreciation.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link to="/contact" className="text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1">
                  Organize Society Drive <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Enterprises & Data Centers</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  Secure ITAD solutions: on-site serial scanning, witnessed data degaussing, de-branding, and statutory CPCB Extended Producer Responsibility (EPR) reporting.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link to="/contact" className="text-sm font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1">
                  Schedule Corporate ITAD <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Complete 4-Step Process Section */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-600">Traceable Lifecycle</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-1">From Your Doorstep to Classroom or Recycler</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200 text-center shadow-sm">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-4 shadow">
              1
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1.5">Upload & AI Inspection</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Upload hardware details. Built-in Gemini AI verifies photos to ensure authentic physical hardware registration.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 text-center shadow-sm">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-4 shadow">
              2
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1.5">Doorstep Coordination</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Our verified logistics partners coordinate doorstep collection or accept package pooling across regional eco-hubs.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 text-center shadow-sm">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-4 shadow">
              3
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1.5">Data Sanitization & Triage</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Storage drives undergo 3-pass NIST wiping. Usable units go to vetted NGOs; defunct parts enter certified refining.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 text-center shadow-sm">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-4 shadow">
              4
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1.5">Impact Certification</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Download your official Green Certificate documenting kilograms diverted from landfills and net carbon reduction.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Enterprise Security & Compliance Callout */}
      <section className="bg-emerald-950 text-white py-14 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="h-4 w-4" /> 100% Zero-Data Liability Guarantee
            </div>
            <h3 className="text-2xl md:text-3xl font-black">
              Enterprise-Grade Data Destruction on Every Device
            </h3>
            <p className="mt-3 text-sm text-emerald-200 leading-relaxed">
              Data privacy is our foremost priority. Before any computer or phone is routed to a school or recovery facility, storage hardware is processed under stringent NIST 800-88 and DoD 5220.22-M sanitation algorithms.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Multi-Pass Cryptographic Wipe</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Physical Disk Shredding (Sub-12mm)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Serialized Destruction Logs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Tamper-Proof Audit Manifests</span>
              </div>
            </div>
          </div>
          <div className="bg-emerald-900/60 border border-emerald-800 p-6 rounded-2xl space-y-4">
            <h4 className="font-bold text-lg text-emerald-100 flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-400" />
              Green Certificate & Auditable ESG Compliance
            </h4>
            <p className="text-xs text-emerald-200 leading-relaxed">
              Each donation generates an official verification slip used by companies for annual BRSR reporting, CSR electronics documentation, and CPCB audits.
            </p>
            <div className="pt-2">
              <Link
                to="/register"
                className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-5 py-2.5 rounded-xl text-xs inline-block transition"
              >
                Create Account & Request Certificate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion Section */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Common Questions</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-1">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-sm mt-1">Everything you need to know about our collection, recycling, and NGO partners.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-5 flex justify-between items-center bg-white hover:bg-gray-50 font-bold text-gray-800 text-sm md:text-base"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${openFaq === index ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>
              {openFaq === index && (
                <div className="px-5 pb-5 text-sm text-gray-600 bg-white border-t border-gray-100 pt-3 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Bottom Conversion Banner */}
      <section className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-black">
            Ready to Dispose of E-Waste Responsibly?
          </h2>
          <p className="text-emerald-100 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Join thousands of conscientious citizens and corporations making a measurable difference for education and the environment.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black px-8 py-3.5 rounded-xl shadow-lg transition"
            >
              Start E-Waste Donation
            </Link>
            <Link
              to="/contact"
              className="bg-emerald-950/60 hover:bg-emerald-950 text-white font-bold px-7 py-3.5 rounded-xl border border-emerald-600/40 transition"
            >
              Contact Operations Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};