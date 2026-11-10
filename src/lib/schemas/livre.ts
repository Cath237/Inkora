import { z } from "zod";

const caseObligatoire = (message: string) =>
  z.boolean().refine((v) => v, message);

export const livreSchema = z
  .object({
    titre: z
      .string()
      .trim()
      .min(2, "Entrez le titre du livre")
      .max(120, "120 caractères maximum"),
    resume: z
      .string()
      .trim()
      .min(30, "Décrivez votre histoire en au moins 30 caractères")
      .max(1000, "1 000 caractères maximum"),
    langue: z.string().min(1, "Choisissez la langue du livre"),
    publicCible: z.string().min(1, "Choisissez le public visé"),
    genre: z.string().min(1, "Sélectionnez un genre"),
    sousGenres: z.array(z.string()).max(3, "3 sous-genres maximum"),
    motsCles: z.array(z.string()).max(10, "10 mots-clés maximum"),

    // Livre unique ou saga / série
    format: z.enum(["unique", "serie"]),
    nomSerie: z.string().trim(),
    numeroTome: z.string().trim(),
    nombreTomes: z.string().trim(),

    // Attestations
    droits: caseObligatoire(
      "Vous devez attester être l’auteur ou détenir les droits de cette œuvre",
    ),
    conditions: caseObligatoire(
      "Vous devez accepter les conditions de publication",
    ),
  })
  // Règles qui ne s'appliquent que pour une saga ou une série
  .superRefine((d, ctx) => {
    if (d.format !== "serie") return;

    if (d.nomSerie.length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["nomSerie"],
        message: "Entrez le nom de la saga ou de la série",
      });
    }

    const numero = Number(d.numeroTome);
    const numeroValide = Number.isInteger(numero) && numero >= 1 && numero <= 99;
    if (!numeroValide) {
      ctx.addIssue({
        code: "custom",
        path: ["numeroTome"],
        message: "Entrez un numéro entre 1 et 99",
      });
    }

    // Le nombre total de tomes est facultatif : on peut ne pas le connaître
    if (d.nombreTomes !== "") {
      const total = Number(d.nombreTomes);
      if (!Number.isInteger(total) || total < 1 || total > 99) {
        ctx.addIssue({
          code: "custom",
          path: ["nombreTomes"],
          message: "Entrez un nombre entre 1 et 99",
        });
      } else if (numeroValide && total < numero) {
        ctx.addIssue({
          code: "custom",
          path: ["nombreTomes"],
          message: "Le total ne peut pas être inférieur au numéro de ce tome",
        });
      }
    }
  });

export type LivreValues = z.infer<typeof livreSchema>;

export const valeursParDefaut: LivreValues = {
  titre: "",
  resume: "",
  langue: "fr",
  publicCible: "tout-public",
  genre: "",
  sousGenres: [],
  motsCles: [],
  format: "unique",
  nomSerie: "",
  numeroTome: "1",
  nombreTomes: "",
  droits: false,
  conditions: false,
};