/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SCOOTER_MODELS } from './data/scooters';
import { ScooterModel, ScooterColor, CartItem } from './types';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedScooters } from './components/FeaturedScooters';
import { PerformanceSection } from './components/PerformanceSection';
import { WhyElescoo } from './components/WhyElescoo';
import { AdvancedTechnology } from './components/AdvancedTechnology';
import { SavingsCalculator } from './components/SavingsCalculator';
import { EMICalculator } from './components/EMICalculator';
import { CleanerPlanet } from './components/CleanerPlanet';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

// Modals & Drawers
import { ProductDetailModal } from './components/ProductDetailModal';
import { CompareModal } from './components/CompareModal';
import { TestRideModal } from './components/TestRideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { SearchModal } from './components/SearchModal';
import { WishlistModal } from './components/WishlistModal';

export default function App() {
  // Persistence state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('elescoo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('elescoo_wishlist');
      return saved ? JSON.parse(saved) : ['elescoo-x2'];
    } catch {
      return ['elescoo-x2'];
    }
  });

  // Modal / Drawer states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTestRideOpen, setIsTestRideOpen] = useState(false);
  const [testRideModel, setTestRideModel] = useState<ScooterModel | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedScooterForDetail, setSelectedScooterForDetail] = useState<ScooterModel | null>(null);

  // Quick toast banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('elescoo_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('elescoo_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart operations
  const handleAddToCart = (scooter: ScooterModel, color: ScooterColor) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.scooter.id === scooter.id && item.selectedColor.id === color.id
      );
      if (existing) {
        return prev.map((item) =>
          item.scooter.id === scooter.id && item.selectedColor.id === color.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { scooter, selectedColor: color, quantity: 1 }];
    });
    showToast(`Added ${scooter.name} (${color.name}) to your reservation cart!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (scooterId: string, colorId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.scooter.id === scooterId && item.selectedColor.id === colorId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (scooterId: string, colorId: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.scooter.id === scooterId && item.selectedColor.id === colorId)
      )
    );
  };

  // Wishlist toggle
  const handleToggleWishlist = (scooterId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(scooterId);
      const updated = exists ? prev.filter((id) => id !== scooterId) : [...prev, scooterId];
      const model = SCOOTER_MODELS.find((s) => s.id === scooterId);
      showToast(
        exists
          ? `Removed ${model?.name || 'item'} from wishlist.`
          : `Saved ${model?.name || 'item'} to your wishlist.`
      );
      return updated;
    });
  };

  // Navigation smoothly
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookTestRideForModel = (scooter?: ScooterModel) => {
    setTestRideModel(scooter || SCOOTER_MODELS[0]);
    setIsTestRideOpen(true);
  };

  const handleSelectScooterByName = (name: string) => {
    const match = SCOOTER_MODELS.find((s) => s.name.toLowerCase() === name.toLowerCase());
    if (match) {
      setSelectedScooterForDetail(match);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans antialiased selection:bg-zinc-950 selection:text-white">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 text-white px-5 py-3 rounded-full text-xs font-bold shadow-2xl border border-white/20 animate-bounce flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenStores={() => setIsStoreLocatorOpen(true)}
        onOpenTestRide={() => handleBookTestRideForModel()}
        onSelectScooter={setSelectedScooterForDetail}
      />

      {/* 1. Cinematic Hero Section */}
      <Hero
        onExploreModels={() => handleNavigateSection('featured-scooters')}
        onBookTestRide={() => handleBookTestRideForModel()}
      />

      {/* 2. Featured Scooters (X1, X2, X3, X4 Grid matching image.png) */}
      <FeaturedScooters
        scooters={SCOOTER_MODELS}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onSelectScooter={setSelectedScooterForDetail}
        onBookTestRideForModel={handleBookTestRideForModel}
      />

      {/* 3. Power & Performance Section matching image.png */}
      <PerformanceSection
        onExploreTechnology={() => handleNavigateSection('technology')}
      />

      {/* 4. Why Elescoo Section matching image.png */}
      <WhyElescoo
        onLearnMore={() => handleNavigateSection('technology')}
      />

      {/* 5. Advanced Technology Cards matching image.png */}
      <AdvancedTechnology />

      {/* 6. Savings Calculator */}
      <SavingsCalculator />

      {/* 7. Flexible EMI Calculator */}
      <EMICalculator
        onBookNow={() => {
          setSelectedScooterForDetail(SCOOTER_MODELS[1]);
        }}
      />

      {/* 8. Together for a Cleaner Planet Banner matching image.png */}
      <CleanerPlanet
        onExploreMission={() => handleNavigateSection('why-elescoo')}
      />

      {/* 9. Customer Reviews & Community */}
      <ReviewsSection />

      {/* 10. Frequently Asked Questions */}
      <FAQSection />

      {/* 11. Complete Automotive Footer */}
      <Footer
        onSelectScooterByName={handleSelectScooterByName}
        onOpenTestRide={() => handleBookTestRideForModel()}
        onOpenStores={() => setIsStoreLocatorOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Modals & Slide-out Drawers */}
      <ProductDetailModal
        scooter={selectedScooterForDetail}
        isOpen={Boolean(selectedScooterForDetail)}
        onClose={() => setSelectedScooterForDetail(null)}
        onAddToCart={handleAddToCart}
        onBookTestRide={handleBookTestRideForModel}
        isWishlisted={
          selectedScooterForDetail ? wishlistIds.includes(selectedScooterForDetail.id) : false
        }
        onToggleWishlist={handleToggleWishlist}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onSelectScooter={setSelectedScooterForDetail}
        onBookTestRide={handleBookTestRideForModel}
      />

      <TestRideModal
        isOpen={isTestRideOpen}
        onClose={() => setIsTestRideOpen(false)}
        preselectedModel={testRideModel}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={() => {
          setCartItems([]);
        }}
      />

      <StoreLocatorModal
        isOpen={isStoreLocatorOpen}
        onClose={() => setIsStoreLocatorOpen(false)}
        onBookTestRideAtCenter={(centerName) => {
          handleBookTestRideForModel();
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectScooter={setSelectedScooterForDetail}
        onOpenStores={() => setIsStoreLocatorOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onRemoveWishlist={handleToggleWishlist}
        onSelectScooter={setSelectedScooterForDetail}
        onBookTestRide={handleBookTestRideForModel}
      />
    </div>
  );
}
