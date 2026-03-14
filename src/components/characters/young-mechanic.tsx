export function YoungMechanic({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Turban - blue */}
      <ellipse cx="100" cy="52" rx="40" ry="36" fill="#1E40AF" />
      <path d="M64 55c0-21 16-38 36-38s36 17 36 38" fill="#1E3A8A" />
      <path d="M72 46c4-16 14-26 28-26s24 10 28 26" fill="#1E40AF" />
      <ellipse cx="100" cy="32" rx="7" ry="4" fill="#1E3A8A" />

      {/* Face */}
      <ellipse cx="100" cy="78" rx="28" ry="26" fill="#C68642" />

      {/* Eyes */}
      <ellipse cx="91" cy="74" rx="3" ry="3.5" fill="#1a1a1a" />
      <ellipse cx="109" cy="74" rx="3" ry="3.5" fill="#1a1a1a" />
      <circle cx="92" cy="73" r="1" fill="white" />
      <circle cx="110" cy="73" r="1" fill="white" />

      {/* Eyebrows */}
      <path d="M85 69c2-2 5-3 8-2" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M107 67c3-1 6 0 8 2" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />

      {/* Grin */}
      <path d="M90 84c3 4 7 6 13 4" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />

      {/* Light stubble */}
      <path d="M76 82c0 14 10 22 24 22s24-8 24-22" fill="#8B5E3C" opacity="0.3" />

      {/* Coveralls - gray */}
      <path d="M55 118c0-8 18-14 45-14s45 6 45 14v65H55v-65z" fill="#6B7280" />
      {/* Collar */}
      <path d="M82 104l18 12 18-12" stroke="#4B5563" strokeWidth="2.5" fill="none" />
      {/* Zipper */}
      <line x1="100" y1="116" x2="100" y2="180" stroke="#9CA3AF" strokeWidth="2" />
      {/* SINGH name patch */}
      <rect x="110" y="128" width="32" height="14" rx="2" fill="#1E40AF" />
      <text x="126" y="138" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white" fontFamily="sans-serif">SINGH</text>
      {/* Pocket */}
      <rect x="62" y="135" width="18" height="16" rx="2" fill="#4B5563" />

      {/* Left hand holding wrench */}
      <circle cx="48" cy="165" r="7" fill="#C68642" />
      {/* Wrench */}
      <rect x="30" y="140" width="6" height="35" rx="3" fill="#9CA3AF" />
      <circle cx="33" cy="140" r="6" fill="none" stroke="#9CA3AF" strokeWidth="3" />
      <rect x="30" y="172" width="6" height="4" rx="1" fill="#6B7280" />

      {/* Right hand */}
      <circle cx="152" cy="165" r="7" fill="#C68642" />

      {/* Belt */}
      <rect x="55" y="178" width="90" height="5" rx="2" fill="#1a1a1a" />

      {/* Legs */}
      <rect x="65" y="183" width="25" height="50" rx="4" fill="#6B7280" />
      <rect x="110" y="183" width="25" height="50" rx="4" fill="#6B7280" />

      {/* Work boots */}
      <rect x="60" y="226" width="34" height="12" rx="6" fill="#92400E" />
      <rect x="106" y="226" width="34" height="12" rx="6" fill="#92400E" />
      <rect x="60" y="226" width="34" height="4" rx="2" fill="#78350F" />
      <rect x="106" y="226" width="34" height="4" rx="2" fill="#78350F" />
    </svg>
  );
}

export function YoungMechanicAvatar({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="20" cy="20" r="20" fill="#DBEAFE" />
      {/* Turban */}
      <ellipse cx="20" cy="14" rx="10" ry="9" fill="#1E40AF" />
      <path d="M11 15c0-5 4-9 9-9s9 4 9 9" fill="#1E3A8A" />
      {/* Face */}
      <ellipse cx="20" cy="20" rx="7" ry="7" fill="#C68642" />
      {/* Eyes */}
      <circle cx="17" cy="19" r="1.2" fill="#1a1a1a" />
      <circle cx="23" cy="19" r="1.2" fill="#1a1a1a" />
      {/* Smile */}
      <path d="M17 23c1.5 2 3 2 5 1" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round" />
      {/* Coveralls */}
      <path d="M10 32c0-2 4-4 10-4s10 2 10 4v8H10v-8z" fill="#6B7280" />
    </svg>
  );
}
