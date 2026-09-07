import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (scooterId: string, colorId: string, delta: number) => void;
  onRemoveItem: (scooterId: string, colorId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  // Booking deposit total (₹999 per reserved vehicle)
  const totalReservationFee = cartItems.reduce(
    (acc, item) => acc + item.scooter.bookingAmount * item.quantity,
    0
  );

  const totalExShowroomValue = cartItems.reduce(
    (acc, item) => acc + item.scooter.startingPrice * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between text-zinc-950">
          {/* Header */}
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-zinc-950" />
              <h3 className="text-xl font-black tracking-tight text-zinc-950">
                Your Elescoo Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-950 rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-zinc-900">Your Cart is Empty</h4>
                  <p className="text-xs text-zinc-500 mt-1">
                    Discover our flagship lineup and reserve with a 100% refundable token of ₹999.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  Explore Models
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.scooter.id}-${item.selectedColor.id}`}
                  className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex gap-4 items-center"
                >
                  <img
                    src={item.selectedColor.image}
                    alt={item.scooter.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-16 object-contain rounded-lg shrink-0 bg-white p-1 border border-zinc-100"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-zinc-950 truncate">
                        {item.scooter.name}
                      </h4>
                      <button
                        onClick={() =>
                          onRemoveItem(item.scooter.id, item.selectedColor.id)
                        }
                        className="text-zinc-400 hover:text-rose-500 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-0.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-zinc-300"
                        style={{ backgroundColor: item.selectedColor.hex }}
                      />
                      <span>{item.selectedColor.name}</span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <p className="text-xs font-black text-zinc-950">
                          ₹{item.scooter.startingPrice.toLocaleString('en-IN')}
                        </p>
                        <span className="text-[10px] text-zinc-400">
                          Token: ₹{item.scooter.bookingAmount}
                        </span>
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-2 bg-white border border-zinc-200 px-2 py-1 rounded-full text-xs font-semibold">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.scooter.id, item.selectedColor.id, -1)
                          }
                          className="text-zinc-500 hover:text-zinc-950 px-1"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.scooter.id, item.selectedColor.id, 1)
                          }
                          className="text-zinc-500 hover:text-zinc-950 px-1"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-zinc-100 bg-zinc-50 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>Vehicles Total (Ex-Showroom)</span>
                  <span className="font-semibold text-zinc-900">
                    ₹{totalExShowroomValue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Payable Now (Refundable Token)</span>
                  <span className="font-bold text-emerald-600 text-sm">
                    ₹{totalReservationFee.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400">
                  *Balance amount payable at the time of delivery after subsidies & documentation.
                </p>
              </div>

              <button
                id="cart-checkout-btn"
                onClick={onCheckout}
                className="w-full py-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Refundable reservation token guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
