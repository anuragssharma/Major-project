import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Building2,
  FileCheck2,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Truck,
  HardDrive,
  AlertCircle
} from 'lucide-react';

export const Contact = () => {
  // Accordion state for technical and regulatory FAQs
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const regionalCenters = [
    {
      city: 'Ghatkopar Central Logistics (HQ)',
      address: 'Plot 42, LBS Marg, Near Ghatkopar West Industrial Area, Mumbai, Maharashtra 400086',
      contact: '+91 22 2501 4400',
      timings: 'Mon – Sat: 09:30 AM – 06:30 PM (Sunday Closed)',
      notes: 'Accepts all categories: servers, monitors, laptops, smartphones, peripherals, and heavy office telecom units.'
    },
    {
      city: 'Andheri East Intake Depot',
      address: 'Gala No. 4, Marol Cooperative Industrial Estate, Andheri-Kurla Road, Mumbai, Maharashtra 400059',
      contact: '+91 22 2850 8812',
      timings: 'Mon – Fri: 10:00 AM – 06:00 PM',
      notes: 'Specialized walk-in terminal with on-site mechanical shredding observation for enterprise magnetic media.'
    },
    {
      city: 'Navi Mumbai Processing Hub',
      address: 'TTC Industrial Area, MIDC Mahape, Navi Mumbai, Maharashtra 400710',
      contact: '+91 22 2778 3319',
      timings: 'Mon – Sat: 09:00 AM – 07:00 PM',
      notes: 'Primary CPCB/MPCB certified recovery, dismantling, and precious metals zero-landfill triage facility.'
    },
    {
      city: 'Pune Regional Collection Point',
      address: 'Bhosari Industrial Estate, Sector 10, MIDC Pune, Maharashtra 411026',
      contact: '+91 20 2712 5590',
      timings: 'Mon – Fri: 09:30 AM – 05:30 PM',
      notes: 'Coordinated intake depot serving collegiate hardware donations and IT corridors in Hinjewadi.'
    }
  ];

  const faqs = [
    {
      question: 'How do I donate if I cannot visit a physical walk-in center?',
      answer:
        'You do not need to deliver hardware in person. Individual donors and organizations can register on the portal, upload device photos for automated verification, and select a doorstep pickup date and time window. A courier will collect items directly from your address.'
    },
    {
      question: 'What happens to sensitive private data stored on hard drives and phones?',
      answer:
        'Storage drives on functional devices undergo certified NIST 800-88 multi-pass cryptographic data wiping before handover to classrooms. Drives that fail wiping or originate from non-functional devices undergo mechanical puncturing and industrial degaussing to ensure irreversible destruction.'
    },
    {
      question: 'Do you provide formal documentation for corporate compliance and ESG reporting?',
      answer:
        'Yes. Registered bulk consumers and institutions receive a Certificate of Safe Recycling and a Certificate of Certified Data Erasure bearing statutory CPCB/MPCB registration details for audit filing and CSR/EPR documentation.'
    },
    {
      question: 'What types of electronic waste are accepted?',
      answer:
        'We process consumer and enterprise IT hardware including laptops, desktop computers, servers, networking switches, flat-panel monitors, tablets, mobile handsets, charging peripherals, and lead-acid/lithium backup batteries. We do not accept radioactive materials or unpackaged hazardous chemical waste.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-extrabold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Directory & Support Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Contact Channels & Authorized Collection Depots
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Reach out to our compliance teams, verify regional walk-in drop locations, or schedule doorstep e-waste logistics across Maharashtra.
          </p>
        </div>

        {/* Primary Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Direct Helplines</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Connect with our donor support desk for logistics queries or bulk corporate disposal audits.
              </p>
            </div>
            <div className="space-y-1 pt-3 border-t text-sm font-semibold text-gray-800">
              <div>Toll-Free: 1800-267-9090</div>
              <div className="text-xs text-gray-500">Regional Desk: +91 22 2501 4400</div>
              <div className="text-[11px] text-emerald-700">Mon – Sat: 9:00 AM – 7:00 PM IST</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Official Correspondence</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Inquiries regarding NGO partnership onboarding, statutory compliance audits, and institutional CSR.
              </p>
            </div>
            <div className="space-y-1 pt-3 border-t text-sm font-semibold text-gray-800">
              <div>General: contact@edonationhub.org</div>
              <div className="text-xs text-gray-500">NGO Desk: verification@edonationhub.org</div>
              <div className="text-xs text-gray-500">Audits: compliance@edonationhub.org</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Headquarters</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Administrative coordination operations and technical intake hub in Mumbai.
              </p>
            </div>
            <div className="space-y-1 pt-3 border-t text-xs text-gray-700 leading-relaxed">
              <div className="font-bold text-gray-900">eDonationHUB Central Office</div>
              <div>Plot 42, LBS Marg, Near Ghatkopar West Station</div>
              <div>Mumbai, Maharashtra, PIN 400086, India</div>
            </div>
          </div>
        </div>

        {/* Doorstep Pickup Callout */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
              <Truck className="h-4 w-4" /> Seamless Home & Office Logistics
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Looking to schedule a doorstep collection?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Submit your hardware online, let Gemini AI inspect photo authenticity, pick your preferred morning or afternoon window, and hand over equipment safely.
            </p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-white text-emerald-950 font-bold px-6 py-3.5 rounded-2xl text-sm hover:bg-emerald-50 transition shadow-sm shrink-0"
          >
            <span>Initiate Donation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Authorized Regional Walk-In Centers */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Authorized Walk-In Drop-Off Centers</h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Physical drop points equipped with secure intake containers and asset custody receipts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regionalCenters.map((center, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4 hover:border-emerald-500 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{center.city}</span>
                  </h3>
                  <span className="text-[10px] font-bold uppercase bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md">
                    Verified
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {center.address}
                </p>

                <div className="bg-gray-50 rounded-2xl p-3.5 space-y-1.5 text-xs text-gray-700">
                  <div className="flex items-center gap-2 font-medium">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                    <span>{center.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    <span>{center.timings}</span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 italic leading-relaxed border-t pt-2">
                  {center.notes}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Security & Statutory Compliance Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <HardDrive className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Certified Data Sanitization</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every donated phone, laptop, and hard drive undergoes multi-pass sanitization conforming to NIST Special Publication 800-88 Revision 1 guidelines. Media that cannot be purged is degaussed and shredded.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">CPCB Regulatory Alignment</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Disposal logistics follow the E-Waste (Management) Rules under the Ministry of Environment, Forest and Climate Change. All non-functional components are routed exclusively to state-authorized recyclers.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">NGO Vetting Standards</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Educational institutions and welfare NGOs undergo mandatory administrative scrutiny, including government registration validation and premises checks, prior to receiving functional electronics.
            </p>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-gray-900 font-bold text-xl mb-2">
            <HelpCircle className="h-5 w-5 text-emerald-600" />
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left flex items-center justify-between gap-4 font-bold text-gray-800 text-sm hover:text-emerald-700 transition"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 text-gray-400 ${
                      openFaq === idx ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="mt-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Operating Disclosure */}
        <div className="p-4 bg-gray-100/70 border border-gray-200 rounded-2xl flex items-start gap-3 text-xs text-gray-500">
          <AlertCircle className="h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
          <span>
            eDonationHUB operates as a non-profit technology bridge connecting hardware donors with verified non-profits and CPCB-authorized e-waste recyclers. Drop-off centers issue physical custody slips upon handover. For commercial bulk auctions or decommissioned enterprise IT assets exceeding 50 units, contact our institutional coordination desk.
          </span>
        </div>
      </div>
    </div>
  );
};