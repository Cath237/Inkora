"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { slides } from "./slides";

export default function OnboardingPage() {
  const t = useTranslations("Onboarding");
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const slide = slides[index];
  const estDernier = index === slides.length - 1;

  function terminer() {
    router.push("/connexion");
  }

  function suivant() {
    if (estDernier) terminer();
    else setIndex((i) => i + 1);
  }

  function precedent() {
    setIndex((i) => Math.max(i - 1, 0));
  }

  return (
    <main className="min-h-screen bg-ivoire md:flex md:items-center">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 md:min-h-0 md:py-12">
        <header className="text-center">
          <p className="font-serif text-lg text-marron md:text-xl">
            {t("bienvenue")}
          </p>
          <p className="text-sm text-texte-secondaire">{t("plateforme")}</p>
        </header>

        <div className="flex flex-1 items-center overflow-hidden md:flex-none md:py-10">
          <AnimatePresence mode="wait">
            <motion.section
              key={index}
              className="w-full text-center md:grid md:grid-cols-2 md:items-center md:gap-12 md:text-left"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) suivant();
                if (info.offset.x > 80) precedent();
              }}
            >
              <Image
                src={slide.image}
                alt={t(`slides.${slide.cle}.alt`)}
                width={900}
                height={600}
                priority={index === 0}
                draggable={false}
                className="h-auto w-full"
              />

              <div>
                <h1 className="mt-6 font-serif text-2xl text-marron md:mt-0 md:text-4xl">
                  {t(`slides.${slide.cle}.titre`)}
                </h1>
                <p className="mt-3 text-texte-secondaire md:mt-4 md:text-lg">
                  {t(`slides.${slide.cle}.texte`)}
                </p>
              </div>
            </motion.section>
          </AnimatePresence>
        </div>

        <footer className="md:ml-auto md:w-[calc(50%_-_1.5rem)]">
          <div className="flex items-center justify-between">
            {estDernier ? (
              <span />
            ) : (
              <button
                onClick={terminer}
                className="px-2 py-2 text-sm text-marron hover:underline"
              >
                {t("passer")}
              </button>
            )}

            <Button onClick={suivant} className="flex items-center gap-2">
              {estDernier ? t("commencer") : t("suivant")}
              {!estDernier && <ArrowRight size={18} />}
            </Button>
          </div>

          <div className="mt-6 flex justify-center gap-2 md:justify-start">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={t("allerEcran", { numero: i + 1 })}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-marron" : "w-2 bg-bordure"
                }`}
              />
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}