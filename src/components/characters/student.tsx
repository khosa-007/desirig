export function Student({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Turban - maroon */}
      <ellipse cx="100" cy="52" rx="38" ry="34" fill="#7F1D1D" />
      <path d="M66 55c0-20 15-36 34-36s34 16 34 36" fill="#6B1A1A" />
      <path d="M74 46c4-15 13-24 26-24s22 9 26 24" fill="#7F1D1D" />
      <ellipse cx="100" cy="32" rx="6" ry="4" fill="#6B1A1A" />

      {/* Face - younger/lighter */}
      <ellipse cx="100" cy="76" rx="27" ry="25" fill="#DBA167" />

      {/* Eyes - bigger, more innocent */}
      <ellipse cx="91" cy="73" rx="4" ry="4.5" fill="#1a1a1a" />
      <ellipse cx="109" cy="73" rx="4" ry="4.5" fill="#1a1a1a" />
      <circle cx="92.5" cy="72" r="1.5" fill="white" />
      <circle cx="110.5" cy="72" r="1.5" fill="white" />

      {/* Eyebrows */}
      <path d="M84 67c2-2 5-3 9-2" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M107 65c4-1 7 0 9 2" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />

      {/* Friendly smile */}
      <path d="M89 84c4 4 9 5 15 3" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />

      {/* Light facial hair */}
      <path d="M80 85c0 10 9 16 20 16s20-6 20-16" fill="#8B5E3C" opacity="0.15" />

      {/* Blue shirt / hoodie */}
      <path d="M55 118c0-8 18-14 45-14s45 6 45 14v65H55v-65z" fill="#2563EB" />
      {/* Hood */}
      <path d="M70 104c10-3 20-5 30-5s20 2 30 5c-5-2-15-8-30-8s-25 6-30 8z" fill="#1D4ED8" />
      {/* Front pocket */}
      <rect x="72" y="150" width="56" height="20" rx="3" fill="#1D4ED8" />

      {/* Left hand holding AZ book */}
      <circle cx="50" cy="160" r="7" fill="#DBA167" />
      {/* AZ Book */}
      <rect x="28" y="145" width="24" height="32" rx="2" fill="#FACC15" />
      <rect x="30" y="147" width="20" height="28" rx="1" fill="#FDE68A" />
      <text x="40" y="160" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#111" fontFamily="sans-serif">AZ</text>
      <text x="40" y="170" textAnchor="middle" fontSize="5" fill="#555" fontFamily="sans-serif">LICENSE</text>

      {/* Right hand */}
      <circle cx="150" cy="160" r="7" fill="#DBA167" />

      {/* Jeans */}
      <rect x="65" y="183" width="25" height="50" rx="4" fill="#1E3A5F" />
      <rect x="110" y="183" width="25" height="50" rx="4" fill="#1E3A5F" />

      {/* Sneakers */}
      <rect x="62" y="226" width="30" height="12" rx="6" fill="#F5F5F5" />
      <rect x="108" y="226" width="30" height="12" rx="6" fill="#F5F5F5" />
      <rect x="62" y="230" width="30" height="4" rx="2" fill="#E5E5E5" />
      <rect x="108" y="230" width="30" height="4" rx="2" fill="#E5E5E5" />
    </svg>
  );
}

export function StudentAvatar({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="20" cy="20" r="20" fill="#FECACA" />
      {/* Turban */}
      <ellipse cx="20" cy="14" rx="10" ry="8" fill="#7F1D1D" />
      <path d="M11 15c0-5 4-8 9-8s9 3 9 8" fill="#6B1A1A" />
      {/* Face */}
      <ellipse cx="20" cy="20" rx="7" ry="7" fill="#DBA167" />
      {/* Eyes */}
      <circle cx="17" cy="19" r="1.5" fill="#1a1a1a" />
      <circle cx="23" cy="19" r="1.5" fill="#1a1a1a" />
      {/* Smile */}
      <path d="M17 23c1.5 2 3.5 2 5 1" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round" />
      {/* Hoodie */}
      <path d="M10 32c0-2 4-4 10-4s10 2 10 4v8H10v-8z" fill="#2563EB" />
    </svg>
  );
}
