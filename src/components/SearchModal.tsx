import React, { useState, useMemo } from 'react';
import { X, Search, ArrowRight, Zap, MapPin, HelpCircle } from 'lucide-react';
import { SCOOTER_MODELS } from '../data/scooters';
import { FAQ_ITEMS } from '../data/faqs';
import { EXPERIENCE_CENTERS } from '../data/stores';
import { ScooterModel } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScooter: (scooter: ScooterModel) => void;
  onOpenStores: () => void;
  onNavigateSection: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectScooter,
  onOpenStores,
  onNavigateSection,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const scooterResults = useMemo(() => {
    if (!query) return SCOOTER_MODELS;
    const q = query.toLowerCase();
    return SCOOTER_MODELS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [query]);

  const faqResults = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return FAQ_ITEMS.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    );
  }, [query]);

  const storeResults = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return EXPERIENCE_CENTERS.filter(
      (s) => s.city.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-4 text-zinc-950">
        {/* Search Bar Input */}
        <div className="p-5 border-b border-zinc-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search scooters, range, battery, showrooms, FAQ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base font-semibold focus:outline-none placeholder:text-zinc-400"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-950 rounded-full hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
          {/* Scooter Results */}
          <div>
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-3">
              Scooter Models ({scooterResults.length})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scooterResults.map((scooter) => (
                <div
                  key={scooter.id}
                  onClick={() => {
                    onClose();
                    onSelectScooter(scooter);
                  }}
                  className="p-3 rounded-2xl border border-zinc-200/80 hover:border-zinc-950 hover:bg-zinc-50 flex items-center gap-3 cursor-pointer transition-all"
                >
                  <img
                    src={scooter.heroImage}
                    alt={scooter.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-12 object-contain shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm text-zinc-950 truncate">{scooter.name}</h5>
                    <p className="text-[11px] text-zinc-500">
                      {scooter.specs.range} km • ₹{scooter.startingPrice.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Results */}
          {faqResults.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-3">
                Help & Answers ({faqResults.length})
              </span>
              <div className="space-y-2">
                {faqResults.slice(0, 3).map((faq) => (
                  <div
                    key={faq.id}
                    onClick={() => {
                      onClose();
                      onNavigateSection('faqs');
                    }}
                    className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/60 hover:border-zinc-950 cursor-pointer transition-all"
                  >
                    <p className="text-xs font-bold text-zinc-900 flex items-center gap-2">
                      <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
                      {faq.question}
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Store Results */}
          {storeResults.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-3">
                Experience Hubs ({storeResults.length})
              </span>
              <div className="space-y-2">
                {storeResults.map((store) => (
                  <div
                    key={store.id}
                    onClick={() => {
                      onClose();
                      onOpenStores();
                    }}
                    className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/60 hover:border-zinc-950 flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div>
                      <p className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        {store.name}
                      </p>
                      <p className="text-[11px] text-zinc-500">{store.city}, {store.state}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
