import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Safaia - Wydawnictwo',
    template: '%s | Safaia',
  },
  description: 'Niezależne wydawnictwo specjalizujące się w literaturze faktu o sztuce, modzie, fotografii i kulturze ludowej.',
  openGraph: {
    title: 'Safaia - Wydawnictwo',
    description: 'Niezależne wydawnictwo specjalizujące się w literaturze faktu o sztuce, modzie, fotografii i kulturze ludowej.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <Navigation />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
