import { Footer } from "~/app/_components/Footer";
import { Header } from "~/app/_components/Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-full w-full flex-col">
      <Header />
      <main className="flex-auto py-8">{children}</main>
      <Footer />
    </div>
  );
}
