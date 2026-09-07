import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ElescooLogo } from './ElescooLogo';
import { ScooterModel } from '../types';

interface FooterProps {
  onSelectScooterByName: (modelName: string) => void;
  onOpenTestRide: () => void;
  onOpenStores: () => void;
  onOpenCompare: () => void;
  onNavigateSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectScooterByName,
  onOpenTestRide,
  onOpenStores,
  onOpenCompare,
  onNavigateSection,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-zinc-950 text-white border-t border-white/10 select-none">
      {/* Top Newsletter & Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
              JOIN THE REVOLUTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
              Stay Connected With Elescoo
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-md">
              Receive early access to new firmware releases, showroom openings, and special EV incentives.
            </p>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-5 py-3 rounded-full text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thank you! You are on the Elescoo VIP list.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-80 px-4 py-3 rounded-full bg-zinc-900 border border-white/15 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-zinc-950 hover:bg-zinc-200 rounded-full font-bold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <ElescooLogo className="h-6 w-auto text-white" />
              <span className="text-xl font-black tracking-wider text-white">ELESCOO</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              India&apos;s next-generation electric mobility brand. Engineered with aerospace precision, high-capacity thermal-safe battery architecture, and seamless cloud connectivity.
            </p>
            <div className="pt-2 text-xs text-zinc-400 space-y-1">
              <p>Customer Care: 1800-419-3537 (Toll Free)</p>
              <p>Email: support@elescoo-ev.com</p>
              <p>Headquarters: Indiranagar, Bengaluru, Karnataka 560038</p>
            </div>
          </div>

          {/* Column 1: Scooters */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300">
              Electric Scooters
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => onSelectScooterByName('Elescoo X1')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Elescoo X1 (Everyday)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectScooterByName('Elescoo X2')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Elescoo X2 (Sport)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectScooterByName('Elescoo X3')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Elescoo X3 (Premium)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectScooterByName('Elescoo X4')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Elescoo X4 (Adventure)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCompare}
                  className="hover:text-white font-semibold text-zinc-300 transition-colors cursor-pointer"
                >
                  Compare All Models →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Tech & Calculators */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300">
              Ownership & Tools
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => onNavigateSection('savings')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Savings Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('emi-calculator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  EMI Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('technology')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Smart Battery Chemistry
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('performance')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Performance Specs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('planet')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sustainability Mission
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Hubs & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300">
              Experience
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  onClick={onOpenTestRide}
                  className="hover:text-white font-semibold text-emerald-400 transition-colors cursor-pointer"
                >
                  Book Free Test Ride
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStores}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Experience Centers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('faqs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('reviews')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Customer Reviews
                </button>
              </li>
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Warranty & Roadmap
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-white/10 text-xs text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 Elescoo Electric Mobility Pvt. Ltd. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition-colors">
            FAME-II Compliance
          </a>
        </div>
      </div>
    </footer>
  );
};
