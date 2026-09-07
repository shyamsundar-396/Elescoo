import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Heart, Menu, X, ArrowRight } from 'lucide-react';
import { ElescooLogo } from './ElescooLogo';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenTestRide: () => void;
  onOpenCompare: () => void;
  onOpenStores: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenTestRide,
  onOpenCompare,
  onOpenStores,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Scooters', id: 'featured-scooters' },
    { label: 'Compare', action: onOpenCompare },
    { label: 'Technology', id: 'technology' },
    { label: 'Performance', id: 'performance' },
    { label: 'Why Elescoo', id: 'why-elescoo' },
    { label: 'Savings', id: 'savings' },
    { label: 'Experience Hubs', action: onOpenStores },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div
          onClick={() => onNavigateSection('hero')}
          className="flex items-center text-white"
          id="nav-logo-btn"
        >
          <ElescooLogo variant="light" size="md" />
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium tracking-wide text-zinc-300">
          {navLinks.map((link) => (
            <button
              key={link.label}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                if (link.action) {
                  link.action();
                } else if (link.id) {
                  onNavigateSection(link.id);
                }
              }}
              className="hover:text-white transition-colors duration-200 cursor-pointer py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-white after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Actions & Primary CTA */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Search trigger */}
          <button
            id="nav-search-btn"
            onClick={onOpenSearch}
            className="p-2 text-zinc-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            title="Search scooters & tech"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist trigger */}
          <button
            id="nav-wishlist-btn"
            onClick={onOpenWishlist}
            className="p-2 text-zinc-300 hover:text-white rounded-full hover:bg-white/10 transition-colors relative"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart trigger */}
          <button
            id="nav-cart-btn"
            onClick={onOpenCart}
            className="p-2 text-zinc-300 hover:text-white rounded-full hover:bg-white/10 transition-colors relative"
            title="Cart"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-white text-zinc-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary CTA: BOOK TEST RIDE matching reference */}
          <button
            id="nav-book-ride-cta"
            onClick={onOpenTestRide}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-950 bg-white hover:bg-zinc-100 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap cursor-pointer"
          >
            Book Test Ride
          </button>

          {/* Mobile hamburger menu trigger */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-zinc-950 border-b border-white/10 px-5 pt-4 pb-6 space-y-3 animate-fadeIn"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                setMobileMenuOpen(false);
                if (link.action) {
                  link.action();
                } else if (link.id) {
                  onNavigateSection(link.id);
                }
              }}
              className="block w-full text-left py-2 text-base font-medium text-zinc-200 hover:text-white border-b border-white/5"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTestRide();
              }}
              className="w-full py-3 bg-white text-zinc-950 rounded-full font-bold text-sm text-center tracking-wider uppercase flex items-center justify-center gap-2"
            >
              Book Test Ride <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCompare();
              }}
              className="w-full py-3 bg-zinc-800 text-white rounded-full font-medium text-sm text-center"
            >
              Compare All Models
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
