import React, { useState } from 'react';
import { ArrowRight, Gauge, Clock, Heart, ArrowUpRight, Check } from 'lucide-react';
import { ScooterModel, ScooterColor } from '../types';

interface FeaturedScootersProps {
  scooters: ScooterModel[];
  wishlistIds: string[];
  onToggleWishlist: (scooterId: string) => void;
  onSelectScooter: (scooter: ScooterModel) => void;
  onBookTestRideForModel: (scooter: ScooterModel) => void;
}

export const FeaturedScooters: React.FC<FeaturedScootersProps> = ({
  scooters,
  wishlistIds,
  onToggleWishlist,
  onSelectScooter,
  onBookTestRideForModel,
}) => {
  // Store selected color for each scooter card
  const [selectedColors, setSelectedColors] = useState<Record<string, ScooterColor>>(() => {
    const initial: Record<string, ScooterColor> = {};
    scooters.forEach((s) => {
      initial[s.id] = s.colors[0];
    });
    return initial;
  });

  const handleColorChange = (scooterId: string, color: ScooterColor) => {
    setSelectedColors((prev) => ({ ...prev, [scooterId]: color }));
  };

  return (
    <section id="featured-scooters" className="py-24 bg-white text-zinc-950 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching image.png */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
              FEATURED MODELS
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 mt-2">
              Find Your Perfect Ride
            </h2>
            <p className="text-zinc-500 text-base mt-2 max-w-lg">
              Explore our range of electric scooters, built for every journey.
            </p>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('compare-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-4 md:mt-0 inline-flex items-center text-sm font-bold text-zinc-950 hover:text-zinc-600 transition-colors group cursor-pointer"
          >
            <span>Compare All Scooters</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Cards Grid from Reference Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scooters.map((scooter) => {
            const activeColor = selectedColors[scooter.id] || scooter.colors[0];
            const isWishlisted = wishlistIds.includes(scooter.id);

            return (
              <div
                key={scooter.id}
                id={`scooter-card-${scooter.slug}`}
                className="group relative bg-[#f8f9fa] border border-zinc-200/80 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-zinc-300"
              >
                {/* Top Bar: Wishlist & Quick Detail Arrow */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-zinc-500 bg-zinc-200/60 px-2.5 py-1 rounded-full">
                    {scooter.tagline.split('|')[0].trim()}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(scooter.id);
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        isWishlisted
                          ? 'text-rose-600 bg-rose-50'
                          : 'text-zinc-400 hover:text-zinc-700 bg-white/80'
                      }`}
                      title="Add to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => onSelectScooter(scooter)}
                      className="p-2 bg-white/80 rounded-full text-zinc-700 hover:text-zinc-950 hover:bg-white shadow-sm transition-all"
                      title="Quick Specs View"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Scooter Product Cutout Image */}
                <div
                  onClick={() => onSelectScooter(scooter)}
                  className="relative my-4 aspect-[4/3] flex items-center justify-center cursor-pointer overflow-hidden rounded-2xl"
                >
                  <img
                    src={activeColor.image}
                    alt={`${scooter.name} in ${activeColor.name}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Interactive Color Swatches */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  {scooter.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorChange(scooter.id, color)}
                      style={{ backgroundColor: color.hex }}
                      className={`w-5 h-5 rounded-full border border-zinc-300 relative transition-transform ${
                        activeColor.id === color.id
                          ? 'ring-2 ring-zinc-950 ring-offset-2 scale-110'
                          : 'hover:scale-105'
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>

                {/* Info Block */}
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-zinc-950">
                    {scooter.name}
                  </h3>
                  <p className="text-xs text-zinc-500 font-medium mt-0.5">{scooter.tagline}</p>

                  {/* Starting Price */}
                  <div className="mt-3">
                    <p className="text-xl font-black text-zinc-950">
                      ₹ {scooter.startingPrice.toLocaleString('en-IN')}
                    </p>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                      Starting ex-showroom
                    </span>
                  </div>

                  {/* Specs Bar (Range & Top Speed) matching reference */}
                  <div className="mt-4 pt-4 border-t border-zinc-200/80 grid grid-cols-2 gap-2 text-zinc-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                      <div>
                        <p className="text-xs font-bold leading-none">{scooter.specs.range} km</p>
                        <span className="text-[10px] text-zinc-400">Range</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-zinc-500 shrink-0" />
                      <div>
                        <p className="text-xs font-bold leading-none">{scooter.specs.topSpeed} km/h</p>
                        <span className="text-[10px] text-zinc-400">Top Speed</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-5 flex items-center gap-2">
                    <button
                      id={`explore-btn-${scooter.slug}`}
                      onClick={() => onSelectScooter(scooter)}
                      className="flex-1 py-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-xs font-bold tracking-wide uppercase flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onBookTestRideForModel(scooter)}
                      className="px-3.5 py-3 border border-zinc-300 hover:border-zinc-950 text-zinc-800 hover:text-zinc-950 rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                      title="Book Test Ride for this model"
                    >
                      Ride
                    </button>
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
