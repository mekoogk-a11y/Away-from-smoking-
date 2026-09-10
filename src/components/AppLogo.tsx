import React from 'react';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
  lang?: string;
  className?: string;
  textColor?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'md',
  withText = false,
  lang = 'ar',
  className = '',
  textColor = 'text-slate-950'
}) => {
  const dimensionMap = {
    sm: { box: 'w-9 h-9', svg: 36, text: 'text-sm' },
    md: { box: 'w-12 h-12', svg: 48, text: 'text-base' },
    lg: { box: 'w-16 h-16', svg: 64, text: 'text-lg' },
    xl: { box: 'w-24 h-24', svg: 96, text: 'text-2xl' }
  };

  const dim = dimensionMap[size];

  const getPrimaryName = () => {
    if (lang === 'fr') return 'Le tabagisme est dangereux pour la santé';
    if (lang === 'en') return 'Smoking Is Harmful to Health';
    return 'التدخين ضار بالصحة';
  };

  const getSecondaryName = () => {
    if (lang === 'ar') return 'Smoking Is Harmful to Health';
    return 'التدخين ضار بالصحة';
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* App Icon Container - Clean Medical Pure White Squircle */}
      <div
        className={`relative ${dim.box} shrink-0 rounded-2xl bg-white shadow-md shadow-slate-900/10 border border-sky-200/80 p-1.5 flex items-center justify-center overflow-hidden transition-transform hover:scale-105`}
        title={lang === 'ar' ? 'التدخين ضار بالصحة - شعار التطبيق' : 'Smoking Is Harmful to Health - App Icon'}
      >
        {/* Subtle inner sky-blue sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-50/50 via-white/80 to-transparent pointer-events-none" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle medical white/sky circular plate underlay */}
          <circle cx="50" cy="50" r="43" fill="#F0F9FF" fillOpacity="0.8" />

          {/* Cigarette Graphic (Rotated -25 deg for natural perspective) */}
          <g transform="rotate(-25 50 50)">
            {/* Soft shadow under cigarette */}
            <rect
              x="17"
              y="48"
              width="67"
              height="11"
              rx="3"
              fill="#000000"
              fillOpacity="0.12"
            />

            {/* Cigarette Paper Cylinder - Crisp White with defined outline */}
            <rect
              x="16"
              y="44"
              width="49"
              height="12"
              rx="2"
              fill="#FFFFFF"
              stroke="#475569"
              strokeWidth="1.2"
            />
            {/* Cylindrical shading gradient line */}
            <rect
              x="17"
              y="52"
              width="47"
              height="3.5"
              rx="1"
              fill="#E2E8F0"
              fillOpacity="0.8"
            />

            {/* Filter (Golden-Amber / Cork Brown) */}
            <rect
              x="65"
              y="44"
              width="19"
              height="12"
              rx="2"
              fill="#D97706"
              stroke="#92400E"
              strokeWidth="1.2"
            />
            {/* Filter Join Ring */}
            <line x1="65" y1="44" x2="65" y2="56" stroke="#78350F" strokeWidth="1.4" />
            <line x1="71" y1="44" x2="71" y2="56" stroke="#B45309" strokeWidth="0.8" strokeDasharray="1 1.5" />
            {/* Cork speckles */}
            <circle cx="75" cy="47" r="0.7" fill="#78350F" />
            <circle cx="79" cy="52" r="0.7" fill="#78350F" />
            <circle cx="76" cy="54" r="0.7" fill="#78350F" />
            <circle cx="81" cy="47" r="0.7" fill="#78350F" />

            {/* Burning Tip - Charcoal Ash */}
            <rect x="11" y="44.5" width="5" height="11" rx="1.5" fill="#334155" stroke="#1E293B" strokeWidth="0.8" />
            {/* Glowing Red & Orange Ember */}
            <rect x="12.5" y="46" width="3.5" height="8" rx="1" fill="#EF4444" />
            <circle cx="14" cy="50" r="1.8" fill="#F59E0B" />

            {/* Rising Smoke Wisps */}
            <path
              d="M10 47 C 6 42, 9 35, 5 30"
              stroke="#64748B"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeOpacity="0.7"
            />
            <path
              d="M13 45 C 11 38, 15 32, 12 26"
              stroke="#94A3B8"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeOpacity="0.6"
            />
          </g>

          {/* International Red Prohibition Circle (No Smoking 🚫) */}
          <circle
            cx="50"
            cy="50"
            r="38"
            stroke="#DC2626"
            strokeWidth="5.5"
            fill="none"
          />
          {/* Single Standard 45-degree Diagonal Slash across the cigarette */}
          <line
            x1="24"
            y1="24"
            x2="76"
            y2="76"
            stroke="#DC2626"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {withText && (
        <div className={`flex flex-col leading-tight ${textColor}`}>
          <span className={`font-black tracking-tight ${dim.text}`}>
            {getPrimaryName()}
          </span>
          <span className="text-xs font-bold text-slate-500">
            {getSecondaryName()}
          </span>
        </div>
      )}
    </div>
  );
};
