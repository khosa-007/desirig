export function CompanyOwner({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Turban - dark maroon (boss vibes) */}
      <ellipse cx="100" cy="50" rx="44" ry="40" fill="#7F1D1D" />
      <path d="M60 53c0-23 18-42 40-42s40 19 40 42" fill="#991B1B" />
      <path d="M68 43c5-19 16-30 32-30s27 11 32 30" fill="#7F1D1D" />
      <ellipse cx="100" cy="28" rx="8" ry="5" fill="#6B0F0F" />
      {/* Turban jewel - gold */}
      <circle cx="100" cy="40" r="5" fill="#FACC15" />
      <circle cx="100" cy="40" r="2.5" fill="#FDE68A" />

      {/* Face - slightly rounder (well-fed boss) */}
      <ellipse cx="100" cy="78" rx="32" ry="30" fill="#C68642" />

      {/* Eyes - stern/confident */}
      <ellipse cx="89" cy="74" rx="3.5" ry="3.5" fill="#1a1a1a" />
      <ellipse cx="111" cy="74" rx="3.5" ry="3.5" fill="#1a1a1a" />
      <circle cx="90.5" cy="73" r="1.2" fill="white" />
      <circle cx="112.5" cy="73" r="1.2" fill="white" />

      {/* Eyebrows - thicker, bossy */}
      <path d="M82 67c3-3 6-4 11-3" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M107 64c4-1 8 0 11 3" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />

      {/* Confident smirk */}
      <path d="M90 88c3 3 8 4 14 2" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />

      {/* Beard - full, well-groomed */}
      <path d="M70 82c0 20 13 30 30 30s30-10 30-30" fill="#1a1a1a" opacity="0.85" />
      <path d="M73 82c0 17 12 26 27 26s27-9 27-26" fill="#333" />

      {/* Dress shirt - white/light */}
      <path d="M48 118c0-8 22-14 52-14s52 6 52 14v68H48v-68z" fill="#E5E7EB" />
      {/* Shirt collar */}
      <path d="M78 104l22 16 22-16" stroke="#D1D5DB" strokeWidth="3" fill="white" />
      {/* Tie */}
      <rect x="96" y="118" width="8" height="50" rx="2" fill="#7F1D1D" />
      <path d="M96 118l4-6 4 6" fill="#7F1D1D" />
      <path d="M95 168l5 8 5-8" fill="#7F1D1D" />

      {/* Gold CEO badge on chest */}
      <rect x="64" y="128" width="28" height="14" rx="3" fill="#FACC15" />
      <text x="78" y="138" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#111" fontFamily="sans-serif">CEO</text>

      {/* Left arm with clipboard */}
      <path d="M48 130c-5 5-8 15-5 25l15-2c-2-8 0-15 3-20" fill="#C68642" />
      <path d="M45 155c10 5 20 6 30 4" stroke="#C68642" strokeWidth="12" strokeLinecap="round" />
      <circle cx="48" cy="155" r="7" fill="#C68642" />
      {/* Clipboard */}
      <rect x="20" y="132" width="30" height="40" rx="3" fill="#92400E" />
      <rect x="24" y="136" width="22" height="32" rx="2" fill="white" />
      <rect x="30" y="128" width="10" height="8" rx="2" fill="#666" />
      {/* Clipboard lines */}
      <line x1="27" y1="143" x2="43" y2="143" stroke="#ccc" strokeWidth="1.5" />
      <line x1="27" y1="149" x2="43" y2="149" stroke="#ccc" strokeWidth="1.5" />
      <line x1="27" y1="155" x2="40" y2="155" stroke="#ccc" strokeWidth="1.5" />
      <line x1="27" y1="161" x2="43" y2="161" stroke="#ccc" strokeWidth="1.5" />

      {/* Right arm (crosses body) */}
      <path d="M152 130c5 5 8 15 5 25l-15-2c2-8 0-15-3-20" fill="#C68642" />
      <path d="M155 155c-10 5-25 8-40 6" stroke="#C68642" strokeWidth="12" strokeLinecap="round" />
      <circle cx="152" cy="155" r="7" fill="#C68642" />

      {/* Shirt sleeve cuffs */}
      <rect x="42" y="128" width="14" height="4" rx="2" fill="#D1D5DB" />
      <rect x="144" y="128" width="14" height="4" rx="2" fill="#D1D5DB" />

      {/* Belt */}
      <rect x="48" y="182" width="104" height="5" rx="2" fill="#1a1a1a" />
      <rect x="96" y="181" width="8" height="7" rx="1" fill="#FACC15" />

      {/* Dress pants */}
      <rect x="60" y="187" width="28" height="48" rx="4" fill="#1F2937" />
      <rect x="112" y="187" width="28" height="48" rx="4" fill="#1F2937" />

      {/* Dress shoes */}
      <rect x="57" y="228" width="34" height="10" rx="5" fill="#1a1a1a" />
      <rect x="109" y="228" width="34" height="10" rx="5" fill="#1a1a1a" />
      {/* Shoe shine */}
      <rect x="64" y="230" width="12" height="3" rx="1.5" fill="#333" opacity="0.4" />
      <rect x="116" y="230" width="12" height="3" rx="1.5" fill="#333" opacity="0.4" />
    </svg>
  );
}

export function CompanyOwnerAvatar({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="20" cy="20" r="20" fill="#FEE2E2" />
      {/* Turban */}
      <ellipse cx="20" cy="14" rx="10" ry="9" fill="#7F1D1D" />
      <path d="M11 15c0-5 4-9 9-9s9 4 9 9" fill="#991B1B" />
      <circle cx="20" cy="12" r="1.5" fill="#FACC15" />
      {/* Face */}
      <ellipse cx="20" cy="20" rx="8" ry="7.5" fill="#C68642" />
      {/* Eyes */}
      <circle cx="17" cy="19" r="1.2" fill="#1a1a1a" />
      <circle cx="23" cy="19" r="1.2" fill="#1a1a1a" />
      {/* Smirk */}
      <path d="M17 23c1.5 1.5 3 2 5 1" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round" />
      {/* Beard */}
      <path d="M13 22c0 5 3 7 7 7s7-2 7-7" fill="#333" opacity="0.7" />
      {/* Shirt + tie */}
      <path d="M10 32c0-2 4-4 10-4s10 2 10 4v8H10v-8z" fill="#E5E7EB" />
      <rect x="19" y="29" width="2" height="8" fill="#7F1D1D" />
    </svg>
  );
}
