
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
  Building2,
  Home as HomeIcon,
  ChevronDown,
  Sparkles,
  ArrowRight,
  School,
  CheckCircle2,
  ShieldCheck,
  Recycle,
  HeartHandshake
} from 'lucide-react';

export const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('it');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const categories = {
    it: [
      {
        name: 'Laptops & MacBooks',
        desc: 'Working devices can be donated for reuse and learning.',
        icon: Laptop
      },
      {
        name: 'Smartphones & Tablets',
        desc: 'Old mobile devices and tablets can be submitted for donation.',
        icon: Smartphone
      },
      {
        name: 'Desktop Workstations & CPUs',
        desc: 'Donate old desktop computers and computing equipment.',
        icon: Cpu
      },
      {
        name: 'Servers & Data Center Racks',
        desc: 'Submit old servers and other business computing equipment.',
        icon: Server
      }
    ],
    peripherals: [
      {
        name: 'Monitors & LED Displays',
        desc: 'Submit old monitors and electronic display equipment.',
        icon: Tv
      },
      {
        name: 'Printers & Scanners',
        desc: 'Old printers and scanners can be submitted for review.',
        icon: Printer
      },
      {
        name: 'Hard Drives & Storage Devices',
        desc: 'Include old storage devices in your donation request.',
        icon: HardDrive
      },
      {
        name: 'Cables, Adapters & Chargers',
        desc: 'Submit unused cables, adapters, and other accessories.',
        icon: Cable
      }
    ]
  };

  const faqs = [
    {
      q: 'What electronic devices can I donate?',
      a: 'You can submit devices such as laptops, computers, mobile phones, tablets, and other electronic equipment. Their suitability depends on the donation process.'
    },
    {
      q: 'How can I submit a donation request?',
      a: 'Register or sign in to the platform and provide the required details and image of your electronic device.'
    },
    {
      q: 'How does the donation process work?',
      a: 'Users submit their device details through the platform. NGOs can connect with donors to help coordinate suitable donations.'
    },
    {
      q: 'What is the role of NGOs?',
      a: 'NGOs can connect with donors and help identify suitable electronic devices for people and communities in need.'
    },
    {
      q: 'What should I do with unusable electronic devices?',
      a: 'Devices that cannot be reused should be directed to appropriate e-waste collection or recycling channels instead of regular household waste.'
    }
  ];

  return (
    <div className="bg-white">

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-gray-50 pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            E-Waste Donation & Responsible Recycling
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Give Your Old Electronics A <br className="hidden md:block" />
            <span className="text-emerald-600">
              Second Life
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Give your unused electronic devices a chance to be reused.
            eDonationHUB aims to connect donors with NGOs and encourage
            responsible electronic waste management.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-emerald-600/25 transition flex items-center gap-2"
            >
              Donate a Device
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to="/impact"
              className="bg-white border border-gray-300 hover:border-emerald-500 text-gray-800 px-8 py-4 rounded-xl font-bold transition shadow-sm"
            >
              View Our Impact
            </Link>
          </div>

          {/* Four Information Cards */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">

            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-3">
              <Recycle className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-gray-900">
                  Responsible E-Waste
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Encourage proper handling and recycling
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-3">
              <HeartHandshake className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-gray-900">
                  Connect Donors & NGOs
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Support electronic device donations
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-3">
              <Laptop className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-gray-900">
                  Support Device Reuse
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Give working devices a second life
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-3">
              <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-gray-900">
                  Transparent Process
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Follow your donation request
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Electronic Devices Section */}
      <section className="py-16 max-w-6xl mx-auto px-4">

        <div className="text-center mb-10">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Inventory Coverage
          </span>

          <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
            What Electronics Can You Donate or Recycle?
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Explore the types of electronic devices that can be submitted
            through the platform.
          </p>

          <div className="inline-flex mt-6 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setActiveTab('it')}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition ${
                activeTab === 'it'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Computing & Mobile Tech
            </button>

            <button
              onClick={() => setActiveTab('peripherals')}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition ${
                activeTab === 'peripherals'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
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
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition"
              >
                <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="font-bold text-gray-900 text-base">
                  {cat.name}
                </h3>

                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Donation Pathways */}
      <section className="bg-gray-50 py-16 px-4 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              Tailored Solutions
            </span>

            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
              Donation Pathways For Every Donor
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              A simple way for individuals, societies, and businesses
              to submit electronic donation requests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                  <HomeIcon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  Individual & Household Donors
                </h3>

                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  Donate old mobile phones, tablets, chargers, and computers.
                  Working devices can be useful for students and people
                  who need access to technology.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  to="/register"
                  className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  Donate Your Devices
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-5">
                  <School className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  Housing Societies
                </h3>

                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  Societies can collect old electronic devices from residents
                  at one place and explore suitable donation or recycling
                  options.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  to="/contact"
                  className="text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
                  <Building2 className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  Companies & Offices
                </h3>

                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  Companies can submit details of old computers and other
                  electronic equipment for donation.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  to="/contact"
                  className="text-sm font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Donation Process - Dark Green Background */}
      <section className="bg-emerald-950 py-16 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-400">
              Simple Steps
            </span>

            <h2 className="text-3xl font-extrabold text-white mt-1">
              From Donation Request to NGO Connection
            </h2>

            <p className="text-emerald-100 text-sm mt-2">
              Follow these simple steps to submit your electronic donation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="p-6 rounded-2xl bg-white border border-gray-200 text-center shadow-sm">
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-4">
                1
              </div>

              <h4 className="font-bold text-gray-900 text-sm mb-1.5">
                Register or Sign In
              </h4>

              <p className="text-xs text-gray-500 leading-relaxed">
                Create an account or sign in to access the platform.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200 text-center shadow-sm">
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-4">
                2
              </div>

              <h4 className="font-bold text-gray-900 text-sm mb-1.5">
                Submit Device Details
              </h4>

              <p className="text-xs text-gray-500 leading-relaxed">
                Add the required information and image of your device.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200 text-center shadow-sm">
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-4">
                3
              </div>

              <h4 className="font-bold text-gray-900 text-sm mb-1.5">
                Connect with NGOs
              </h4>

              <p className="text-xs text-gray-500 leading-relaxed">
                Connect with NGOs to explore suitable donation opportunities.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200 text-center shadow-sm">
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-4">
                4
              </div>

              <h4 className="font-bold text-gray-900 text-sm mb-1.5">
                Follow Request Status
              </h4>

              <p className="text-xs text-gray-500 leading-relaxed">
                Check the status of your donation request on the platform.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. How eDonationHUB Works */}
      <section className="bg-emerald-50 py-14 px-4 border-y border-emerald-100">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              Our Platform
            </span>

            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">
              How eDonationHUB Works
            </h2>

            <p className="text-gray-600 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              Our platform helps donors submit electronic device donation
              requests and supports connections with NGOs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white p-7 rounded-2xl border border-emerald-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Laptop className="h-6 w-6" />
                </div>

                <span className="text-3xl font-black text-emerald-100">01</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900">
                Submit a Donation Request
              </h3>

              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                Donors provide details and images of the electronic devices
                they wish to donate through the platform.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-emerald-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                <span className="text-3xl font-black text-emerald-100">02</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900">
                Review Donation Details
              </h3>

              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                Donation details help donors and NGOs understand the devices
                available for potential donation.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-emerald-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <School className="h-6 w-6" />
                </div>

                <span className="text-3xl font-black text-emerald-100">03</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900">
                Connect with NGOs
              </h3>

              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                The platform aims to help suitable donated devices reach
                people and communities in need.
              </p>
            </div>

          </div>

          <div className="text-center mt-8">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-sm"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. Frequently Asked Questions */}
      <section className="py-16 max-w-4xl mx-auto px-4">

        <div className="text-center mb-10">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Common Questions
          </span>

          <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Find answers to common questions about electronic donations.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-5 flex justify-between items-center bg-white hover:bg-gray-50 font-bold text-gray-800 text-sm md:text-base"
              >
                <span>{faq.q}</span>

                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                    openFaq === index
                      ? 'rotate-180 text-emerald-600'
                      : ''
                  }`}
                />
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

    </div>
  );
};
