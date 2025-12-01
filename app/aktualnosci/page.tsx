import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aktualności',
  description: 'Najnowsze wiadomości, wydarzenia i inspiracje z Wydawnictwa Safaia.',
};

// Sample news data
const newsArticles = [
  {
    id: 1,
    title: 'Premiera: Japońska sztuka ikebany',
    date: '2024-01-15',
    category: 'Nowości',
    excerpt: 'Z radością ogłaszamy premierę naszej pierwszej publikacji poświęconej tradycyjnej japońskiej sztuce aranżowania kwiatów.',
    readTime: '3 min',
  },
  {
    id: 2,
    title: 'Wywiad z Marią Nowak o tradycjach hafciarskich',
    date: '2024-01-08',
    category: 'Wywiady',
    excerpt: 'Rozmawiamy z autorką książki "Historia polskiego haftu" o fascynującym świecie wzorów ludowych i ich współczesnych interpretacjach.',
    readTime: '8 min',
  },
  {
    id: 3,
    title: 'Wystawa: Zapomniane miejsca w obiektywie',
    date: '2024-01-03',
    category: 'Wydarzenia',
    excerpt: 'Piotr Wiśniewski prezentuje wybrane fotografie z albumu "Fotografie zapomnianych miejsc" na wystawie w Galerii Sztuki Współczesnej.',
    readTime: '2 min',
  },
  {
    id: 4,
    title: 'O pięknie prostoty w designie książek',
    date: '2023-12-20',
    category: 'Inspiracje',
    excerpt: 'Dlaczego wierzymy, że forma książki jest równie ważna jak jej treść? Opowiadamy o naszym podejściu do projektowania publikacji.',
    readTime: '5 min',
  },
  {
    id: 5,
    title: 'Targi książki 2023 - relacja',
    date: '2023-12-15',
    category: 'Wydarzenia',
    excerpt: 'Podsumowujemy naszą obecność na Międzynarodowych Targach Książki w Krakowie. Dziękujemy za wspaniałe spotkania!',
    readTime: '4 min',
  },
  {
    id: 6,
    title: 'Czego szukamy u autorów?',
    date: '2023-12-10',
    category: 'Dla autorów',
    excerpt: 'Otwieramy się na współpracę z nowymi autorami. Przeczytaj, jakie projekty nas interesują i jak możesz się z nami skontaktować.',
    readTime: '6 min',
  },
];

export default function AktualnosciPage() {
  const featuredArticle = newsArticles[0];
  const otherArticles = newsArticles.slice(1);

  return (
    <>
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-cream to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Aktualności</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Najnowsze wiadomości, premiery, wywiady i inspiracje z naszego wydawnictwa.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto mb-16">
            <Link
              href={`/aktualnosci/${featuredArticle.id}`}
              className="group block bg-cream hover:shadow-xl transition-all duration-300"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-sapphire to-violet flex items-center justify-center">
                  <span className="text-white/20 text-9xl">📰</span>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
                    <span className="px-3 py-1 bg-sapphire text-white font-medium uppercase tracking-wide">
                      {featuredArticle.category}
                    </span>
                    <time dateTime={featuredArticle.date}>
                      {new Date(featuredArticle.date).toLocaleDateString('pl-PL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span>•</span>
                    <span>{featuredArticle.readTime} czytania</span>
                  </div>
                  <h2 className="text-3xl font-display mb-4 text-sapphire-dark group-hover:text-sapphire transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <span className="text-sapphire font-medium group-hover:text-sapphire-dark">
                    Czytaj dalej →
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherArticles.map((article) => (
              <Link
                key={article.id}
                href={`/aktualnosci/${article.id}`}
                className="group bg-white hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-sapphire to-violet overflow-hidden flex items-center justify-center">
                  <span className="text-white/20 text-6xl">📰</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('pl-PL', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <span className="inline-block px-2 py-1 bg-cream text-sapphire text-xs font-medium uppercase tracking-wide mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-display mb-3 text-sapphire-dark group-hover:text-sapphire transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <span className="text-sm text-sapphire hover:text-sapphire-dark font-medium">
                    Czytaj dalej →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-sapphire text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-white mb-6">Bądź na bieżąco</h2>
            <p className="text-xl text-white/90 mb-8">
              Zapisz się do naszego newslettera i otrzymuj informacje o nowościach,
              wydarzeniach i ekskluzywnych promocjach.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Twój adres email"
                className="flex-1 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-sapphire font-medium hover:bg-cream transition-colors whitespace-nowrap"
              >
                Zapisz się
              </button>
            </form>
            <p className="text-xs text-white/70 mt-4">
              Możesz się wypisać w dowolnym momencie. Szanujemy Twoją prywatność.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="section-padding bg-cream">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-8 text-center">Przeglądaj według kategorii</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Nowości', count: 8, icon: '✨' },
                { name: 'Wywiady', count: 12, icon: '💬' },
                { name: 'Wydarzenia', count: 15, icon: '📅' },
                { name: 'Inspiracje', count: 10, icon: '💡' },
                { name: 'Dla autorów', count: 5, icon: '✍️' },
                { name: 'Za kulisami', count: 7, icon: '🎬' },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={`/aktualnosci?kategoria=${category.name.toLowerCase()}`}
                  className="bg-white p-6 text-center hover:shadow-md transition-shadow group"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-display text-lg mb-1 text-sapphire-dark group-hover:text-sapphire transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">{category.count} artykułów</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
