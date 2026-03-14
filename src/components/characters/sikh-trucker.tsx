export function SikhTrucker({ size = 200, className = "" }: { size?: number; className?: string }) {
  const scale = size / 200;
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Truck silhouette behind */}
      <rect x="10" y="180" width="180" height="50" rx="8" fill="#333" opacity="0.25" />
      <rect x="120" y="155" width="70" height="75" rx="6" fill="#333" opacity="0.25" />
      <circle cx="40" cy="232" r="12" fill="#333" opacity="0.2" />
      <circle cx="80" cy="232" r="12" fill="#333" opacity="0.2" />
      <circle cx="160" cy="232" r="12" fill="#333" opacity="0.2" />

      {/* Turban - orange */}
      <ellipse cx="100" cy="52" rx="42" ry="38" fill="#E85D26" />
      <path d="M62 55c0-22 17-40 38-40s38 18 38 40" fill="#D4521E" />
      <path d="M70 45c5-18 15-28 30-28s25 10 30 28" fill="#E85D26" />
      <ellipse cx="100" cy="30" rx="8" ry="5" fill="#C44A1A" />
      {/* Turban jewel */}
      <circle cx="100" cy="42" r="4" fill="#FACC15" />
      <circle cx="100" cy="42" r="2" fill="#FDE68A" />

      {/* Face */}
      <ellipse cx="100" cy="78" rx="30" ry="28" fill="#C68642" />

      {/* Eyes */}
      <ellipse cx="90" cy="74" rx="3.5" ry="4" fill="#1a1a1a" />
      <ellipse cx="110" cy="74" rx="3.5" ry="4" fill="#1a1a1a" />
      <circle cx="91.5" cy="73" r="1.2" fill="white" />
      <circle cx="111.5" cy="73" r="1.2" fill="white" />

      {/* Eyebrows */}
      <path d="M84 68c2-3 5-4 9-3" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
      <path d="M107 65c4-1 7 0 9 3" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />

      {/* Smile */}
      <path d="M88 86c4 5 10 7 16 5" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />

      {/* Beard */}
      <path d="M72 82c0 18 12 28 28 28s28-10 28-28" fill="#1a1a1a" opacity="0.85" />
      <path d="M75 82c0 15 11 24 25 24s25-9 25-24" fill="#333" />

      {/* Hi-vis vest — wider body, big belly */}
      <path d="M45 118c0-8 22-14 55-14s55 6 55 14v68H45v-68z" fill="#FACC15" />
      {/* Belly bulge */}
      <ellipse cx="100" cy="158" rx="48" ry="22" fill="#FACC15" />
      <ellipse cx="100" cy="158" rx="46" ry="20" fill="#E5A100" opacity="0.3" />
      {/* Vest reflective strips */}
      <rect x="50" y="142" width="100" height="4" rx="2" fill="#FDE68A" opacity="0.8" />
      <rect x="50" y="160" width="100" height="4" rx="2" fill="#FDE68A" opacity="0.8" />
      {/* Vest collar */}
      <path d="M78 106l22 14 22-14" stroke="#E5A100" strokeWidth="3" fill="none" />

      {/* Left hand holding steering wheel */}
      <g>
        {/* Steering wheel */}
        <circle cx="38" cy="158" r="16" fill="none" stroke="#555" strokeWidth="4" />
        <circle cx="38" cy="158" r="4" fill="#555" />
        <line x1="38" y1="142" x2="38" y2="154" stroke="#555" strokeWidth="2.5" />
        <line x1="38" y1="162" x2="38" y2="174" stroke="#555" strokeWidth="2.5" />
        <line x1="22" y1="158" x2="34" y2="158" stroke="#555" strokeWidth="2.5" />
        <line x1="42" y1="158" x2="54" y2="158" stroke="#555" strokeWidth="2.5" />
        {/* Hand gripping top */}
        <circle cx="38" cy="143" r="6" fill="#C68642" />
      </g>

      {/* Right hand - waving */}
      <g className="wave-hand">
        <path d="M158 130c8-4 16-20 20-36" stroke="#C68642" strokeWidth="8" strokeLinecap="round" fill="none" />
        <circle cx="178" cy="88" r="6" fill="#C68642" />
        <rect x="175" y="80" width="5" height="10" rx="2.5" fill="#C68642" />
      </g>

      {/* Belt */}
      <rect x="45" y="182" width="110" height="5" rx="2" fill="#111" />
      <rect x="96" y="181" width="8" height="7" rx="1" fill="#FACC15" />

      {/* Legs - jeans (wider, shorter) */}
      <rect x="58" y="187" width="30" height="48" rx="5" fill="#2D3748" />
      <rect x="112" y="187" width="30" height="48" rx="5" fill="#2D3748" />

      {/* Boots */}
      <rect x="55" y="228" width="36" height="10" rx="5" fill="#1a1a1a" />
      <rect x="109" y="228" width="36" height="10" rx="5" fill="#1a1a1a" />
    </svg>
  );
}

export function SikhTruckerAvatar({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="20" cy="20" r="20" fill="#FDE68A" />
      {/* Turban */}
      <ellipse cx="20" cy="14" rx="10" ry="9" fill="#E85D26" />
      <path d="M11 15c0-5 4-9 9-9s9 4 9 9" fill="#D4521E" />
      <circle cx="20" cy="12" r="1.5" fill="#FACC15" />
      {/* Face */}
      <ellipse cx="20" cy="20" rx="8" ry="7" fill="#C68642" />
      {/* Eyes */}
      <circle cx="17" cy="19" r="1.2" fill="#1a1a1a" />
      <circle cx="23" cy="19" r="1.2" fill="#1a1a1a" />
      {/* Smile */}
      <path d="M17 23c1.5 2 3.5 2 5 1" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round" />
      {/* Beard */}
      <path d="M13 22c0 5 3 7 7 7s7-2 7-7" fill="#333" opacity="0.7" />
      {/* Vest hint */}
      <path d="M10 32c0-2 4-4 10-4s10 2 10 4v8H10v-8z" fill="#FACC15" />
    </svg>
  );
}
