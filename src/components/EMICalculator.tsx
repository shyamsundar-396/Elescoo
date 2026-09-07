import React, { useState } from 'react';
import { Calculator, CreditCard, ShieldCheck } from 'lucide-react';
import { SCOOTER_MODELS } from '../data/scooters';

interface EMICalculatorProps {
  onBookNow: () => void;
}

export const EMICalculator: React.FC<EMICalculatorProps> = ({ onBookNow }) => {
  const [selectedScooterId, setSelectedScooterId] = useState(SCOOTER_MODELS[1].id);
  const currentScooter = SCOOTER_MODELS.find((s) => s.id === selectedScooterId) || SCOOTER_MODELS[0];

  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [tenureMonths, setTenureMonths] = useState(36);
  const [interestRate, setInterestRate] = useState(8.9);

  const vehiclePrice = currentScooter.startingPrice;
  const downPaymentAmount = Math.round((vehiclePrice * downPaymentPercent) / 100);
  const principal = vehiclePrice - downPaymentAmount;

  // Monthly EMI calculation formula:
  // EMI = [P x R x (1+R)^N]/[(1+R)^N-1] where R is monthly interest rate
  const monthlyRate = interestRate / 12 / 100;
  const emi =
    monthlyRate > 0
      ? Math.round(
          (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
            (Math.pow(1 + monthlyRate, tenureMonths) - 1)
        )
      : Math.round(principal / tenureMonths);

  const totalAmount = emi * tenureMonths;
  const totalInterest = Math.max(0, totalAmount - principal);

  return (
    <section id="emi-calculator" className="py-24 bg-[#F8F9FA] text-zinc-950 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
            FLEXIBLE OWNERSHIP
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950 mt-2">
            Smart EMI Calculator
          </h2>
          <p className="text-zinc-500 text-base mt-2">
            Take home your dream Elescoo EV with bespoke financing starting at just ₹2,499/month.
          </p>
        </div>

        {/* Model Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {SCOOTER_MODELS.map((scooter) => (
            <button
              key={scooter.id}
              onClick={() => setSelectedScooterId(scooter.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                selectedScooterId === scooter.id
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'bg-white text-zinc-700 hover:bg-zinc-200 border border-zinc-200'
              }`}
            >
              {scooter.name} (₹{scooter.startingPrice.toLocaleString('en-IN')})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders Box */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-zinc-200/80 shadow-sm space-y-7">
            {/* Down payment slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-zinc-900">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span className="text-base font-black text-zinc-950 bg-zinc-100 px-3 py-1 rounded-full">
                  ₹ {downPaymentAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-zinc-950 cursor-pointer h-2 bg-zinc-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                <span>0% (Zero Down Payment)</span>
                <span>30%</span>
                <span>60%</span>
              </div>
            </div>

            {/* Tenure Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-zinc-900">Loan Tenure</label>
                <span className="text-base font-black text-zinc-950 bg-zinc-100 px-3 py-1 rounded-full">
                  {tenureMonths} Months ({tenureMonths / 12} Years)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[12, 24, 36, 48].map((m) => (
                  <button
                    key={m}
                    onClick={() => setTenureMonths(m)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      tenureMonths === m
                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                        : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border-zinc-200'
                    }`}
                  >
                    {m} Months
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-zinc-900">Interest Rate</label>
                <span className="text-base font-black text-zinc-950 bg-zinc-100 px-3 py-1 rounded-full">
                  {interestRate}% p.a.
                </span>
              </div>
              <input
                type="range"
                min={6.5}
                max={14}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-zinc-950 cursor-pointer h-2 bg-zinc-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                <span>6.5% (Special EV Rate)</span>
                <span>9.9%</span>
                <span>14%</span>
              </div>
            </div>
          </div>

          {/* Outcome Card */}
          <div className="lg:col-span-5 bg-zinc-950 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-zinc-400 text-xs font-bold tracking-wider uppercase">
                <span>ESTIMATED MONTHLY EMI</span>
                <Calculator className="w-4 h-4 text-white" />
              </div>

              <div className="mt-3">
                <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                  ₹ {emi.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-zinc-400 font-semibold ml-2">/ month</span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                For {currentScooter.name} with ₹{downPaymentAmount.toLocaleString('en-IN')} upfront
              </p>
            </div>

            {/* Breakdown List */}
            <div className="space-y-3 py-4 border-y border-zinc-800 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span>Vehicle Ex-Showroom Price</span>
                <span className="font-semibold text-white">
                  ₹ {vehiclePrice.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Principal Loan Amount</span>
                <span className="font-semibold text-white">
                  ₹ {principal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Total Interest Payable</span>
                <span className="font-semibold text-amber-400">
                  ₹ {totalInterest.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-zinc-300 pt-1 border-t border-zinc-800/80 font-bold">
                <span>Total Cost of Loan</span>
                <span className="text-white">₹ {(principal + totalInterest).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={onBookNow}
                className="w-full py-4 bg-white hover:bg-zinc-100 text-zinc-950 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Reserve with Instant Finance</span>
              </button>
              <p className="text-[11px] text-zinc-400 text-center mt-3 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Paperless instant approval with top partner banks
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
