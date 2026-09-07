import React, { useState } from 'react';
import { ArrowRight, Zap, ShieldCheck, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import heroImg from '../assets/images/elescoo_hero_scooter_1788778075573.jpg';
import highwayImg from '../assets/images/elescoo_rear_highway_1788778125798.jpg';
import headlightImg from '../assets/images/elescoo_headlight_detail_1788778101824.jpg';

interface HeroProps {
  onExploreScooters: () => void;
  onBookTestRide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreScooters, onBookTestRide }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      eyebrow: 'ELECTRIC SCOOTERS FOR A CLEANER TOMORROW',
      title: 'Ride the Change',
      subtitle:
        'Elescoo brings you smart, stylish and powerful electric scooters designed for a better, cleaner and greener future.',
      image: heroImg,
      highlightBadge: 'Flagship Edition',
    },
    {
      eyebrow: 'EFFORTLESS COMMUTING REDEFINED',
      title: 'Pure Torque. Zero Limits.',
      subtitle:
        'Experience instantaneous electric acceleration and up to 250 km of true-world range with state-of-the-art LFP battery architecture.',
      image: highwayImg,
      highlightBadge: 'Long-Range Series',
    },
    {
      eyebrow: 'INTELLIGENT AUTOMOTIVE CRAFT',
      title: 'Engineered For Precision',
      subtitle:
        'Featuring dynamic LED matrix headlights, regenerative braking, and continuous cloud-connected companion intelligence.',
      image: headlightImg,
      highlightBadge: 'Smart Tech Cockpit',
    },
  ];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const current = slides[activeSlide];

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center bg-zinc-950 overflow-hidden select-none"
    >
      {/* Background Image Layer with smooth crossfade & cinematic grade */}
      <div className="absolute inset-0 z-0">
        <img
          key={current.image}
          src={current.image}
          alt="Elescoo Electric Scooter"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-all duration-1000 transform scale-105"
        />
        {/* Cinematic Vignette & Readability Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-24 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typography & CTAs matching image.png */}
          <div className="lg:col-span-8 space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-white" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-zinc-300 uppercase">
                {current.eyebrow}
              </span>
            </div>

            {/* Giant Display Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.95]">
              {current.title}
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-xl font-normal leading-relaxed">
              {current.subtitle}
            </p>

            {/* Buttons Group matching reference mockup */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                id="hero-explore-btn"
                onClick={onExploreScooters}
                className="group inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm rounded-full tracking-wide transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Explore Scooters</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                id="hero-book-ride-btn"
                onClick={onBookTestRide}
                className="inline-flex items-center justify-center px-8 py-4 bg-black/40 hover:bg-black/60 border border-white/20 text-white font-semibold text-sm rounded-full tracking-wide backdrop-blur-sm transition-all duration-200 active:scale-95 cursor-pointer"
              >
                Book Test Ride
              </button>
            </div>
          </div>

          {/* Right Column: Floating Luxury Badges from reference image */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-end space-y-4">
            {/* Zero Emissions Badge */}
            <div className="w-64 bg-zinc-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-xl hover:border-white/25 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold tracking-tight">Zero Emissions</h4>
                <p className="text-zinc-400 text-xs mt-0.5">100% Clean Electric</p>
              </div>
            </div>

            {/* Smart Performance Badge */}
            <div className="w-64 bg-zinc-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-xl hover:border-white/25 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold tracking-tight">Smart Performance</h4>
                <p className="text-zinc-400 text-xs mt-0.5">Instant Torque & Speed</p>
              </div>
            </div>

            {/* Built for Safety Badge */}
            <div className="w-64 bg-zinc-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-xl hover:border-white/25 transition-all">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold tracking-tight">Built for Safety</h4>
                <p className="text-zinc-400 text-xs mt-0.5">Dual Disc & CBS / ABS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Scroll Indicator & Carousel Pagination controls */}
        <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
          {/* Scroll to explore */}
          <div
            onClick={onExploreScooters}
            className="flex items-center gap-3 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <div className="w-5 h-8 border-2 border-zinc-500 rounded-full flex items-start justify-center p-1">
              <span className="w-1 h-2 bg-white rounded-full animate-bounce" />
            </div>
            <span className="tracking-wider uppercase text-[11px]">Scroll to explore</span>
          </div>

          {/* Carousel Slide Switcher matching '< 01 / 03 >' in image.png */}
          <div className="flex items-center gap-4 text-white">
            <button
              onClick={handlePrev}
              className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs tracking-widest text-zinc-300">
              0{activeSlide + 1} <span className="text-zinc-600">/</span> 0{slides.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
