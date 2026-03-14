export function PunjabiAunty({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hair */}
      <ellipse cx="100" cy="55" rx="32" ry="30" fill="#1a1a1a" />

      {/* Dupatta over head */}
      <path d="M65 45c0-20 15-35 35-35s35 15 35 35v15c0 5-8 10-35 10s-35-5-35-10V45z" fill="#EC4899" />
      <circle cx="80" cy="35" r="2" fill="#FDE68A" opacity="0.6" />
      <circle cx="95" cy="25" r="2" fill="#FDE68A" opacity="0.6" />
      <circle cx="110" cy="30" r="2" fill="#FDE68A" opacity="0.6" />
      <circle cx="120" cy="40" r="2" fill="#FDE68A" opacity="0.6" />

      {/* Face */}
      <ellipse cx="100" cy="75" rx="28" ry="26" fill="#DBA167" />

      {/* Bindi */}
      <circle cx="100" cy="62" r="3" fill="#DC2626" />

      {/* Eyes */}
      <ellipse cx="91" cy="72" rx="3" ry="3.5" fill="#1a1a1a" />
      <ellipse cx="109" cy="72" rx="3" ry="3.5" fill="#1a1a1a" />
      <circle cx="92" cy="71" r="1" fill="white" />
      <circle cx="110" cy="71" r="1" fill="white" />

      {/* Eyebrows */}
      <path d="M86 67c2-2 4-3 7-2" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M107 65c3-1 5 0 7 2" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />

      {/* Warm smile */}
      <path d="M90 82c3 4 8 6 14 4" stroke="#8B5E3C" strokeWidth="2" strokeLinecap="round" />

      {/* Nose ring */}
      <circle cx="98" cy="77" r="2" fill="none" stroke="#FACC15" strokeWidth="1.5" />

      {/* Earrings */}
      <circle cx="72" cy="78" r="3" fill="#FACC15" />
      <circle cx="128" cy="78" r="3" fill="#FACC15" />

      {/* Kameez - green */}
      <path d="M55 115c0-8 18-14 45-14s45 6 45 14v70H55v-70z" fill="#059669" />
      {/* Kameez neckline */}
      <path d="M85 101c5 8 10 12 15 12s10-4 15-12" stroke="#047857" strokeWidth="2" fill="none" />
      {/* Gold embroidery */}
      <path d="M75 125h50" stroke="#FACC15" strokeWidth="1" strokeDasharray="4 3" />
      <path d="M80 135h40" stroke="#FACC15" strokeWidth="1" strokeDasharray="4 3" />

      {/* Dupatta drape over shoulder */}
      <path d="M60 115c-5 10-8 30-5 50l15-5c-3-15 0-30 5-40" fill="#EC4899" opacity="0.8" />

      {/* Bangles - left */}
      <circle cx="52" cy="155" r="6" fill="none" stroke="#FACC15" strokeWidth="2" />
      <circle cx="52" cy="155" r="8" fill="none" stroke="#DC2626" strokeWidth="1.5" />
      {/* Bangles - right */}
      <circle cx="148" cy="155" r="6" fill="none" stroke="#FACC15" strokeWidth="2" />
      <circle cx="148" cy="155" r="8" fill="none" stroke="#DC2626" strokeWidth="1.5" />

      {/* Hands */}
      <circle cx="48" cy="165" r="7" fill="#DBA167" />
      <circle cx="152" cy="165" r="7" fill="#DBA167" />

      {/* Shopping bag in right hand */}
      <rect x="140" y="165" width="20" height="25" rx="3" fill="#FACC15" />
      <path d="M144 165c0-5 3-8 8-8s8 3 8 8" stroke="#111" strokeWidth="2" fill="none" />

      {/* Salwar */}
      <rect x="65" y="185" width="25" height="50" rx="6" fill="#059669" opacity="0.8" />
      <rect x="110" y="185" width="25" height="50" rx="6" fill="#059669" opacity="0.8" />

      {/* Jutti */}
      <ellipse cx="78" cy="234" rx="15" ry="5" fill="#DC2626" />
      <ellipse cx="122" cy="234" rx="15" ry="5" fill="#DC2626" />
      <circle cx="78" cy="232" r="2" fill="#FACC15" />
      <circle cx="122" cy="232" r="2" fill="#FACC15" />
    </svg>
  );
}

export function PunjabiAuntyAvatar({ size = 40, className = "" }: { size?: number; className?: string }) {
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
      {/* Dupatta */}
      <path d="M10 14c0-5 4-9 10-9s10 4 10 9v4c0 2-3 3-10 3s-10-1-10-3v-4z" fill="#EC4899" />
      {/* Face */}
      <ellipse cx="20" cy="20" rx="8" ry="7" fill="#DBA167" />
      {/* Bindi */}
      <circle cx="20" cy="16" r="1.5" fill="#DC2626" />
      {/* Eyes */}
      <circle cx="17" cy="19" r="1.2" fill="#1a1a1a" />
      <circle cx="23" cy="19" r="1.2" fill="#1a1a1a" />
      {/* Smile */}
      <path d="M17 23c1.5 2 3.5 2 5 1" stroke="#8B5E3C" strokeWidth="1" strokeLinecap="round" />
      {/* Kameez */}
      <path d="M10 32c0-2 4-4 10-4s10 2 10 4v8H10v-8z" fill="#059669" />
    </svg>
  );
}
