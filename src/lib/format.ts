const formatNote = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const formatVues = new Intl.NumberFormat("fr-FR", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export const formaterNote = (n: number) => formatNote.format(n);
export const formaterVues = (n: number) => formatVues.format(n);