"use client";

import { ComponentProps, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "./Input";

type PasswordInputProps = Omit<ComponentProps<typeof Input>, "type" | "droite">;

export default function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      {...props}
      type={visible ? "text" : "password"}
      droite={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={
            visible ? "Masquer le mot de passe" : "Afficher le mot de passe"
          }
          className="text-texte-secondaire transition hover:text-marron"
        >
          {visible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      }
    />
  );
}