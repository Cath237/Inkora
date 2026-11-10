import AppHeader from "@/components/app/AppHeader";
import BottomNav from "@/components/app/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader />
      {/* pb-24 : laisse la place à la barre du bas sur téléphone */}
      <div className="pb-24 md:pb-10">{children}</div>
      <BottomNav />
    </div>
  );
}