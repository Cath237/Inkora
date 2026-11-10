"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import Logo from "@/components/Logo";
import ProfileButton from "./ProfileButton";
import { boutonRond } from "./styles";
import { navigation } from "@/lib/navigation";

export default function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-bordure bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-4">
        <Link href="/accueil" className="flex items-center gap-2">
          <Logo variante="dore" largeur={32} alt="" priority />
          <span className="font-serif text-2xl text-marron">Inkora</span>
        </Link>

        {/* Menu visible seulement sur tablette et ordinateur */}
        <nav
          aria-label="Navigation principale"
          className="ml-4 hidden items-center gap-1 md:flex"
        >
          {navigation
            .filter((item) => !item.mobileSeulement)
            .map(({ href, label }) => {
              const actif = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={actif ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    actif
                      ? "bg-creme text-marron"
                      : "text-texte-secondaire hover:text-marron"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button type="button" aria-label="Notifications" className={boutonRond}>
            <Bell size={20} aria-hidden="true" />
          </button>
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}