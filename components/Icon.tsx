import type { IconName } from "@/lib/content";

const paths: Record<IconName, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </>
  ),
  robot: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 8V4M8 13h.01M16 13h.01M9 17h6" />
      <path d="M2 12v3M22 12v3" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "plus-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  map: (
    <>
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  folder: (
    <>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </>
  ),
  bank: (
    <>
      <path d="M3 9 12 4l9 5" />
      <path d="M5 9v9M19 9v9M9 9v9M15 9v9" />
      <path d="M3 20h18" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 18c0-7 6-12 14-12 0 8-5 13-12 13a6 6 0 0 1-2-1z" />
      <path d="M9 17c2-4 5-6 8-7" />
    </>
  ),
  road: (
    <>
      <path d="M4 20 8 4h8l4 16" />
      <path d="M12 5v3M12 11v2M12 16v3" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="12" height="12" rx="2" />
      <path d="m15 10 6-3v10l-6-3z" />
    </>
  ),
  antenna: (
    <>
      <circle cx="12" cy="9" r="2" />
      <path d="M7.5 13.5a6 6 0 0 1 0-9M16.5 4.5a6 6 0 0 1 0 9" />
      <path d="M12 11v9" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01M10 21v-3h4v3" />
    </>
  ),
  chat: (
    <>
      <path d="M5 5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 4V7a2 2 0 0 1 2-2z" />
      <path d="M9 10h6M9 13h4" />
    </>
  ),
  "camera-shield": (
    <>
      <path d="M12 3 5 6v6c0 4 3 6.5 7 9 4-2.5 7-5 7-9V6l-7-3z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
  house: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  wifi: (
    <>
      <path d="M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0" />
      <path d="M12 19h.01" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  "bar-chart": (
    <>
      <path d="M4 20V4" />
      <path d="M8 20v-6M13 20v-10M18 20v-4" />
      <path d="M4 20h16" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v6c0 4 3 6.5 7 9 4-2.5 7-5 7-9V6l-7-3z" />
      <path d="m9.5 12 1.8 1.8 3.2-3.6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 6a3 3 0 0 1 0 5.5M18 20a5.5 5.5 0 0 0-3-4.9" />
    </>
  ),
  cube: (
    <>
      <path d="M12 3 4 7v10l8 4 8-4V7z" />
      <path d="m4 7 8 4 8-4M12 11v10" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14-4.5L4 8" />
      <path d="M4 4v4h4" />
      <path d="M4 13a8 8 0 0 0 14 4.5L20 16" />
      <path d="M20 20v-4h-4" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.7-2 2-2 3.5M12 17h.01" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 15h6M9 9h3" />
    </>
  ),
  telegram: <path d="M21 5 3 12l5 2 2 5 3-4 5 3z" />,
  book: (
    <>
      <path d="M5 4h9a2 2 0 0 1 2 2v14H7a2 2 0 0 0-2 2z" />
      <path d="M16 6h3v14h-3" />
    </>
  ),
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
};

export default function Icon({
  name,
  className,
  strokeWidth = 1.7,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
