import React from 'react';
import {
  ShieldCheck,
  Target,
  Eye,
  Users,
  Sparkles,
  Recycle,
  FileCheck,
  Leaf
} from 'lucide-react';

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
            Building a Better E-Waste Ecosystem
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
            eDonationHUB aims to connect electronic device donors with NGOs
            and encourage the responsible reuse and recycling of electronic
            waste.
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

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Our Mission
              </h2>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Our mission is to make electronic device donation easier by
                connecting donors with NGOs. We aim to encourage the reuse of
                working devices and responsible recycling of devices that can
                no longer be used.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-emerald-700 font-bold uppercase tracking-wider">
              Reuse, Donate and Recycle
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
                <Eye className="h-6 w-6" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Our Vision
              </h2>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Our vision is to support a digitally inclusive society where
                usable electronic devices can help people in need and
                electronic waste is managed responsibly to reduce its
                environmental impact.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-emerald-700 font-bold uppercase tracking-wider">
              Digital Inclusion and Sustainability
            </div>
          </div>

        </div>
      </section>

      {/* Core Pillars */}
      <section className="bg-gray-50 py-16 px-4 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why eDonationHUB is Different
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              A simple approach to electronic device donation and responsible
              e-waste management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <Sparkles className="h-8 w-8 text-emerald-600 mb-4" />

              <h3 className="text-lg font-bold text-gray-900">
                Device Image Verification
              </h3>

              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Donors can submit device images with their donation requests
                to help identify the electronic items being donated.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <ShieldCheck className="h-8 w-8 text-emerald-600 mb-4" />

              <h3 className="text-lg font-bold text-gray-900">
                Responsible Data Handling
              </h3>

              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Donors should back up important files and remove their
                personal information from devices before donating them.
                The platform does not claim certified data destruction.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <Users className="h-8 w-8 text-emerald-600 mb-4" />

              <h3 className="text-lg font-bold text-gray-900">
                Connecting Donors with NGOs
              </h3>

              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                eDonationHUB aims to connect donors and NGOs to support the
                donation of usable electronic devices to people who need them.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Government Rules and Standards */}
      <section className="py-16 max-w-6xl mx-auto px-4">

        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Rules and Guidelines
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
            E-Waste Regulations and Standards
          </h2>

          <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto mt-3 leading-relaxed">
            Our project refers to Indian e-waste regulations and recognised
            environmental standards to promote responsible electronic waste
            management. These references do not mean that eDonationHUB itself
            holds any of the certifications listed below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl">
            <FileCheck className="h-8 w-8 text-emerald-600 mb-4" />

            <h3 className="font-bold text-gray-900 text-sm">
              E-Waste (Management) Rules, 2022
            </h3>

            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Government of India rules for environmentally sound management
              of electronic waste.
            </p>

            <a
              href="https://moef.gov.in/uploads/2022/11/E-Waste-Management-Rules-2022.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
            >
              Read Official Rules →
            </a>
          </div>

          <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl">
            <ShieldCheck className="h-8 w-8 text-emerald-600 mb-4" />

            <h3 className="font-bold text-gray-900 text-sm">
              CPCB Guidelines
            </h3>

            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Guidance from the Central Pollution Control Board on e-waste
              management and applicable requirements.
            </p>

            <a
              href="https://cpcb.nic.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
            >
              Visit CPCB Website →
            </a>
          </div>

          <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl">
            <Recycle className="h-8 w-8 text-emerald-600 mb-4" />

            <h3 className="font-bold text-gray-900 text-sm">
              Extended Producer Responsibility (EPR)
            </h3>

            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              A regulatory approach that places specified e-waste management
              responsibilities on covered producers.
            </p>

            <a
              href="https://cpcb.nic.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
            >
              Learn More →
            </a>
          </div>

          <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl">
            <Leaf className="h-8 w-8 text-emerald-600 mb-4" />

            <h3 className="font-bold text-gray-900 text-sm">
              ISO 14001
            </h3>

            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              An international standard for environmental management systems.
              It is a standard, not a certification held by this project.
            </p>

            <a
              href="https://www.iso.org/iso-14001-environmental-management.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
            >
              About the Standard →
            </a>
          </div>

        </div>

        <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
          Note: eDonationHUB is a student project. No government approval,
          CPCB authorisation, ISO certification, EPR certificate, or
          certified data-destruction service is claimed by this page.
          Any future claims about partner organisations must be supported
          by valid documentation.
        </p>

      </section>
    </div>
  );
};
