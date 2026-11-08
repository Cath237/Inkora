import Image from "next/image";

const logos = {
  marron: { src: "/images/logo-marron.png", ratio: 937 / 810 },
  dore: { src: "/images/logo-dore.png", ratio: 855 / 800 },
};

type LogoProps = {
  variante?: keyof typeof logos;
  largeur?: number;
  alt?: string;
  priority?: boolean;
  className?: string;
};

export default function Logo({
  variante = "marron",
  largeur = 240,
  alt = "Logo Inkora",
  priority = false,
  className,
}: LogoProps) {
  const logo = logos[variante];

  return (
    <Image
      src={logo.src}
      alt={alt}
      width={largeur}
      height={Math.round(largeur * logo.ratio)}
      priority={priority}
      className={className}
    />
  );
}