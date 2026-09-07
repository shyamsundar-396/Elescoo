import React from 'react';
import { Zap, Gauge, Clock, Flame, ArrowRight } from 'lucide-react';
import headlightImg from '../assets/images/elescoo_headlight_detail_1788778101824.jpg';

interface PerformanceSectionProps {
  onExploreTechnology: () => void;
}

export const PerformanceSection: React.FC<PerformanceSectionProps> = ({ onExploreTechnology }) => {
  const stats = [
    {
      value: '120',
      unit: 'km/h',
      label: 'Top Speed',
      description: 'Highway cruising with electronic limiters',
      icon: Gauge,
    },
    {
      value: '200',
      unit: 'km',
      label: 'Range',
      description: 'Tested true-city real world endurance',
      icon: Clock,
    },
    {
      value: '0-40',
      unit: 'km/h',
      label: 'Instant Acceleration',
      description: 'In a blistering 2.7 seconds from standstill',
      icon: Flame,
    },
    {
      value: '5.5',
      unit: 'kW',
      label: 'Peak Power',
      description: 'High-torque permanent magnet motor',
      icon: Zap,
    },
  ];

  return (
    <section id="performance" className="relative py-28 bg-zinc-950 text-white overflow-hidden select-none">
      {/* Subtle ambient lighting glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Macro Automotive Headlamp Craft Imagery matching image.png */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
              <img
                src={headlightImg}
                alt="Elescoo LED Headlight and DRL Detail"
                referrerPolicy="no-referrer"
                className="w-full h-[460px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-zinc-300">
                <span className="font-mono tracking-widest uppercase">AERODYNAMIC MATRIX OPTICS</span>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white font-semibold">IP67 Waterproof</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Typography & Metric Blocks */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
                POWER & PERFORMANCE
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-2 leading-[1.05]">
                More Power. <br /> More Possibilities.
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg mt-4 max-w-xl font-normal leading-relaxed">
                Experience instant torque, smooth acceleration and longer range with our advanced electric technology. Every twist of the throttle delivers whisper-quiet, linear velocity.
              </p>
            </div>

            {/* Metric 2x2 Grid */}
            <div className="grid grid-cols-2 gap-6 pt-2">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="p-5 rounded-2xl bg-zinc-900/90 border border-white/10 hover:border-white/25 transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-2 text-zinc-400 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                        {stat.value}
                      </span>
                      <span className="text-sm font-semibold text-zinc-400">{stat.unit}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1.5 leading-snug">{stat.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={onExploreTechnology}
                className="inline-flex items-center text-sm font-bold text-white hover:text-zinc-300 transition-colors group cursor-pointer"
              >
                <span>Discover the Elescoo Powertrain Architecture</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
