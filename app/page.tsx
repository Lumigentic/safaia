import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex items-center justify-center relative overflow-hidden sapphire-glow pt-24 pb-16">
        {/* Dekoracyjny gradient tło */}
        <div className="absolute inset-0 bg-gradient-to-br from-lavender-soft/10 via-transparent to-sapphire-deep/5" />

        {/* Geometryczne kształty w tle */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-violet-accent/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-tl from-sapphire-deep/8 to-transparent rounded-full blur-3xl" />

        <div className="container relative z-10 py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo animacja */}
            <div className="flex justify-center mb-6 fade-in-up">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-sapphire-deep to-violet-accent rounded-full opacity-90" />
                <div className="absolute inset-0 w-14 h-14 bg-gradient-to-br from-lavender-soft to-transparent rounded-full opacity-40 blur-lg animate-pulse" />
              </div>
            </div>

            {/* Główny nagłówek */}
            <h1 className="mb-5 stagger-item" style={{ animationDelay: '0.2s' }}>
              Odkrywamy intelektualne klejnoty
            </h1>

            {/* Podtytuł */}
            <p className="text-lg md:text-xl text-gray-600 font-body mb-8 max-w-2xl mx-auto leading-relaxed stagger-item" style={{ animationDelay: '0.3s' }}>
              Niezależne polskie wydawnictwo specjalizujące się w literaturze faktu.
              <span className="block mt-2 text-sapphire-deep font-semibold">
                Wiedza jako źródło szczęścia.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 stagger-item" style={{ animationDelay: '0.4s' }}>
              <Link
                href="/katalog"
                className="px-6 py-3 bg-sapphire-deep text-white font-body text-base tracking-wide rounded-sm hover:bg-indigo-dark transition-all duration-300 hover:shadow-lg"
              >
                Poznaj nasze książki
              </Link>
              <Link
                href="/dla-autorow"
                className="px-6 py-3 border-2 border-sapphire-deep text-sapphire-deep font-body text-base tracking-wide rounded-sm hover:bg-sapphire-deep hover:text-white transition-all duration-300 hover:shadow-lg"
              >
                Wyślij manuskrypt
              </Link>
            </div>

            {/* Wartości */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto stagger-item" style={{ animationDelay: '0.5s' }}>
              {[
                'Otwartość na nowe i nieznane',
                'Wiedza jako źródło szczęścia',
                'Ciekawość świata',
                'Piękno w prostocie',
              ].map((value, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-lavender-soft/30 hover:border-sapphire-deep/50 transition-all duration-300"
                >
                  <p className="text-xs font-body text-charcoal text-center leading-snug">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* O Safaia Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Lewa strona - tekst */}
              <div>
                <h2 className="mb-4">Czym jest Safaia?</h2>
                <div className="space-y-3 text-gray-600 font-body text-sm leading-relaxed">
                  <p>
                    Nazwa <strong className="text-sapphire-deep">„Safaia"</strong> pochodzi
                    z japońskiego słowa oznaczającego szafir — symbol mądrości, intelektualnej jasności
                    i odkrywania ukrytych klejnotów, które wymagają oszlifowania, aby pokazać swój blask.
                  </p>
                  <p>
                    Jesteśmy niezależnym wydawnictwem, które specjalizuje się w literaturze faktu
                    dotyczącej sztuki, mody, fotografii, sztuki ludowej i historii kulinariów.
                  </p>
                  <p>
                    Naszą misją jest przybliżanie szerszej publiczności interesujących fenomenów,
                    trendów i zapomnianych tematów — w tym wznowienia starych wydań, które zasługują
                    na nowe życie.
                  </p>
                </div>
                <Link
                  href="/o-nas"
                  className="inline-block mt-6 text-sm text-sapphire-deep font-body font-semibold hover:text-violet-accent transition-colors group"
                >
                  Więcej o nas
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              {/* Prawa strona - wizualne */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-sapphire-deep to-violet-accent rounded-lg opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-sapphire-deep to-violet-accent rounded-full opacity-80" />
                    <p className="text-3xl font-display text-sapphire-deep mb-1">サファイア</p>
                    <p className="text-base font-body text-gray-600">Safaia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kategorie Section */}
      <section className="section-padding bg-cream relative">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Nasze kategorie</h2>
            <p className="text-base text-gray-600 font-body max-w-2xl mx-auto">
              Specjalizujemy się w pięciu głównych obszarach tematycznych
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Sztuka',
                description: 'Odkrywamy historie wielkich artystów i ruchów artystycznych',
                icon: '🎨',
              },
              {
                title: 'Moda',
                description: 'Od historii kroju po współczesne trendy i projektantów',
                icon: '👗',
              },
              {
                title: 'Fotografia',
                description: 'Albumy i opowieści o mistrzach obiektywu',
                icon: '📷',
              },
              {
                title: 'Sztuka ludowa',
                description: 'Tradycje, rzemiosło i kultura popularna',
                icon: '🎭',
              },
              {
                title: 'Historia kulinariów',
                description: 'Kultura jedzenia, przepisy i historie smaków',
                icon: '🍽️',
              },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-sapphire-deep/20 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-lg mb-2 text-sapphire-deep font-heading">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600 font-body leading-relaxed">
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/katalog"
              className="inline-block px-6 py-2.5 bg-sapphire-deep text-white font-body text-sm tracking-wide rounded-sm hover:bg-indigo-dark transition-all duration-300 hover:shadow-lg"
            >
              Zobacz katalog książek
            </Link>
          </div>
        </div>
      </section>

      {/* CTA dla autorów */}
      <section className="section-padding bg-gradient-to-br from-sapphire-deep to-violet-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4 text-white">Jesteś autorem?</h2>
            <p className="text-base md:text-lg mb-8 leading-relaxed font-body text-white/90">
              Szukamy unikalnych głosów i fascynujących historii. Jeśli masz pomysł na książkę,
              która pasuje do naszego profilu — chcemy Cię poznać.
            </p>
            <Link
              href="/dla-autorow"
              className="inline-block px-6 py-3 bg-white text-sapphire-deep font-body text-sm tracking-wide rounded-sm hover:bg-cream transition-all duration-300 hover:shadow-lg"
            >
              Wyślij swój manuskrypt
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
