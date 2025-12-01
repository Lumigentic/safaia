'use client';

import Link from 'next/link';

export default function HomePage() {

  const featuredBooks = [
    {
      id: 1,
      title: 'Japońska sztuka ikebany',
      author: 'Anna Kowalska',
      category: 'Sztuka',
      excerpt: 'Odkryj filozofię i techniki tradycyjnego japońskiego aranżowania kwiatów. Podróż przez historię ikebany, od jej początków w świątyniach zen po współczesne interpretacje. Bogato ilustrowana galeria najpiękniejszych kompozycji mistrzów.',
      coverGradient: 'from-emerald-400 to-teal-600',
    },
    {
      id: 2,
      title: 'Historia polskiego haftu',
      author: 'Maria Nowak',
      category: 'Sztuka ludowa',
      excerpt: 'Fascynująca podróż przez wieki tradycji hafciarskiej w Polsce. Od średniowiecznych paramentów liturgicznych po współczesne interpretacje ludowych wzorów. Poznaj techniki, motywy i znaczenia ukryte w każdym ściegu.',
      coverGradient: 'from-rose-400 to-pink-600',
    },
    {
      id: 3,
      title: 'Fotografie zapomnianych miejsc',
      author: 'Piotr Wiśniewski',
      category: 'Fotografia',
      excerpt: 'Album fotograficzny przedstawiający opuszczone budynki i zapomniane zakątki Europy. Stare fabryki, pałace, kina i szpitale - każde z nich kryje historię ludzi, którzy tam żyli. Poruszająca dokumentacja przemijania.',
      coverGradient: 'from-slate-400 to-gray-700',
    },
    {
      id: 4,
      title: 'Moda lat 20. XX wieku',
      author: 'Ewa Zielińska',
      category: 'Moda',
      excerpt: 'Lata dwudzieste zmieniły świat mody na zawsze. Kobiety skróciły włosy i suknie, zaczęły nosić spodnie i prowadzić samochody. Historia modowej rewolucji opowiedziana przez pryzmat projektantów, ikon stylu i zmian społecznych.',
      coverGradient: 'from-amber-400 to-orange-600',
    },
    {
      id: 5,
      title: 'Bauhaus: Forma i funkcja',
      author: 'Katarzyna Majewska',
      category: 'Sztuka',
      excerpt: 'Rewolucja w myśleniu o designie. Historia niemieckiej szkoły sztuki, jej najważniejszych przedstawicieli oraz wpływ, jaki wywiera na współczesny świat. Od architektury po meble, grafiki po ceramikę - wszędzie widać ślady Bauhausu.',
      coverGradient: 'from-blue-400 to-indigo-600',
    },
    {
      id: 6,
      title: 'Kulinarna historia Polski',
      author: 'Tomasz Lewandowski',
      category: 'Historia kulinariów',
      excerpt: 'Od średniowiecznych uczt po współczesną kuchnię molekularną. Jak jadano na dworach królewskich? Skąd wzięły się nasze tradycyjne potrawy? Fascynująca podróż przez historię polskich smaków, przeplatana autentycznymi przepisami.',
      coverGradient: 'from-lime-400 to-green-600',
    },
  ];

  const values = [
    {
      title: 'Otwartość na nowe',
      description: 'Nie boimy się niesztampowych tematów i świeżych perspektyw. Poszukujemy głosów, które wnoszą coś wartościowego do dyskusji kulturowej i poszerzają horyzonty czytelników.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      title: 'Wiedza jako źródło radości',
      description: 'Wierzymy, że poznawanie świata i poszerzanie horyzontów jest jednym z największych źródeł radości w życiu. Książki to okna na fascynujące historie i nowe sposoby myślenia.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'Ciekawość świata',
      description: 'Świat jest pełen fascynujących historii czekających na odkrycie. Nasza rola to znajdowanie ich i dzielenie się nimi z czytelnikami, którzy pragną poznawać i rozumieć.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Piękno w prostocie',
      description: 'Elegancja nie wymaga nadmiaru. Stawiamy na klarowność, harmonię i wyważone proporcje - zarówno w treści, jak i w formie naszych publikacji.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Hero Section - Faber/Taschen Minimal Style */}
      <section className="relative bg-white pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto">
            {/* Minimal tagline */}
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 font-medium">
                Niezależne Wydawnictwo
              </p>
              <h1 className="text-5xl md:text-7xl font-display font-light text-charcoal mb-8 tracking-tight leading-[1.1]">
                Odkrywamy klejnoty<br />literatury faktu
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                Specjalizujemy się w publikacjach o sztuce, modzie, fotografii i kulturze ludowej.
              </p>
            </div>

            {/* Minimal CTA */}
            <div className="flex justify-center gap-6 mt-12">
              <Link
                href="/katalog"
                className="px-8 py-3 bg-charcoal text-white text-sm uppercase tracking-wider font-medium hover:bg-sapphire-700 transition-all duration-300"
              >
                Zobacz katalog
              </Link>
              <Link
                href="/dla-autorow"
                className="px-8 py-3 border border-charcoal text-charcoal text-sm uppercase tracking-wider font-medium hover:bg-charcoal hover:text-white transition-all duration-300"
              >
                Dla autorów
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* O nas Section - Refined with Editorial Style */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="mb-6">Kim jesteśmy</h2>
              <div className="divider-elegant max-w-xs mx-auto"></div>
            </div>

            <div className="space-y-8 text-editorial text-gray-800">
              <p className="first-letter:text-7xl first-letter:font-display first-letter:text-sapphire-700 first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1">
                Safaia to niezależne wydawnictwo założone z pasji do pięknej literatury faktu.
                Nazwa pochodzi z japońskiego słowa oznaczającego szafir — kamień szlachetny,
                który od wieków symbolizuje mądrość, prawdę i intelektualną jasność. Podobnie
                jak szafir ukryty w skale wymaga oszlifowania, aby ujawnić swój blask, tak
                teksty i historie, które publikujemy, zasługują na staranne opracowanie i prezentację.
              </p>
              <p className="text-luxury">
                Każda książka w naszym katalogu to klejnot — unikalny, wartościowy i starannie
                dopracowany. Nie goniliśmy za ilością. Publikujemy tylko to, w co naprawdę wierzymy,
                tematy, które nas fascynują i autorów, którzy mają coś istotnego do powiedzenia.
                Od pierwszej rozmowy przez redakcję po ostateczny projekt okładki — dbamy o każdy
                szczegół, by efekt końcowy był spójny i piękny.
              </p>
              <p className="text-luxury">
                Naszym czytelnikom oferujemy nie tylko wiedzę, ale i estetyczne przeżycie. Wierzymy,
                że forma książki ma znaczenie — że wybór papieru, typografia, układ stron i okładka
                współtworzą doświadczenie lektury. Dlatego współpracujemy z najlepszymi grafikami
                i drukarniami, by nasze publikacje były przyjemnością zarówno dla umysłu, jak i dla
                zmysłów.
              </p>
            </div>

            {/* Stats Section - Inspired by Luxury Publishers */}
            <div className="mt-20 grid grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="text-4xl md:text-5xl font-display text-sapphire-700 mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">Publikacji</div>
              </div>
              <div className="group">
                <div className="text-4xl md:text-5xl font-display text-sapphire-700 mb-2 group-hover:scale-110 transition-transform duration-300">15</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">Lat doświadczenia</div>
              </div>
              <div className="group">
                <div className="text-4xl md:text-5xl font-display text-sapphire-700 mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">Zadowolonych czytelników</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books - Taschen Gallery Style */}
      <section className="py-20 md:py-32 bg-cream-50">
        <div className="container-wide">
          {/* Minimal section header */}
          <div className="mb-16">
            <div className="flex justify-between items-baseline">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 font-medium">Najnowsze</p>
                <h2 className="text-4xl md:text-5xl font-display font-light text-charcoal">Wyróżnione tytuły</h2>
              </div>
              <Link
                href="/katalog"
                className="hidden md:inline-block text-sm text-charcoal hover:text-sapphire-700 transition-colors uppercase tracking-wider font-medium"
              >
                Zobacz wszystkie →
              </Link>
            </div>
          </div>

          {/* Gallery grid - Taschen inspired */}
          <div className="gallery-grid">
            {featuredBooks.map((book) => (
              <Link
                key={book.id}
                href={`/katalog/${book.id}`}
                className="group block"
              >
                {/* Book cover */}
                <div className="mb-6 overflow-hidden bg-gray-100">
                  <div className={`aspect-[3/4] bg-gradient-to-br ${book.coverGradient} flex items-center justify-center book-cover`}>
                    <span className="text-white/30 text-6xl">📖</span>
                  </div>
                </div>

                {/* Book info - minimal style */}
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium">
                    {book.category}
                  </p>
                  <h3 className="text-lg font-display text-charcoal group-hover:text-sapphire-700 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-light">
                    {book.author}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* View all link for mobile */}
          <div className="mt-12 text-center md:hidden">
            <Link
              href="/katalog"
              className="inline-block text-sm text-charcoal hover:text-sapphire-700 transition-colors uppercase tracking-wider font-medium"
            >
              Zobacz wszystkie →
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section - Minimal Faber Style */}
      <section className="py-20 md:py-32 bg-cream-50">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-20">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 font-medium">Filozofia</p>
              <h2 className="text-4xl md:text-5xl font-display font-light text-charcoal">Nasze wartości</h2>
            </div>

            {/* Values grid - clean and spacious */}
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
              {values.map((value, index) => (
                <div key={index} className="group">
                  <div className="w-12 h-12 flex items-center justify-center mb-6 text-charcoal">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-display font-light text-charcoal mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA for Authors - Minimal Style */}
      <section className="py-24 md:py-40 bg-charcoal text-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6 font-medium">
              Dla autorów
            </p>

            <h2 className="text-4xl md:text-6xl font-display font-light mb-8">
              Jesteś autorem?
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
              Szukamy unikalnych głosów i fascynujących historii. Jeśli masz pomysł na książkę
              o sztuce, modzie, fotografii lub kulturze ludowej — chcemy Cię poznać.
            </p>

            <Link
              href="/dla-autorow"
              className="inline-block px-10 py-4 bg-white text-charcoal text-sm uppercase tracking-wider font-medium hover:bg-gray-100 transition-colors"
            >
              Wyślij propozycję
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Minimal */}
      <section className="py-20 md:py-32 bg-white border-t border-gray-200">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 font-medium">
              Newsletter
            </p>

            <h2 className="text-3xl md:text-4xl font-display font-light text-charcoal mb-6">
              Bądź na bieżąco
            </h2>

            <p className="text-gray-600 mb-10 leading-relaxed font-light">
              Zapisz się do newslettera i otrzymuj informacje o nowościach i premierach.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Adres email"
                className="flex-1 px-6 py-3 border border-gray-300 focus:border-charcoal focus:outline-none transition-colors text-base"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-charcoal text-white text-sm uppercase tracking-wider font-medium hover:bg-sapphire-700 transition-colors whitespace-nowrap"
              >
                Zapisz się
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-6">
              Bez spamu. Możesz wypisać się w dowolnym momencie.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
