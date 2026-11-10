"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-bordure bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {navigation.map(({ href, label, icone: Icone }) => {
          const actif = pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={actif ? "page" : undefined}
                className={`flex flex-col items-center gap-1 border-t-2 py-2.5 text-[11px] transition ${
                  actif
                    ? "border-or font-medium text-marron"
                    : "border-transparent text-texte-secondaire"
                }`}
              >
                <Icone size={22} strokeWidth={actif ? 2.25 : 1.75} aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}