import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O nas | Safaia - Wydawnictwo',
  description: 'Poznaj historię Wydawnictwa Safaia, naszą misję i wartości. Odkrywamy intelektualne klejnoty i dzielimy się nimi ze światem.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-lavender-soft/20 to-transparent">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 fade-in-up">O nas</h1>
            <p className="text-2xl text-gray-600 font-body leading-relaxed fade-in-up" style={{ animationDelay: '0.2s' }}>
              Jesteśmy niezależnym wydawnictwem, które wierzy w moc wiedzy
              i piękno dobrze opowiedzianej historii.
            </p>
          </div>
        </div>
      </section>

      {/* Historia nazwy */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="mb-6">Dlaczego Safaia?</h2>
                <div className="space-y-4 text-gray-600 font-body leading-relaxed">
                  <p>
                    Nazwa <strong className="text-sapphire-deep">„Safaia"</strong> (サファイア)
                    pochodzi z japońskiego słowa oznaczającego szafir — kamień szlachetny,
                    który od wieków symbolizuje mądrość, prawdę i intelektualną jasność.
                  </p>
                  <p>
                    Podobnie jak szafir ukryty w skale wymaga oszlifowania, aby ujawnić
                    swój blask, tak teksty i historie, które publikujemy, zasługują na
                    staranne opracowanie i prezentację.
                  </p>
                  <p>
                    Każda książka, którą wydajemy, to klejnot — unikalny, wartościowy
                    i starannie dopracowany, gotowy by zachwycać czytelników.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-sapphire-deep to-violet-accent flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <div className="text-8xl mb-4">💎</div>
                      <p className="text-3xl font-display mb-2">サファイア</p>
                      <p className="text-xl font-body opacity-90">Safaia - Szafir</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misja */}
      <section className="section-padding bg-cream">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="mb-6">Nasza misja</h2>
            <p className="text-xl text-gray-600 font-body leading-relaxed">
              Przybliżanie szerszej publiczności interesujących fenomenów, trendów
              i zapomnianych tematów — łącznie ze wznowieniami starych wydań,
              które zasługują na nowe życie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl mb-4 text-sapphire-deep font-heading">
                Literatura faktu
              </h3>
              <p className="text-gray-600 font-body leading-relaxed">
                Specjalizujemy się w reportażach, albumach ilustrowanych i popularnonaukowych
                publikacjach, które łączą rzetelną wiedzę z piękną formą.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-2xl mb-4 text-sapphire-deep font-heading">
                Odkrywanie nieznanych
              </h3>
              <p className="text-gray-600 font-body leading-relaxed">
                Poszukujemy tematów, które fascynują, inspirują i poszerzają horyzonty —
                od zapomnianych artystów po nieznane historie kulinariów.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-2xl mb-4 text-sapphire-deep font-heading">
                Piękno w prostocie
              </h3>
              <p className="text-gray-600 font-body leading-relaxed">
                Wierzymy, że forma ma znaczenie. Nasze książki są starannie zaprojektowane,
                z dbałością o każdy detal — od typografii po jakość papieru.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-2xl mb-4 text-sapphire-deep font-heading">
                Ciekawość świata
              </h3>
              <p className="text-gray-600 font-body leading-relaxed">
                Inspirujemy do odkrywania i poznawania. Każda nasza książka to zaproszenie
                do podróży — intelektualnej, kulturowej lub historycznej.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wartości */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-12 text-center">Nasze wartości</h2>

            <div className="space-y-12">
              <div className="border-l-4 border-sapphire-deep pl-8">
                <h3 className="text-2xl mb-3 text-sapphire-deep font-heading">
                  Otwartość na nowe i nieznane
                </h3>
                <p className="text-gray-600 font-body leading-relaxed">
                  Nie boimy się niesztampowych tematów i świeżych perspektyw. Szukamy głosów,
                  które wnoszą coś nowego do dyskusji kulturowej.
                </p>
              </div>

              <div className="border-l-4 border-violet-accent pl-8">
                <h3 className="text-2xl mb-3 text-sapphire-deep font-heading">
                  Wiedza jako źródło szczęścia
                </h3>
                <p className="text-gray-600 font-body leading-relaxed">
                  Wierzymy, że poznawanie świata i poszerzanie horyzontów jest jednym z największych
                  źródeł radości w życiu. Każda nasza książka ma inspirować i ubogacać.
                </p>
              </div>

              <div className="border-l-4 border-gold-accent pl-8">
                <h3 className="text-2xl mb-3 text-sapphire-deep font-heading">
                  Ciekawość świata
                </h3>
                <p className="text-gray-600 font-body leading-relaxed">
                  Świat jest pełen fascynujących historii czekających na odkrycie. Nasza rola to
                  znajdowanie tych opowieści i dzielenie się nimi z czytelnikami.
                </p>
              </div>

              <div className="border-l-4 border-lavender-soft pl-8">
                <h3 className="text-2xl mb-3 text-sapphire-deep font-heading">
                  Piękno w prostocie
                </h3>
                <p className="text-gray-600 font-body leading-relaxed">
                  Elegancja nie wymaga nadmiaru. W naszych publikacjach stawiamy na klarowność,
                  harmonię i wyważone proporcje — zarówno w treści, jak i formie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kim jesteśmy */}
      <section className="section-padding bg-gradient-to-br from-sapphire-deep to-violet-accent text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-8 text-white">Kim jesteśmy</h2>
            <p className="text-xl font-body leading-relaxed text-white/90 mb-12">
              Safaia to młode, niezależne wydawnictwo założone przez{' '}
              <strong className="text-white">Ritę Krawczyk</strong> — pasjonatkę literatury faktu,
              sztuki i dobrze opowiedzianej historii.
            </p>
            <p className="text-lg font-body leading-relaxed text-white/80">
              Nasze wydawnictwo to miejsce, gdzie spotykają się autorzy z unikalnymi
              perspektywami i czytelnicy spragnieni odkrywania nowych horyzontów.
              Każda książka jest dla nas osobistym projektem — starannie wyselekcjonowanym,
              dopracowanym i wydanym z pasją.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
