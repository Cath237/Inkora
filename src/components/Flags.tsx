export function FlagFR() {
  return (
    <svg
      viewBox="0 0 60 60"
      width="56"
      height="56"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <clipPath id="clip-fr">
          <circle cx="30" cy="30" r="30" />
        </clipPath>
      </defs>
      <g clipPath="url(#clip-fr)">
        <rect width="20" height="60" fill="#0055A4" />
        <rect x="20" width="20" height="60" fill="#FFFFFF" />
        <rect x="40" width="20" height="60" fill="#EF4135" />
      </g>
      <circle cx="30" cy="30" r="29.5" fill="none" stroke="#EADFD3" />
    </svg>
  );
}

export function FlagEN() {
  return (
    <svg
      viewBox="0 0 60 60"
      width="56"
      height="56"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <clipPath id="clip-en">
          <circle cx="30" cy="30" r="30" />
        </clipPath>
      </defs>
      <g clipPath="url(#clip-en)">
        <rect width="60" height="60" fill="#012169" />
        <path d="M0 0L60 60M60 0L0 60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M0 0L60 60M60 0L0 60" stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0V60M0 30H60" stroke="#FFFFFF" strokeWidth="16" />
        <path d="M30 0V60M0 30H60" stroke="#C8102E" strokeWidth="9" />
      </g>
    </svg>
  );
}