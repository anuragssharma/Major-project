import React from 'react';
import { Leaf, ShieldAlert, Award, Globe, School, Cpu, CheckCircle } from 'lucide-react';

export const Impact = () => {
  return (
    <div className="bg-white">
      {/* Impact Header */}
      <div className="bg-gradient-to-b from-emerald-50/70 to-white py-16 px-4 border-b border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            Transparent Environmental & Social Governance (ESG)
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mt-4">
            Our Footprint in Numbers
          </h1>
          <p className="text-gray-600 text-base md:text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
            Every discarded electronic component carries toxic heavy metals or the potential to educate an aspiring student. Through rigorous lifecycle segregation, eDonationHUB produces quantifiable ecological benefits.
          </p>
        </div>
      </div>

      {/* Main Metric Cards */}
      <div className="max-w-6xl mx-auto -mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md text-center">
          <div className="text-4xl font-black text-emerald-600 mb-1">14,850+</div>
          <div className="text-sm font-bold text-gray-800">Kilograms Diverted</div>
          <div className="text-xs text-gray-500 mt-1">Hazardous metals kept out of groundwater</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md text-center">
          <div className="text-4xl font-black text-emerald-600 mb-1">3,420+</div>
          <div className="text-sm font-bold text-gray-800">Devices Refurbished</div>
          <div className="text-xs text-gray-500 mt-1">Laptops & PCs provided to rural schools</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md text-center">
          <div className="text-4xl font-black text-emerald-600 mb-1">29.4 MT</div>
          <div className="text-sm font-bold text-gray-800">CO2 Equivalent Averted</div>
          <div className="text-xs text-gray-500 mt-1">Through life-extension & urban mining</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md text-center">
          <div className="text-4xl font-black text-emerald-600 mb-1">100%</div>
          <div className="text-sm font-bold text-gray-800">CPCB & R2 Compliance</div>
          <div className="text-xs text-gray-500 mt-1">Zero illegal dumping or toxic open burning</div>
        </div>
      </div>

      {/* The Danger of E-Waste Section */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 text-rose-600 font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldAlert className="h-4 w-4" /> The Informal E-Waste Crisis
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
              Over 90% of India's E-Waste is Handled by Unregulated Scrap Yards
            </h2>
            <p className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed">
              Traditional open-air acid bath leaching and cable incineration release toxic neurotoxins into soil and urban air. Lead, mercury, cadmium, and brominated flame retardants bioaccumulate in food chains and cause long-term health crises.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700"><strong>Lead (Pb):</strong> Damages nervous systems and kidneys when leaked from cathode displays.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700"><strong>Mercury (Hg):</strong> Contaminates groundwater when flat screens and switches break down in landfills.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700"><strong>Cadmium (Cd):</strong> Leaches into soil from rechargeable battery assemblies.</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-900 text-white rounded-3xl p-8 space-y-6 shadow-xl">
            <h3 className="text-2xl font-bold">The eDonationHUB Circular Standard</h3>
            <p className="text-emerald-200 text-sm leading-relaxed">
              We intercept equipment prior to informal scrapyards. We triage items into two verified streams:
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-800/60 rounded-xl border border-emerald-700">
                <div className="font-bold text-emerald-100 flex items-center gap-2">
                  <School className="h-5 w-5 text-emerald-300" /> 1. Social Redistribution Stream
                </div>
                <p className="text-xs text-emerald-300 mt-1">
                  Functional devices receive clean OS installations and go directly to orphanages, vocational programs, and community classrooms.
                </p>
              </div>
              <div className="p-4 bg-emerald-800/60 rounded-xl border border-emerald-700">
                <div className="font-bold text-emerald-100 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-emerald-300" /> 2. R2 Certified Urban Mining
                </div>
                <p className="text-xs text-emerald-300 mt-1">
                  Dead motherboards and batteries are mechanically crushed to recover gold, copper, and rare-earth metals with zero landfill residue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Development Goals Supported */}
      <section className="bg-gray-50 py-16 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Aligned with UN Sustainable Development Goals</h2>
            <p className="text-gray-500 text-sm mt-1">Targeted milestones delivering tangible social and environmental progress.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-emerald-700 font-extrabold text-lg mb-2">SDG 4: Quality Education</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                By refurbishing decommissioned laptops and workstations, we enable computer literacy for schools lacking dedicated IT capital expenditure.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-emerald-700 font-extrabold text-lg mb-2">SDG 12: Responsible Consumption</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Fostering an authentic circular economy model through reuse, component salvage, and certified urban mining instead of single-use disposal.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-emerald-700 font-extrabold text-lg mb-2">SDG 13: Climate Action</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Extracting recycled gold and copper uses up to 80% less energy than virgin mining, preventing thousands of tons of greenhouse gas emissions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};