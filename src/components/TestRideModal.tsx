import React, { useState } from 'react';
import { X, Calendar, MapPin, Phone, User, Mail, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SCOOTER_MODELS } from '../data/scooters';
import { ScooterModel } from '../types';

interface TestRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedModel?: ScooterModel | null;
}

export const TestRideModal: React.FC<TestRideModalProps> = ({
  isOpen,
  onClose,
  preselectedModel,
}) => {
  if (!isOpen) return null;

  const [selectedModelId, setSelectedModelId] = useState(
    preselectedModel ? preselectedModel.id : SCOOTER_MODELS[0].id
  );
  const [rideType, setRideType] = useState<'Experience Center' | 'Doorstep Test Ride'>('Experience Center');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [date, setDate] = useState('2026-09-12');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const selectedScooter =
    SCOOTER_MODELS.find((s) => s.id === selectedModelId) || SCOOTER_MODELS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const generatedId = `ELS-TR-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(generatedId);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 text-zinc-950">
        {/* Header */}
        <div className="p-6 bg-zinc-950 text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
              ZERO OBLIGATION TEST RIDE
            </span>
            <h3 className="text-2xl font-black tracking-tight mt-0.5">
              Experience Elescoo
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
                TEST RIDE CONFIRMED
              </span>
              <h4 className="text-2xl font-black text-zinc-950 mt-1">
                You&apos;re All Set, {fullName}!
              </h4>
              <p className="text-sm text-zinc-500 mt-2 max-w-md mx-auto">
                Your appointment for the <strong className="text-zinc-900">{selectedScooter.name}</strong> has been scheduled. Our EV Ride Specialist will get in touch shortly to assist with your journey.
              </p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-2xl text-left space-y-2.5 text-xs text-zinc-700">
              <div className="flex justify-between">
                <span className="text-zinc-400">Booking Pass ID:</span>
                <span className="font-mono font-bold text-zinc-950">{bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Vehicle:</span>
                <span className="font-bold text-zinc-950">{selectedScooter.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Mode:</span>
                <span className="font-semibold text-zinc-900">{rideType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Date & Slot:</span>
                <span className="font-semibold text-zinc-900">{date} | {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Location:</span>
                <span className="font-semibold text-zinc-900">{city}</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Done & Return to Website
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Scooter Model Selector */}
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                Select Scooter to Test Ride
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SCOOTER_MODELS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedModelId(m.id)}
                    className={`p-2.5 rounded-2xl border text-center transition-all ${
                      selectedModelId === m.id
                        ? 'border-zinc-950 bg-zinc-950 text-white shadow-sm'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    <p className="text-xs font-bold">{m.name}</p>
                    <span className="text-[10px] opacity-70">{m.specs.topSpeed} km/h</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ride Type Switcher */}
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                Test Ride Preference
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Experience Center', 'Doorstep Test Ride'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setRideType(type)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      rideType === type
                        ? 'border-zinc-950 bg-zinc-100 text-zinc-950 ring-1 ring-zinc-950'
                        : 'border-zinc-200 text-zinc-500 hover:bg-zinc-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aryan Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-950 text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-950 text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  City / Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-950 text-xs font-medium bg-white"
                  >
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="New Delhi">New Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-950 text-xs font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1">
                Preferred Time Slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['10:00 AM - 12:00 PM', '01:00 PM - 03:00 PM', '04:00 PM - 06:00 PM'].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 px-2 rounded-xl border text-[11px] font-semibold transition-all ${
                      timeSlot === slot
                        ? 'border-zinc-950 bg-zinc-950 text-white'
                        : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirm Free Test Ride</span>
              </button>
              <p className="text-[11px] text-zinc-400 text-center mt-2">
                Valid driving license required at the time of the test ride.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
