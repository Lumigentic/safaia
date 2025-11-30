import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Usługi wydawnicze | Safaia - Wydawnictwo',
  description: 'Profesjonalne usługi wydawnicze: redakcja, korekta, projekt graficzny, skład i dystrybucja. Wydawnictwo Safaia.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-lavender-soft/20 to-transparent">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-4 fade-in-up">Usługi wydawnicze</h1>
            <p className="text-lg text-gray-600 font-body leading-relaxed fade-in-up" style={{ animationDelay: '0.2s' }}>
              Kompleksowa obsługa wydawnicza od pomysłu do gotowej książki
            </p>
          </div>
        </div>
      </section>

      {/* Główne usługi */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: '✍️',
                  title: 'Redakcja',
                  description:
                    'Redakcja merytoryczna i stylistyczna, konsultacje autorskie, fact-checking',
                },
                {
                  icon: '🎨',
                  title: 'Projekt graficzny',
                  description:
                    'Projekt okładki, skład typograficzny, ilustracje i fotografia',
                },
                {
                  icon: '📦',
                  title: 'Dystrybucja',
                  description:
                    'Kolportaż do księgarń, sprzedaż online, marketing i promocja',
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-cream rounded-lg hover:shadow-lg transition-all duration-300 stagger-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg mb-3 text-sapphire-deep font-heading">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-body leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Szczegółowy opis usług */}
      <section className="section-padding bg-cream">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Redakcja */}
            <div className="bg-white p-10 rounded-lg shadow-sm">
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <div className="text-5xl mb-6">✍️</div>
                  <h2 className="mb-6">Redakcja i korekta</h2>
                  <p className="text-gray-600 font-body leading-relaxed mb-6">
                    Oferujemy pełną obsługę redakcyjną — od pierwszej wersji tekstu
                    po gotową do druku publikację.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-heading text-sapphire-deep mb-2">
                      Redakcja merytoryczna
                    </h4>
                    <p className="text-sm text-gray-600 font-body">
                      Weryfikacja faktów, sprawdzanie źródeł, konsultacje z ekspertami
                      w danej dziedzinie.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-heading text-sapphire-deep mb-2">
                      Redakcja stylistyczna
                    </h4>
                    <p className="text-sm text-gray-600 font-body">
                      Poprawa płynności tekstu, ujednolicenie stylu, dbałość o czytelność
                      i elegancję języka.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-heading text-sapphire-deep mb-2">
                      Korekta
                    </h4>
                    <p className="text-sm text-gray-600 font-body">
                      Eliminacja błędów ortograficznych, interpunkcyjnych i gramatycznych.
                      Wieloetapowa weryfikacja.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-heading text-sapphire-deep mb-2">
                      Współpraca z autorem
                    </h4>
                    <p className="text-sm text-gray-600 font-body">
                      Stały kontakt, konsultacje, wspólne wypracowywanie ostatecznej
                      wersji tekstu.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Projekt graficzny */}
            <div className="bg-white p-10 rounded-lg shadow-sm">
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <div className="text-5xl mb-6">🎨</div>
                  <h2 className="mb-6">Projekt graficzny i skład</h2>
                  <p className="text-gray-600 font-body leading-relaxed mb-6">
                    Każda książka to unikalne dzieło. Dbamy o każdy detal wizualny,
                    tworząc projekty, które zachwycają i zapamiętują się.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-heading text-sapphire-deep mb-2">
                      Projekt okładki
                    </h4>
                    <p className="text-sm text-gray-600 font-body">
                      Unikalne, ręcznie projektowane okładki, które wyróżniają się
                      na półce i oddają charakter książki.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-heading text-sapphire-deep mb-2">
                      Skład typograficzny
                    </h4>
                    <p className="text-sm text-gray-600 font-body">
                      Staranny dobór fontów, układu strony i proporcji. Dbałość o czytelność
                      i estetykę.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-heading text-sapphire-deep mb-2">
                      Ilustracje i fotografia
                    </h4>
                    <p className="text-sm text-gray-600 font-body">
                      Współpraca z ilustratorami i fotografami. Retusz i obróbka zdjęć.
                      Layouty albumów.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-heading text-sapphire-deep mb-2">
                      Materiały promocyjne
                    </h4>
                    <p className="text-sm text-gray-600 font-body">
                      Zakładki, plakaty, grafiki do mediów społecznościowych, newsletter.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Produkcja i dystrybucja */}
            <div className="bg-white p-10 rounded-lg shadow-sm">
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <div className="text-5xl mb-6">📦</div>
                  <h2 className="mb-6">Produkcja i dystrybucja</h2>
                  <p className="text-gray-600 font-body leading-relaxed mb-6">
                    Od wyboru papieru po dotarcie książki do czytelników — zajmujemy się
                    całym procesem produkcji i dystrybucji.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-heading text-sapphire-deep mb-2">
                      Druk
                    </h4>
                    <p className="text-sm text-gray-600 font-body">
                      Współpraca z renomowanymi drukarniami. Wysokiej jakości papier i druk.
                      Możliwość wyboru technik zdobniczych.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-heading text-sapphire-deep mb-2">
                      ISBN i legalna depozycja
                    </h4>
                    <p className="text-sm text-gray-600 font-body">
                      Rejestracja ISBN, egzemplarze obowiązkowe, wpis do katalogów
                      bibliotecznych.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-heading text-sapphire-deep mb-2">
                      Dystrybucja
                    </h4>
                    <p className="text-sm text-gray-600 font-body">
                      Kolportaż do księgarń stacjonarnych i online. Własny sklep internetowy.
                      Obecność na targach książki.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-heading text-sapphire-deep mb-2">
                      Marketing i promocja
                    </h4>
                    <p className="text-sm text-gray-600 font-body">
                      Media społecznościowe, współpraca z blogerami, recenzje, wydarzenia
                      promocyjne, newslettery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pakiety */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="mb-4 text-center">Pakiety usług</h2>
            <p className="text-center text-xl text-gray-600 font-body mb-12 max-w-3xl mx-auto">
              Wybierz pakiet dopasowany do Twoich potrzeb lub skontaktuj się z nami,
              aby stworzyć indywidualną ofertę
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Pakiet Basic */}
              <div className="border-2 border-lavender-soft rounded-lg p-8 hover:border-sapphire-deep transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl mb-4 text-sapphire-deep font-heading">
                  Basic
                </h3>
                <p className="text-gray-600 font-body mb-6">
                  Dla autorów, którzy potrzebują wsparcia redakcyjnego
                </p>
                <ul className="space-y-3 mb-8 text-sm text-gray-600 font-body">
                  <li className="flex items-start">
                    <span className="text-sapphire-deep mr-2">✓</span>
                    Redakcja stylistyczna
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapphire-deep mr-2">✓</span>
                    Korekta
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapphire-deep mr-2">✓</span>
                    Konsultacje autorskie
                  </li>
                </ul>
                <Link
                  href="/kontakt"
                  className="block text-center px-6 py-3 border-2 border-sapphire-deep text-sapphire-deep font-body tracking-wide rounded-sm hover:bg-sapphire-deep hover:text-white transition-all duration-300"
                >
                  Zapytaj o cenę
                </Link>
              </div>

              {/* Pakiet Premium */}
              <div className="border-2 border-sapphire-deep rounded-lg p-8 bg-gradient-to-br from-sapphire-deep/5 to-transparent relative hover:shadow-2xl transition-all duration-300 scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gold-accent text-white px-4 py-1 rounded-full text-sm font-body">
                  Najpopularniejszy
                </div>
                <h3 className="text-2xl mb-4 text-sapphire-deep font-heading">
                  Premium
                </h3>
                <p className="text-gray-600 font-body mb-6">
                  Kompleksowa obsługa wydawnicza
                </p>
                <ul className="space-y-3 mb-8 text-sm text-gray-600 font-body">
                  <li className="flex items-start">
                    <span className="text-sapphire-deep mr-2">✓</span>
                    Wszystko z pakietu Basic
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapphire-deep mr-2">✓</span>
                    Projekt okładki
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapphire-deep mr-2">✓</span>
                    Skład typograficzny
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapphire-deep mr-2">✓</span>
                    Druk (nakład 500 egz.)
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapphire-deep mr-2">✓</span>
                    ISBN i legalna depozycja
                  </li>
                </ul>
                <Link
                  href="/kontakt"
                  className="block text-center px-6 py-3 bg-sapphire-deep text-white font-body tracking-wide rounded-sm hover:bg-indigo-dark transition-all duration-300 hover:shadow-lg"
                >
                  Zapytaj o cenę
                </Link>
              </div>

              {/* Pakiet Full */}
              <div className="border-2 border-lavender-soft rounded-lg p-8 hover:border-sapphire-deep transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl mb-4 text-sapphire-deep font-heading">
                  Full Service
                </h3>
                <p className="text-gray-600 font-body mb-6">
                  Pełna obsługa + marketing i dystrybucja
                </p>
                <ul className="space-y-3 mb-8 text-sm text-gray-600 font-body">
                  <li className="flex items-start">
                    <span className="text-sapphire-deep mr-2">✓</span>
                    Wszystko z pakietu Premium
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapphire-deep mr-2">✓</span>
                    Dystrybucja do księgarń
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapphire-deep mr-2">✓</span>
                    Kampania promocyjna
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapphire-deep mr-2">✓</span>
                    Marketing w social media
                  </li>
                  <li className="flex items-start">
                    <span className="text-sapphire-deep mr-2">✓</span>
                    Materiały promocyjne
                  </li>
                </ul>
                <Link
                  href="/kontakt"
                  className="block text-center px-6 py-3 border-2 border-sapphire-deep text-sapphire-deep font-body tracking-wide rounded-sm hover:bg-sapphire-deep hover:text-white transition-all duration-300"
                >
                  Zapytaj o cenę
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-sapphire-deep to-violet-accent text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-white">Potrzebujesz indywidualnej oferty?</h2>
            <p className="text-xl mb-10 leading-relaxed font-body text-white/90">
              Skontaktuj się z nami, aby omówić szczegóły Twojego projektu
              i otrzymać spersonalizowaną wycenę.
            </p>
            <Link
              href="/kontakt"
              className="inline-block px-10 py-4 bg-white text-sapphire-deep font-body text-lg tracking-wide rounded-sm hover:bg-cream transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              Skontaktuj się z nami
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
