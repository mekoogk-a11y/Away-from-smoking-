import React from 'react';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
  lang?: 'ar' | 'en';
  className?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'md',
  withText = false,
  lang = 'ar',
  className = ''
}) => {
  const dimensionMap = {
    sm: { box: 'w-9 h-9', svg: 36, text: 'text-sm' },
    md: { box: 'w-12 h-12', svg: 48, text: 'text-base' },
    lg: { box: 'w-16 h-16', svg: 64, text: 'text-lg' },
    xl: { box: 'w-24 h-24', svg: 96, text: 'text-2xl' }
  };

  const dim = dimensionMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* App Icon Container - Apple/Android Squircle Style */}
      <div
        className={`relative ${dim.box} shrink-0 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 shadow-md shadow-orange-950/20 border border-white/20 p-1.5 flex items-center justify-center overflow-hidden transition-transform hover:scale-105`}
        title={lang === 'ar' ? 'أيقونة التطبيق: ممنوع التدخين' : 'App Icon: Quit Smoking'}
      >
        {/* Subtle inner gloss highlight */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/25 pointer-events-none" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle circular background guide */}
          <circle cx="50" cy="50" r="43" fill="#ffffff" fillOpacity="0.15" />

          {/* Cigarette Body */}
          <g transform="rotate(-30 50 50)">
            {/* White cigarette paper cylinder */}
            <rect
              x="16"
              y="44"
              width="50"
              height="12"
              rx="2.5"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="0.8"
            />
            {/* Filter (Orange-Brown) */}
            <rect
              x="66"
              y="44"
              width="18"
              height="12"
              rx="2"
              fill="#D97706"
            />
            {/* Filter Cork Speckles / Line */}
            <line x1="66" y1="44" x2="66" y2="56" stroke="#B45309" strokeWidth="1.2" />
            <line x1="72" y1="44" x2="72" y2="56" stroke="#B45309" strokeWidth="0.8" strokeDasharray="1 2" />

            {/* Burning Tip Ash */}
            <rect x="12" y="45" width="4" height="10" rx="1.5" fill="#64748B" />
            <rect x="14" y="47" width="2" height="6" rx="1" fill="#EF4444" />

            {/* Smoke Wisps */}
            <path
              d="M10 48 C 6 43, 8 36, 4 32"
              stroke="#F1F5F9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.6"
            />
            <path
              d="M13 46 C 11 39, 15 34, 11 28"
              stroke="#E2E8F0"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeOpacity="0.5"
            />
          </g>

          {/* Prominent Red Prohibition Circle and Diagonal Slash (Anti-Smoking X Mark) */}
          <circle
            cx="50"
            cy="50"
            r="38"
            stroke="#DC2626"
            strokeWidth="7"
            fill="none"
          />
          {/* Bold Red 'X' Lines */}
          <line
            x1="24"
            y1="24"
            x2="76"
            y2="76"
            stroke="#DC2626"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <line
            x1="76"
            y1="24"
            x2="24"
            y2="76"
            stroke="#DC2626"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {withText && (
        <div className="flex flex-col text-white leading-tight">
          <span className={`font-black tracking-tight ${dim.text}`}>
            {lang === 'ar' ? 'كيف تترك التدخين' : 'Quit Smoking'}
          </span>
          <span className="text-xs font-semibold text-orange-100 opacity-90">
            {lang === 'ar' ? 'Quit Smoking' : 'كيف تترك التدخين'}
          </span>
        </div>
      )}
    </div>
  );
};
