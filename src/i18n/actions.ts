"use server";

import { cookies } from "next/headers";
import { COOKIE_LOCALE, estLocale } from "./config";

export async function setLocale(locale: string) {
  // On ne fait jamais confiance à ce qui vient du navigateur : on revérifie
  if (!estLocale(locale)) return;

  const store = await cookies();
  store.set(COOKIE_LOCALE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 an
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}