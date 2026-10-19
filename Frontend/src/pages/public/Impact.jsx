import React from 'react';
import {
  Leaf,
  Recycle,
  School,
  HeartHandshake,
  Globe,
  CheckCircle
} from 'lucide-react';

export const Impact = () => {
  return (
    <div className="bg-white">

      {/* Header */}
      <section className="bg-gradient-to-b from-emerald-50/70 to-white py-16 px-4 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center">

          <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            Our Social & Environmental Goals
          </span>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mt-4">
            Making a Positive Impact
          </h1>

          <p className="text-gray-600 text-base md:text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
            eDonationHUB aims to make electronic device donation easier,
            support people in need, and encourage responsible e-waste
            management.
          </p>

        </div>
      </section>

      {/* Impact Areas */}
      <section className="max-w-6xl mx-auto py-14 px-4">

        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Our Impact Areas
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Three simple ways our platform aims to make a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
              <School className="h-6 w-6" />
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              Digital Access
            </h3>

            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Donated working devices can help students and people who
              need access to computers and digital learning.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-5">
              <Recycle className="h-6 w-6" />
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              Responsible E-Waste Management
            </h3>

            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Devices that cannot be reused should be directed towards
              appropriate e-waste recycling channels.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-5">
              <HeartHandshake className="h-6 w-6" />
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              Community Support
            </h3>

            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              The platform aims to connect donors and NGOs to make
              electronic device donation more accessible.
            </p>
          </div>

        </div>
      </section>


      {/* Environmental Benefits */}
      <section className="max-w-6xl mx-auto py-14 px-4">

        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Environmental Benefits
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Small steps towards a more sustainable future.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-200">
            <CheckCircle className="h-6 w-6 text-emerald-600 shrink-0 mt-1" />

            <div>
              <h3 className="font-bold text-gray-900">
                Extend Device Life
              </h3>

              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Reusing working electronics can help reduce unnecessary
                disposal and make better use of existing devices.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-200">
            <CheckCircle className="h-6 w-6 text-emerald-600 shrink-0 mt-1" />

            <div>
              <h3 className="font-bold text-gray-900">
                Reduce Electronic Waste
              </h3>

              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Responsible collection and recycling can help reduce
                improper disposal of electronic products.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-200">
            <Globe className="h-6 w-6 text-emerald-600 shrink-0 mt-1" />

            <div>
              <h3 className="font-bold text-gray-900">
                Support Sustainability
              </h3>

              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Responsible electronic waste management supports
                environmental protection and resource conservation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-200">
            <Leaf className="h-6 w-6 text-emerald-600 shrink-0 mt-1" />

            <div>
              <h3 className="font-bold text-gray-900">
                Promote Digital Inclusion
              </h3>

              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Donating usable devices can create opportunities for
                learning and access to digital resources.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Closing Note */}
      <section className="bg-emerald-50 border-t border-emerald-100 py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Every Device Can Make a Difference
          </h2>

          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            eDonationHUB aims to bring donors and NGOs together to encourage
            device reuse, digital access, and responsible e-waste management.
          </p>
        </div>
      </section>

    </div>
  );
};
