import { useId } from 'react';

const SILHOUETTE = "M 200 18 C 255 18, 288 58, 288 108 C 288 148, 272 180, 248 196 C 244 202, 238 210, 234 220 C 258 232, 310 252, 358 282 C 390 302, 410 340, 410 560 L -10 560 C -10 340, 10 302, 42 282 C 90 252, 142 232, 166 220 C 162 210, 156 202, 152 196 C 128 180, 112 148, 112 108 C 112 58, 145 18, 200 18 Z";

interface RealisticSilhouetteProps {
  svgClass?: string;
}

export function RealisticSilhouette({ svgClass = "absolute inset-0 w-full h-full" }: RealisticSilhouetteProps) {
  const uid = useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 400 560"
      xmlns="http://www.w3.org/2000/svg"
      className={svgClass}
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id={`${uid}-base`} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.13)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.07)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
        </linearGradient>
        <radialGradient id={`${uid}-rim`} cx="20%" cy="18%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.20)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="30%" r="45%">
          <stop offset="0%" stopColor="rgba(232,71,26,0.18)" />
          <stop offset="100%" stopColor="rgba(232,71,26,0)" />
        </radialGradient>
        <filter id={`${uid}-blur`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <clipPath id={`${uid}-clip`}>
          <path d={SILHOUETTE} />
        </clipPath>
      </defs>

      <path d={SILHOUETTE} fill="rgba(0,0,0,0.4)" filter={`url(#${uid}-blur)`} transform="translate(3,8)" />
      <path d={SILHOUETTE} fill={`url(#${uid}-base)`} />
      <path d={SILHOUETTE} fill={`url(#${uid}-rim)`} />
      <path d={SILHOUETTE} fill={`url(#${uid}-glow)`} className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <line x1="80" y1="0" x2="50" y2="560" stroke="rgba(255,255,255,0.035)" strokeWidth="40" clipPath={`url(#${uid}-clip)`} />
    </svg>
  );
}
