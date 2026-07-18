
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'light' | 'dark' | 'color';
}

const IdentityLogo: React.FC<LogoProps> = ({ className = "", size = 40, variant = 'color' }) => {
  const gradientId = "logo-gradient";
  
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" /> {/* indigo-600 */}
            <stop offset="100%" stopColor="#773BEC" /> {/* Custom violet */}
          </linearGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Rhombus Frame */}
        <rect
          x="15"
          y="15"
          width="70"
          height="70"
          rx="18"
          transform="rotate(45 50 50)"
          fill={variant === 'dark' ? '#0f172a' : variant === 'light' ? '#ffffff' : 'url(#' + gradientId + ')'}
          className="transition-all duration-500"
        />

        {/* AI Connectivity Nodes */}
        <circle cx="50" cy="30" r="3" fill={variant === 'color' ? 'white' : 'url(#' + gradientId + ')'} />
        <circle cx="35" cy="55" r="3" fill={variant === 'color' ? 'white' : 'url(#' + gradientId + ')'} />
        <circle cx="65" cy="55" r="3" fill={variant === 'color' ? 'white' : 'url(#' + gradientId + ')'} />
        <path
          d="M50 30L35 55M50 30L65 55M35 55L65 55"
          stroke={variant === 'color' ? 'white' : 'url(#' + gradientId + ')'}
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Data Bar (Data Science) */}
        <rect
          x="47"
          y="45"
          width="6"
          height="25"
          rx="3"
          fill={variant === 'color' ? 'white' : 'url(#' + gradientId + ')'}
          filter="url(#glow)"
        />

        {/* Code Bracket (Web Dev) */}
        <path
          d="M32 45L25 50L32 55"
          stroke={variant === 'color' ? 'white' : 'url(#' + gradientId + ')'}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M68 45L75 50L68 55"
          stroke={variant === 'color' ? 'white' : 'url(#' + gradientId + ')'}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default IdentityLogo;
