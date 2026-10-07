import React from 'react';

interface BatLogoProps {
  className?: string;
  glow?: boolean;
}

export const BatLogo: React.FC<BatLogoProps> = ({ 
  className = 'w-24 h-14', 
  glow = false 
}) => {
  return (
    <svg
      viewBox="0 0 500 300"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${glow ? 'drop-shadow-[0_0_25px_rgba(255,225,0,0.7)]' : 'drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]'}`}
      aria-label="Classic Yellow Oval Batman Logo"
    >
      {/* Outer black border oval */}
      <ellipse cx="250" cy="150" rx="245" ry="145" fill="#000000" />
      
      {/* Iconic vibrant yellow oval fill */}
      <ellipse cx="250" cy="150" rx="226" ry="126" fill="#FFE100" />

      {/* Inner black bat silhouette matching the classic emblem */}
      <path
        d="M 250,105 
           C 246,118 243,124 238,124 
           C 234,124 233,105 233,95 
           C 229,102 225,124 212,126 
           C 192,129 164,104 126,112 
           C 88,120 58,142 36,155 
           C 52,156 80,157 104,166 
           C 124,174 135,190 132,204 
           C 139,191 160,178 184,178 
           C 198,178 210,186 218,198 
           C 224,188 236,182 245,185 
           C 248,186 249,195 250,225 
           C 251,195 252,186 255,185 
           C 264,182 276,188 282,198 
           C 290,186 302,178 316,178 
           C 340,178 361,191 368,204 
           C 365,190 376,174 396,166 
           C 420,157 448,156 464,155 
           C 442,142 412,120 374,112 
           C 336,104 308,129 288,126 
           C 275,124 271,102 267,95 
           C 267,105 266,124 262,124 
           C 257,124 254,118 250,105 Z"
        fill="#000000"
      />
    </svg>
  );
};

export const BatSignalBeam: React.FC<{ active?: boolean }> = ({ active = true }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Upward Volumetric Searchlight Beam */}
      <div 
        className={`absolute -top-10 left-1/2 -translate-x-1/2 w-[340px] sm:w-[480px] md:w-[600px] h-[480px] md:h-[650px] transition-opacity duration-1000 ${
          active ? 'opacity-90' : 'opacity-40'
        }`}
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 25%, rgba(255, 225, 0, 0.32) 0%, rgba(234, 150, 20, 0.14) 40%, rgba(0, 0, 0, 0) 80%)',
          filter: 'blur(10px)',
          clipPath: 'polygon(15% 100%, 85% 100%, 100% 0%, 0% 0%)',
        }}
      />

      {/* The Iconic Yellow Oval Bat-Signal projected in the clouds */}
      <div 
        className="absolute top-6 sm:top-10 md:top-14 left-1/2 -translate-x-1/2 w-44 sm:w-60 md:w-80 h-28 sm:h-38 md:h-52 rounded-[50%] flex items-center justify-center transition-all duration-700 animate-pulse"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 235, 59, 0.55) 0%, rgba(255, 214, 0, 0.28) 55%, rgba(0,0,0,0) 80%)',
          boxShadow: '0 0 70px 25px rgba(255, 225, 0, 0.25)',
        }}
      >
        <BatLogo className="w-28 sm:w-40 md:w-56 h-18 sm:h-26 md:h-36 drop-shadow-[0_0_20px_rgba(255,225,0,0.8)] transform -rotate-1" />
      </div>

      {/* Auxiliary sweeping searchlight 1 */}
      <div 
        className="absolute bottom-0 left-[10%] w-16 md:w-32 h-[80vh] origin-bottom -rotate-25 opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(200, 220, 255, 0.18) 0%, rgba(100, 150, 240, 0.05) 70%, transparent 100%)',
          filter: 'blur(14px)',
          animation: 'sweep1 14s ease-in-out infinite alternate',
        }}
      />

      {/* Auxiliary sweeping searchlight 2 */}
      <div 
        className="absolute bottom-0 right-[10%] w-16 md:w-32 h-[80vh] origin-bottom rotate-25 opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(255, 225, 0, 0.18) 0%, rgba(200, 150, 50, 0.04) 70%, transparent 100%)',
          filter: 'blur(16px)',
          animation: 'sweep2 18s ease-in-out infinite alternate',
        }}
      />
    </div>
  );
};
