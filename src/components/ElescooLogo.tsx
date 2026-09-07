import React from 'react';

interface ElescooLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ElescooLogo: React.FC<ElescooLogoProps> = ({
  className = '',
  variant = 'auto',
  showText = true,
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg tracking-tight',
    md: 'text-xl tracking-tight',
    lg: 'text-2xl tracking-tighter',
    xl: 'text-3xl tracking-tighter',
  };

  const fillClass =
    variant === 'light'
      ? 'fill-white text-white'
      : variant === 'dark'
      ? 'fill-zinc-950 text-zinc-950'
      : 'fill-current text-current';

  return (
    <div className={`inline-flex items-center gap-2.5 font-bold select-none cursor-pointer group ${className}`}>
      {/* Precision Vector Emblem matching logo.jpg */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full transform transition-transform duration-300 group-hover:scale-105 ${fillClass}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Aerodynamic Speed Motion Streaks */}
          <path d="M 22 38 Q 28 38 35 34 Q 30 40 22 40 Z" />
          <path d="M 15 44 Q 25 44 32 42 Q 24 46 15 46 Z" />
          <path d="M 12 50 Q 23 50 28 49 Q 20 53 12 53 Z" />
          <path d="M 10 57 Q 20 57 26 57 Q 19 61 10 61 Z" />
          <path d="M 12 64 Q 21 64 25 64 Q 19 68 12 68 Z" />

          {/* Sweeping Bottom Orbital Arc */}
          <path d="M 18 73 C 28 77 42 81 55 81 C 65 81 74 77 78 72 C 67 78 48 78 30 72 Z" />

          {/* Front Wheel */}
          <circle cx="76" cy="62" r="13" />
          <circle cx="76" cy="62" r="7" className={variant === 'light' ? 'fill-zinc-950' : 'fill-white'} />

          {/* Rear Wheel */}
          <circle cx="36" cy="65" r="9" />
          <circle cx="36" cy="65" r="5" className={variant === 'light' ? 'fill-zinc-950' : 'fill-white'} />

          {/* Scooter Body & Chassis */}
          <path d="M 26 59 C 27 49 35 44 47 43 C 55 42 58 48 57 58 C 50 63 38 64 26 59 Z" />

          {/* Seat */}
          <path d="M 33 46 C 36 41 53 39 58 44 C 54 46 38 48 33 46 Z" />

          {/* Steering Stem, Headlamp & Handlebar */}
          <path d="M 57 58 L 65 32 L 72 33 L 64 60 Z" />
          <circle cx="70" cy="29" r="4.5" />
          {/* Rearview Mirror */}
          <path d="M 64 29 L 58 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="58" cy="19" r="2.5" />

          {/* Front Mudguard Aerofoil */}
          <path d="M 63 60 C 67 52 82 52 89 57 C 80 54 70 56 63 60 Z" />
        </svg>
      </div>

      {showText && (
        <span className={`font-sans font-extrabold tracking-tight ${textSizes[size]}`}>
          ELESCOO
        </span>
      )}
    </div>
  );
};
