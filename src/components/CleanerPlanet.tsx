import React from 'react';
import { ArrowRight, Leaf, Trees, Globe } from 'lucide-react';

interface CleanerPlanetProps {
  onExploreMission: () => void;
}

export const CleanerPlanet: React.FC<CleanerPlanetProps> = ({ onExploreMission }) => {
  return (
    <section id="planet" className="py-20 bg-zinc-100 border-t border-zinc-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-zinc-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Text Block */}
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
              A GREENER TOMORROW
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
              Together for a Cleaner Planet
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              Choose electric. Choose a sustainable future. By shifting your daily commute to Elescoo, you eliminate tailpipe emissions and accelerate the transition toward renewable mobility.
            </p>

            <div className="pt-2">
              <button
                onClick={onExploreMission}
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Explore Our Mission</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Metrics Block matching image.png */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full lg:w-auto text-center sm:text-left">
            {/* Metric 1 */}
            <div className="flex sm:flex-col items-center sm:items-start gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-black text-zinc-950">0 Tonne</p>
                <p className="text-xs text-zinc-500 mt-0.5">Emissions (per year)</p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex sm:flex-col items-center sm:items-start gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <Trees className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-black text-zinc-950">100K+</p>
                <p className="text-xs text-zinc-500 mt-0.5">Trees Equivalent</p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex sm:flex-col items-center sm:items-start gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-black text-zinc-950">A Cleaner</p>
                <p className="text-xs text-zinc-500 mt-0.5">Tomorrow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
