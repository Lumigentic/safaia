import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Safaia - Wydawnictwo | Odkrywamy intelektualne klejnoty",
  description: "Niezależne polskie wydawnictwo specjalizujące się w literaturze faktu. Sztuka, moda, fotografia, sztuka ludowa i historia kulinariów. Wiedza jako źródło szczęścia.",
  keywords: ["wydawnictwo", "książki", "literatura faktu", "sztuka", "moda", "fotografia", "wydawnictwo niezależne", "Safaia"],
  openGraph: {
    title: "Safaia - Wydawnictwo",
    description: "Odkrywamy intelektualne klejnoty i dzielimy się nimi ze światem",
    type: "website",
    locale: "pl_PL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="antialiased">
        <Navigation />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
