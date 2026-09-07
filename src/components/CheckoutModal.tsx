import React, { useState } from 'react';
import { X, Check, ShieldCheck, CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pinCode, setPinCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'finance'>('upi');
  const [orderId, setOrderId] = useState('');

  const totalReservationFee = cartItems.reduce(
    (acc, item) => acc + item.scooter.bookingAmount * item.quantity,
    0
  );

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !pinCode) return;
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    const generatedId = `ELS-ORD-${Math.floor(1000000 + Math.random() * 9000000)}`;
    setOrderId(generatedId);
    setStep('success');

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 text-zinc-950">
        {/* Header */}
        <div className="p-6 bg-zinc-950 text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
              RESERVE YOUR ELESCOO
            </span>
            <h3 className="text-2xl font-black tracking-tight mt-0.5">
              {step === 'success' ? 'Order Confirmed' : 'Vehicle Checkout'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step !== 'success' && (
          <div className="px-6 py-3 bg-zinc-50 border-b border-zinc-200 flex items-center justify-center gap-6 text-xs font-bold">
            <span className={step === 'details' ? 'text-zinc-950' : 'text-zinc-400'}>
              1. Delivery Details
            </span>
            <span className="text-zinc-300">→</span>
            <span className={step === 'payment' ? 'text-zinc-950' : 'text-zinc-400'}>
              2. Token Payment
            </span>
          </div>
        )}

        {/* Step 1: Details Form */}
        {step === 'details' && (
          <form onSubmit={handleProceedToPayment} className="p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aditi Rao"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-950 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-950 text-xs font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-950 text-xs font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Delivery Address / Preferred Showroom Location
                </label>
                <input
                  type="text"
                  placeholder="Apartment, Street name, Locality"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-950 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-950 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">PIN Code *</label>
                <input
                  type="text"
                  required
                  placeholder="560001"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-950 text-xs font-medium"
                />
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80 space-y-2">
              <span className="text-[11px] font-bold text-zinc-500 uppercase">Selected Vehicle(s)</span>
              {cartItems.map((item) => (
                <div
                  key={`${item.scooter.id}-${item.selectedColor.id}`}
                  className="flex items-center justify-between text-xs font-semibold text-zinc-900"
                >
                  <span>
                    {item.scooter.name} ({item.selectedColor.name}) × {item.quantity}
                  </span>
                  <span>₹{item.scooter.bookingAmount * item.quantity}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-zinc-200 flex justify-between text-xs font-bold">
                <span>Total Reservation Token</span>
                <span className="text-emerald-600">₹{totalReservationFee.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: Payment Mock Form */}
        {step === 'payment' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h4 className="text-sm font-bold text-zinc-900 mb-3">
                Select Preferred Payment Method
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'upi', label: 'UPI / QR Code', icon: '📱' },
                  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                  { id: 'finance', label: '0% Down Payment EMI', icon: '⚡' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === pm.id
                        ? 'border-zinc-950 bg-zinc-100 ring-1 ring-zinc-950'
                        : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    <span className="text-xl block mb-1">{pm.icon}</span>
                    <span className="text-xs font-bold text-zinc-900 block leading-snug">
                      {pm.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Deliver To:</span>
                <span className="font-bold text-zinc-950">
                  {name}, {city} ({pinCode})
                </span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Contact:</span>
                <span className="font-bold text-zinc-950">{phone}</span>
              </div>
              <div className="flex justify-between text-zinc-600 pt-2 border-t border-zinc-200">
                <span>Reservation Token:</span>
                <span className="text-base font-black text-emerald-600">
                  ₹{totalReservationFee.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="w-1/3 py-4 border border-zinc-300 text-zinc-700 hover:border-zinc-950 rounded-full font-bold text-xs uppercase"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleCompleteOrder}
                className="w-2/3 py-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay ₹{totalReservationFee.toLocaleString('en-IN')} & Reserve</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Screen */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
                RESERVATION CONFIRMED
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-zinc-950 mt-1">
                Welcome to the Elescoo Family!
              </h4>
              <p className="text-sm text-zinc-500 mt-2 max-w-md mx-auto">
                Congratulations {name}! Your scooter has been reserved. Your booking confirmation and receipt have been registered under Reference:
              </p>
              <div className="inline-block mt-3 px-4 py-2 bg-zinc-100 rounded-xl font-mono text-sm font-black text-zinc-950 border border-zinc-300">
                {orderId}
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-2xl text-xs text-zinc-600 text-left space-y-1.5">
              <p className="font-bold text-zinc-950">Next Steps:</p>
              <p>• Your assigned Delivery Concierge will contact you on {phone} within 24 hours.</p>
              <p>• We will verify your government subsidy eligibility and assist with RTO registration.</p>
              <p>• 100% money-back guarantee if you choose to cancel before dispatch.</p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full font-bold text-xs uppercase tracking-wider"
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
