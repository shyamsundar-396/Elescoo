import React, { useState } from 'react';
import { X, Check, Clock, Gauge, Zap, Shield, ArrowRight, ShoppingBag, Heart } from 'lucide-react';
import { ScooterModel, ScooterColor } from '../types';

interface ProductDetailModalProps {
  scooter: ScooterModel | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (scooter: ScooterModel, color: ScooterColor) => void;
  onBookTestRide: (scooter: ScooterModel) => void;
  isWishlisted: boolean;
  onToggleWishlist: (scooterId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  scooter,
  isOpen,
  onClose,
  onAddToCart,
  onBookTestRide,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!isOpen || !scooter) return null;

  const [selectedColor, setSelectedColor] = useState<ScooterColor>(scooter.colors[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 text-zinc-950">
        {/* Header Bar */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
              {scooter.category}
            </span>
            <h2 className="text-3xl font-black tracking-tight text-zinc-950 mt-0.5">
              {scooter.name}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(scooter.id)}
              className={`p-2.5 rounded-full border transition-colors ${
                isWishlisted
                  ? 'border-rose-200 bg-rose-50 text-rose-600'
                  : 'border-zinc-200 text-zinc-400 hover:text-zinc-800'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-950 rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[75vh] overflow-y-auto">
          {/* Left: Product Showcase & Color Selection */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative aspect-[4/3] bg-zinc-50 rounded-3xl p-6 flex items-center justify-center overflow-hidden border border-zinc-200/60">
              <img
                src={selectedColor.image}
                alt={`${scooter.name} in ${selectedColor.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-4 left-4 text-xs font-bold text-zinc-600 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-200 shadow-sm">
                Finish: {selectedColor.name}
              </span>
            </div>

            {/* Interactive Color Switcher */}
            <div className="mt-6 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2.5">
                Select Vehicle Color:
              </p>
              <div className="flex items-center gap-3">
                {scooter.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                      selectedColor.id === color.id
                        ? 'border-zinc-950 bg-white shadow-sm ring-1 ring-zinc-950'
                        : 'border-zinc-200 bg-white/60 hover:bg-white text-zinc-600'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-zinc-300 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Key Features Bullet List */}
            <div className="mt-6 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Key Innovations Included
              </h4>
              <div className="grid grid-cols-1 gap-2 pt-1">
                {scooter.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-700 font-medium">
                    <div className="w-4 h-4 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Technical Specs & Reserve CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Pricing Box */}
              <div className="p-6 rounded-3xl bg-zinc-950 text-white shadow-xl">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Ex-Showroom Price
                </span>
                <div className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
                  ₹ {scooter.startingPrice.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Inclusive of FAME-II subsidy & state EV incentives
                </p>
                <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-300">Reserve Token Amount:</span>
                  <span className="font-bold text-emerald-400">
                    ₹ {scooter.bookingAmount} (100% Refundable)
                  </span>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Technical Specifications
                </h4>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/60">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                      Certified Range
                    </span>
                    <p className="font-bold text-zinc-950 mt-0.5 text-sm">{scooter.specs.range} km</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/60">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                      Top Speed
                    </span>
                    <p className="font-bold text-zinc-950 mt-0.5 text-sm">
                      {scooter.specs.topSpeed} km/h
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/60">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                      Acceleration
                    </span>
                    <p className="font-bold text-zinc-950 mt-0.5">{scooter.specs.acceleration}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/60">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                      Battery Chemistry
                    </span>
                    <p className="font-bold text-zinc-950 mt-0.5">{scooter.specs.batteryCapacity}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/60">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                      Motor Power
                    </span>
                    <p className="font-bold text-zinc-950 mt-0.5">{scooter.specs.motorPower}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/60">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                      Fast Charge Rate
                    </span>
                    <p className="font-bold text-zinc-950 mt-0.5">{scooter.specs.fastCharging}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/60">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                      Boot Capacity
                    </span>
                    <p className="font-bold text-zinc-950 mt-0.5">{scooter.specs.bootSpace}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/60">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                      Battery Warranty
                    </span>
                    <p className="font-bold text-zinc-950 mt-0.5">{scooter.specs.warranty}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-4">
              <button
                id="modal-add-to-cart-btn"
                onClick={() => {
                  onAddToCart(scooter, selectedColor);
                  onClose();
                }}
                className="w-full py-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Reserve Online — ₹{scooter.bookingAmount}</span>
              </button>

              <button
                id="modal-book-ride-btn"
                onClick={() => {
                  onClose();
                  onBookTestRide(scooter);
                }}
                className="w-full py-3.5 border border-zinc-300 hover:border-zinc-950 text-zinc-950 rounded-full font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                Schedule Free Test Ride
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
