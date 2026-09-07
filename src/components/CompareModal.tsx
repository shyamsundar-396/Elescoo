import React from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import { SCOOTER_MODELS } from '../data/scooters';
import { ScooterModel } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScooter: (scooter: ScooterModel) => void;
  onBookTestRide: (scooter: ScooterModel) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  onSelectScooter,
  onBookTestRide,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 text-zinc-950">
        {/* Header */}
        <div className="p-6 sm:p-8 bg-zinc-950 text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
              AUTOMOTIVE BENCHMARK
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              Compare Elescoo Lineup
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Side-by-side technical evaluation across all 4 models.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto p-4 sm:p-8">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="py-4 px-3 text-xs font-bold text-zinc-400 uppercase tracking-wider w-1/5">
                  Specification
                </th>
                {SCOOTER_MODELS.map((scooter) => (
                  <th key={scooter.id} className="py-4 px-3 w-1/5 text-center">
                    <img
                      src={scooter.heroImage}
                      alt={scooter.name}
                      referrerPolicy="no-referrer"
                      className="w-24 h-16 object-contain mx-auto mb-2"
                    />
                    <div className="font-extrabold text-base text-zinc-950">{scooter.name}</div>
                    <div className="text-[11px] text-zinc-500 font-medium">{scooter.tagline}</div>
                    <div className="text-sm font-black text-zinc-950 mt-1">
                      ₹{scooter.startingPrice.toLocaleString('en-IN')}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs sm:text-sm">
              <tr>
                <td className="py-3.5 px-3 font-bold text-zinc-600">Certified Range</td>
                {SCOOTER_MODELS.map((s) => (
                  <td key={s.id} className="py-3.5 px-3 text-center font-extrabold text-zinc-950">
                    {s.specs.range} km
                  </td>
                ))}
              </tr>
              <tr className="bg-zinc-50/60">
                <td className="py-3.5 px-3 font-bold text-zinc-600">Top Speed</td>
                {SCOOTER_MODELS.map((s) => (
                  <td key={s.id} className="py-3.5 px-3 text-center font-bold text-zinc-900">
                    {s.specs.topSpeed} km/h
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-zinc-600">Acceleration (0-40)</td>
                {SCOOTER_MODELS.map((s) => (
                  <td key={s.id} className="py-3.5 px-3 text-center text-zinc-700">
                    {s.specs.acceleration}
                  </td>
                ))}
              </tr>
              <tr className="bg-zinc-50/60">
                <td className="py-3.5 px-3 font-bold text-zinc-600">Battery Capacity</td>
                {SCOOTER_MODELS.map((s) => (
                  <td key={s.id} className="py-3.5 px-3 text-center text-zinc-700 font-medium">
                    {s.specs.batteryCapacity}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-zinc-600">Peak Motor Power</td>
                {SCOOTER_MODELS.map((s) => (
                  <td key={s.id} className="py-3.5 px-3 text-center text-zinc-700">
                    {s.specs.motorPower}
                  </td>
                ))}
              </tr>
              <tr className="bg-zinc-50/60">
                <td className="py-3.5 px-3 font-bold text-zinc-600">Fast Charging Rate</td>
                {SCOOTER_MODELS.map((s) => (
                  <td key={s.id} className="py-3.5 px-3 text-center text-zinc-700">
                    {s.specs.fastCharging}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-zinc-600">Boot Space</td>
                {SCOOTER_MODELS.map((s) => (
                  <td key={s.id} className="py-3.5 px-3 text-center text-zinc-700">
                    {s.specs.bootSpace}
                  </td>
                ))}
              </tr>
              <tr className="bg-zinc-50/60">
                <td className="py-3.5 px-3 font-bold text-zinc-600">Vehicle Warranty</td>
                {SCOOTER_MODELS.map((s) => (
                  <td key={s.id} className="py-3.5 px-3 text-center text-zinc-700 font-medium">
                    {s.specs.warranty}
                  </td>
                ))}
              </tr>
              {/* Action Rows */}
              <tr>
                <td className="py-4 px-3 font-bold text-zinc-600">Reserve or Test Ride</td>
                {SCOOTER_MODELS.map((s) => (
                  <td key={s.id} className="py-4 px-3 text-center">
                    <div className="flex flex-col gap-1.5 items-center">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectScooter(s);
                        }}
                        className="w-full py-2 bg-zinc-950 text-white rounded-full text-xs font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        Explore
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onBookTestRide(s);
                        }}
                        className="w-full py-1.5 border border-zinc-300 text-zinc-800 rounded-full text-[11px] font-semibold hover:border-zinc-950 cursor-pointer"
                      >
                        Book Ride
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
