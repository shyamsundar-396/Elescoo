import React from 'react';
import { X, Heart, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { SCOOTER_MODELS } from '../data/scooters';
import { ScooterModel } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemoveWishlist: (id: string) => void;
  onSelectScooter: (scooter: ScooterModel) => void;
  onBookTestRide: (scooter: ScooterModel) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveWishlist,
  onSelectScooter,
  onBookTestRide,
}) => {
  if (!isOpen) return null;

  const wishlistedScooters = SCOOTER_MODELS.filter((s) => wishlistIds.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 text-zinc-950">
        {/* Header */}
        <div className="p-6 bg-zinc-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="text-xl font-black tracking-tight">
              My Saved Rides ({wishlistedScooters.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {wishlistedScooters.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Heart className="w-12 h-12 text-zinc-300 mx-auto" />
              <h4 className="font-bold text-zinc-900">No Saved Scooters Yet</h4>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Tap the heart icon on any model in our lineup to save it for quick comparison.
              </p>
            </div>
          ) : (
            wishlistedScooters.map((scooter) => (
              <div
                key={scooter.id}
                className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={scooter.heroImage}
                    alt={scooter.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-16 object-contain bg-white rounded-xl p-1 border border-zinc-200/60"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-zinc-950">{scooter.name}</h4>
                    <p className="text-xs text-zinc-500">{scooter.tagline}</p>
                    <p className="text-xs font-black text-zinc-950 mt-1">
                      ₹{scooter.startingPrice.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectScooter(scooter);
                    }}
                    className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-xs font-bold uppercase tracking-wider"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onRemoveWishlist(scooter.id)}
                    className="p-2 text-zinc-400 hover:text-rose-600 rounded-full hover:bg-white"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
