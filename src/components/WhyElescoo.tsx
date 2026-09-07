import React from 'react';
import { Cpu, Navigation, Zap, Shield, ArrowRight } from 'lucide-react';
import rearHighwayImg from '../assets/images/elescoo_rear_highway_1788778125798.jpg';

interface WhyElescooProps {
  onLearnMore: () => void;
}

export const WhyElescoo: React.FC<WhyElescooProps> = ({ onLearnMore }) => {
  const pillars = [
    {
      icon: Cpu,
      title: 'Smart Technology',
      desc: 'Connected. Always.',
      detail: 'Real-time vehicle telemetry, remote diagnostics, and OTA feature upgrades.',
    },
    {
      icon: Navigation,
      title: 'Long Range',
      desc: 'Go further.',
      detail: 'Up to 250 km real-world endurance with smart energy recuperation.',
    },
    {
      icon: Zap,
      title: 'Fast Charging',
      desc: 'Less wait. More ride.',
      detail: 'Gain 50 km in 15 minutes via the Elescoo Hypercharger network.',
    },
    {
      icon: Shield,
      title: 'Premium Build',
      desc: 'Made to last.',
      detail: 'High-tensile steel tubular chassis with automotive-grade robotic welds.',
    },
  ];

  return (
    <section id="why-elescoo" className="py-24 bg-[#F8F9FA] text-zinc-950 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 4 Core Pillars matching image.png */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
                THE ELESCOO ADVANTAGE
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950 mt-2">
                Why Elescoo
              </h2>
              <p className="text-zinc-500 text-base sm:text-lg mt-2">
                More than just a ride. It&apos;s a lifestyle.
              </p>
            </div>

            {/* 4 Pillars Grid matching icon + bold title + caption */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 mb-3 group-hover:bg-zinc-950 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-zinc-950 tracking-tight">
                      {pillar.title}
                    </h4>
                    <p className="text-xs font-semibold text-zinc-800 mt-0.5">{pillar.desc}</p>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-snug">{pillar.detail}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs rounded-full tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Panoramic Scenic Highway Visual matching image.png */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 group">
              <img
                src={rearHighwayImg}
                alt="Elescoo Electric Scooter on Scenic Highway at Dusk"
                referrerPolicy="no-referrer"
                className="w-full h-[460px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <p className="font-bold text-sm">Everyday Freedom</p>
                  <p className="text-xs text-zinc-300">Quiet highways. Pure electric serenity.</p>
                </div>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                  Zero Tailpipe Emissions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
