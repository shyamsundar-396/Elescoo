import React, { useState } from 'react';
import batteryImg from '../assets/images/elescoo_tech_battery_1788778265834.jpg';
import motorImg from '../assets/images/elescoo_tech_motor_1788778291217.jpg';
import appImg from '../assets/images/elescoo_tech_app_1788778313196.jpg';
import brakeImg from '../assets/images/elescoo_tech_brake_1788778338817.jpg';

export const AdvancedTechnology: React.FC = () => {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  const techCards = [
    {
      id: 'battery',
      title: 'Smart Battery',
      subtitle: 'Longer life. Higher efficiency.',
      image: batteryImg,
      badge: 'LFP Chem IP67',
      bullets: [
        'Automotive-grade cells tested up to 60°C ambient temperatures',
        'Intelligent BMS monitoring 36 cell parameters in real-time',
        'Overcharge, thermal runaway & short-circuit protection suite',
      ],
    },
    {
      id: 'motor',
      title: 'Intelligent Motor',
      subtitle: 'Smooth & responsive.',
      image: motorImg,
      badge: 'Permanent Magnet Hub',
      bullets: [
        '94% peak energy efficiency with frictionless magnetic rotor',
        'Instantaneous torque delivery from 0 RPM with zero lag',
        'Integrated regenerative kinetic braking recovers up to 12% energy',
      ],
    },
    {
      id: 'app',
      title: 'Connected App',
      subtitle: 'Your ride, in your hands.',
      image: appImg,
      badge: 'iOS & Android Sync',
      bullets: [
        'Live vehicle GPS tracking, geo-fencing, and anti-theft immobilization',
        'Remote battery charging health & range estimator',
        'Over-The-Air (OTA) continuous feature and performance updates',
      ],
    },
    {
      id: 'safety',
      title: 'Safety First',
      subtitle: 'Better control. Greater safety.',
      image: brakeImg,
      badge: 'Dual Disc + CBS / ABS',
      bullets: [
        'Front and rear hydraulic ventilated discs with braided steel lines',
        'Bosch dual-channel ABS module prevents wheel lockup on wet tarmac',
        'Emergency brake light strobe triggers on rapid deceleration',
      ],
    },
  ];

  return (
    <section id="technology" className="py-24 bg-zinc-950 text-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching image.png */}
        <div className="mb-14">
          <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
            INNOVATION DRIVES US
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-2">
            Advanced Technology
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-2 max-w-2xl">
            Built with cutting-edge technology for a smarter, safer and more connected ride.
          </p>
        </div>

        {/* 4 Tech Cards Grid matching image.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCards.map((tech, index) => {
            const isExpanded = activeModule === index;
            return (
              <div
                key={tech.id}
                onClick={() => setActiveModule(isExpanded ? null : index)}
                className={`relative rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                  isExpanded
                    ? 'border-white bg-zinc-900 shadow-2xl scale-[1.02]'
                    : 'border-white/10 bg-zinc-900/60 hover:border-white/30 hover:bg-zinc-900'
                }`}
              >
                {/* Tech Aspect Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={tech.image}
                    alt={tech.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-zinc-300 border border-white/10">
                    {tech.badge}
                  </span>
                </div>

                {/* Text Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold tracking-tight text-white">{tech.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1 font-medium">{tech.subtitle}</p>

                  {/* Expandable Specifications */}
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                    {tech.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                        <span className="leading-snug">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
