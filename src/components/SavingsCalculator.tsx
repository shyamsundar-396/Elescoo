import React, { useState } from 'react';
import { Fuel, Zap, TrendingUp, Sparkles } from 'lucide-react';

export const SavingsCalculator: React.FC = () => {
  const [dailyKm, setDailyKm] = useState(35);
  const [petrolPrice, setPetrolPrice] = useState(104);
  const [petrolMileage, setPetrolMileage] = useState(40);
  const [elecTariff, setElecTariff] = useState(7.5);

  // Petrol math:
  // Daily liters = dailyKm / petrolMileage
  // Monthly petrol = (dailyKm / petrolMileage) * petrolPrice * 30
  const monthlyPetrolCost = Math.round((dailyKm / petrolMileage) * petrolPrice * 30);

  // EV math:
  // Elescoo average efficiency ~ 0.022 kWh / km
  // Monthly units = dailyKm * 0.022 * 30
  // Monthly EV cost = units * elecTariff
  const monthlyEvCost = Math.round(dailyKm * 0.022 * 30 * elecTariff);

  const monthlySavings = Math.max(0, monthlyPetrolCost - monthlyEvCost);
  const yearlySavings = monthlySavings * 12;
  const fiveYearSavings = yearlySavings * 5;

  // CO2 saved: ~0.045 kg per km vs petrol scooter
  const yearlyCo2SavedKg = Math.round(dailyKm * 365 * 0.045);

  return (
    <section id="savings" className="py-24 bg-white text-zinc-950 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
            COST INTELLIGENCE
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950 mt-2">
            How Much Can You Save With Electric?
          </h2>
          <p className="text-zinc-500 text-base mt-2">
            Calculate your direct fuel savings by switching from petrol to an Elescoo smart electric scooter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Sliders */}
          <div className="lg:col-span-7 bg-[#F8F9FA] rounded-3xl p-8 border border-zinc-200/80 shadow-sm space-y-7">
            {/* Slider 1: Daily Commute Distance */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-zinc-900">
                  Daily Commute Distance
                </label>
                <span className="text-base font-black text-zinc-950 bg-white px-3 py-1 rounded-full border border-zinc-200">
                  {dailyKm} km / day
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={120}
                step={5}
                value={dailyKm}
                onChange={(e) => setDailyKm(Number(e.target.value))}
                className="w-full accent-zinc-950 cursor-pointer h-2 bg-zinc-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                <span>10 km</span>
                <span>60 km</span>
                <span>120 km</span>
              </div>
            </div>

            {/* Slider 2: Current Petrol Price */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-zinc-900">
                  Petrol Price in Your City
                </label>
                <span className="text-base font-black text-zinc-950 bg-white px-3 py-1 rounded-full border border-zinc-200">
                  ₹ {petrolPrice} / Litre
                </span>
              </div>
              <input
                type="range"
                min={90}
                max={125}
                step={1}
                value={petrolPrice}
                onChange={(e) => setPetrolPrice(Number(e.target.value))}
                className="w-full accent-zinc-950 cursor-pointer h-2 bg-zinc-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                <span>₹90/L</span>
                <span>₹105/L</span>
                <span>₹125/L</span>
              </div>
            </div>

            {/* Slider 3: Petrol Scooter Mileage */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-zinc-900">
                  Petrol Scooter Fuel Economy
                </label>
                <span className="text-base font-black text-zinc-950 bg-white px-3 py-1 rounded-full border border-zinc-200">
                  {petrolMileage} km / Litre
                </span>
              </div>
              <input
                type="range"
                min={25}
                max={60}
                step={1}
                value={petrolMileage}
                onChange={(e) => setPetrolMileage(Number(e.target.value))}
                className="w-full accent-zinc-950 cursor-pointer h-2 bg-zinc-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                <span>25 km/L</span>
                <span>40 km/L</span>
                <span>60 km/L</span>
              </div>
            </div>

            {/* Slider 4: Home Electricity Tariff */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-zinc-900">
                  Electricity Cost per Unit
                </label>
                <span className="text-base font-black text-zinc-950 bg-white px-3 py-1 rounded-full border border-zinc-200">
                  ₹ {elecTariff} / kWh
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={15}
                step={0.5}
                value={elecTariff}
                onChange={(e) => setElecTariff(Number(e.target.value))}
                className="w-full accent-zinc-950 cursor-pointer h-2 bg-zinc-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                <span>₹4 / unit</span>
                <span>₹8 / unit</span>
                <span>₹15 / unit</span>
              </div>
            </div>
          </div>

          {/* Right Column: Comparative Results & Real-time Returns */}
          <div className="lg:col-span-5 space-y-6">
            {/* Monthly Comparison Pill */}
            <div className="bg-zinc-950 text-white rounded-3xl p-7 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider uppercase text-zinc-400">
                  MONTHLY COMMUTE BILL
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  Save {Math.round((monthlySavings / (monthlyPetrolCost || 1)) * 100)}%
                </span>
              </div>

              {/* Visual Comparative Bars */}
              <div className="space-y-4">
                {/* Petrol Cost Bar */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <Fuel className="w-3.5 h-3.5 text-amber-400" /> Petrol Scooter
                    </span>
                    <span className="text-zinc-200">₹{monthlyPetrolCost.toLocaleString('en-IN')} / mo</span>
                  </div>
                  <div className="w-full h-3.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-full" />
                  </div>
                </div>

                {/* Elescoo EV Cost Bar */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" /> Elescoo Electric
                    </span>
                    <span className="text-emerald-400 font-bold">₹{monthlyEvCost.toLocaleString('en-IN')} / mo</span>
                  </div>
                  <div className="w-full h-3.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, Math.max(8, (monthlyEvCost / (monthlyPetrolCost || 1)) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Net Savings Box */}
              <div className="pt-4 border-t border-zinc-800 grid grid-cols-3 gap-3 text-center">
                <div className="bg-zinc-900 p-3 rounded-2xl border border-white/5">
                  <p className="text-xs text-zinc-400">Monthly</p>
                  <p className="text-lg font-black text-white mt-0.5">
                    ₹{monthlySavings.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="bg-zinc-900 p-3 rounded-2xl border border-white/5">
                  <p className="text-xs text-zinc-400">1 Year</p>
                  <p className="text-lg font-black text-emerald-400 mt-0.5">
                    ₹{yearlySavings.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="bg-zinc-900 p-3 rounded-2xl border border-white/5">
                  <p className="text-xs text-zinc-400">5 Years</p>
                  <p className="text-lg font-black text-emerald-400 mt-0.5">
                    ₹{fiveYearSavings.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>

            {/* Environmental Bonus Card */}
            <div className="bg-emerald-50 border border-emerald-200/80 p-5 rounded-3xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-emerald-950">
                  {yearlyCo2SavedKg.toLocaleString()} kg CO₂ avoided per year
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5 leading-snug">
                  Equivalent to planting {Math.round(yearlyCo2SavedKg / 20)} mature trees in your neighborhood.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
