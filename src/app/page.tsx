"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";

export default function Home() {
  const t = useTranslations("Splash");
  const router = useRouter();

  // 0 = plume dorée, 1 = logo avec texte, 2 = phrases + bouton
  const [etape, setEtape] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setEtape(1), 2200);
    const t2 = setTimeout(() => setEtape(2), 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const apparition = etape >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-creme p-6">
      <div className="relative h-[277px] w-[240px]">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={
            etape === 0 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }
          }
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Logo variante="dore" largeur={200} alt="" priority />
        </motion.div>

        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: etape >= 1 ? 1 : 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Logo variante="marron" largeur={240} priority />
        </motion.div>
      </div>

      <motion.h1
        className="text-center font-serif text-3xl text-marron"
        initial={{ opacity: 0, y: 20 }}
        animate={apparition}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {t("slogan")}
      </motion.h1>

      <motion.p
        className="text-texte-secondaire"
        initial={{ opacity: 0, y: 20 }}
        animate={apparition}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
      >
        {t("devise")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={apparition}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
        className={etape >= 2 ? "" : "pointer-events-none"}
      >
        <Button onClick={() => router.push("/langue")}>{t("commencer")}</Button>
      </motion.div>
    </main>
  );
}