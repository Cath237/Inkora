import { ReactNode } from "react";

export default function Rail({ children }: { children: ReactNode }) {
  return (
    <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
}