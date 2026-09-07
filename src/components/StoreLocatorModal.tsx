import React, { useState } from 'react';
import { X, MapPin, Phone, Clock, Search, Navigation } from 'lucide-react';
import { EXPERIENCE_CENTERS } from '../data/stores';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTestRideAtCenter: (centerName: string) => void;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({
  isOpen,
  onClose,
  onBookTestRideAtCenter,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filtered = EXPERIENCE_CENTERS.filter(
    (s) =>
      s.city.toLowerCase().includes(query.toLowerCase()) ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.state.toLowerCase().includes(query.toLowerCase()) ||
      s.address.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 text-zinc-950">
        {/* Header */}
        <div className="p-6 bg-zinc-950 text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
              NETWORK OF HUBS
            </span>
            <h3 className="text-2xl font-black tracking-tight mt-0.5">
              Elescoo Experience Hubs
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-zinc-100 bg-zinc-50">
          <div className="relative">
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search by city (e.g. Bengaluru, Mumbai, Delhi, Hyderabad...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-950 text-xs sm:text-sm font-medium bg-white"
            />
          </div>
        </div>

        {/* Hubs List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-zinc-400 text-sm">
              No centers found matching &quot;{query}&quot;. Try searching for &quot;Bengaluru&quot; or &quot;Delhi&quot;.
            </div>
          ) : (
            filtered.map((hub) => (
              <div
                key={hub.id}
                className="p-5 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-400 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700">
                      {hub.type}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600">● Open Today</span>
                  </div>
                  <h4 className="font-extrabold text-base text-zinc-950">{hub.name}</h4>
                  <p className="text-xs text-zinc-600 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>{hub.address}</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-zinc-400" />
                      {hub.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-400" />
                      {hub.timing}
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      onBookTestRideAtCenter(hub.name);
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
                  >
                    Book Visit
                  </button>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(hub.name + ' ' + hub.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2 border border-zinc-200 hover:border-zinc-950 text-zinc-700 hover:text-zinc-950 rounded-full text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
