import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dla autorów | Safaia - Wydawnictwo',
  description: 'Masz pomysł na książkę? Dowiedz się, jak zgłosić manuskrypt do Wydawnictwa Safaia. Poszukujemy unikalnych głosów i fascynujących historii.',
};

export default function ForAuthorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[var(--lavender-soft)]/20 via-transparent to-[var(--sapphire-deep)]/10 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[var(--violet-accent)]/10 to-transparent rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 fade-in-up">Dla autorów</h1>
            <p className="text-2xl text-[var(--color-text-muted)] font-body leading-relaxed fade-in-up" style={{ animationDelay: '0.2s' }}>
              Szukamy unikalnych głosów i fascynujących historii.
              <span className="block mt-2 text-[var(--sapphire-deep)] font-semibold">
                Twoja książka może być naszym następnym klejnotem.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Czego szukamy */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="mb-12 text-center">Czego szukamy?</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-[var(--cream)] p-8 rounded-lg">
                <div className="text-4xl mb-4">✍️</div>
                <h3 className="text-2xl mb-4 text-[var(--sapphire-deep)] font-heading">
                  Tematyka
                </h3>
                <ul className="space-y-3 text-[var(--color-text-muted)] font-body">
                  <li className="flex items-start">
                    <span className="text-[var(--sapphire-deep)] mr-3">•</span>
                    <span>Sztuka - historia, biografie artystów, ruchy artystyczne</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--sapphire-deep)] mr-3">•</span>
                    <span>Moda - historia mody, projektanci, tekstylia</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--sapphire-deep)] mr-3">•</span>
                    <span>Fotografia - albumy, monografie fotografów</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--sapphire-deep)] mr-3">•</span>
                    <span>Sztuka ludowa - tradycje, rzemiosło, kultura popularna</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--sapphire-deep)] mr-3">•</span>
                    <span>Historia kulinariów - kultura jedzenia, tradycje kulinarne</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[var(--cream)] p-8 rounded-lg">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-2xl mb-4 text-[var(--sapphire-deep)] font-heading">
                  Formy
                </h3>
                <ul className="space-y-3 text-[var(--color-text-muted)] font-body">
                  <li className="flex items-start">
                    <span className="text-[var(--sapphire-deep)] mr-3">•</span>
                    <span>Reportaże i eseje</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--sapphire-deep)] mr-3">•</span>
                    <span>Albumy ilustrowane</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--sapphire-deep)] mr-3">•</span>
                    <span>Publikacje popularnonaukowe</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--sapphire-deep)] mr-3">•</span>
                    <span>Biografie i monografie</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--sapphire-deep)] mr-3">•</span>
                    <span>Literatura piękna z elementami powyższych tematów</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[var(--sapphire-deep)] to-[var(--violet-accent)] text-white p-8 rounded-lg">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-2xl mb-4 font-heading">
                Co nas wyróżnia?
              </h3>
              <p className="font-body leading-relaxed text-white/90">
                Poszukujemy tekstów, które łączą rzetelną wiedzę z piękną formą.
                Interesują nas nieznane historie, zapomniane fenomeny, świeże perspektywy
                na znane tematy. Nie boimy się niszy - wręcz przeciwnie, często to właśnie
                w niszowych tematach kryją się najciekawsze opowieści.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proces współpracy */}
      <section className="section-padding bg-[var(--cream)]">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="mb-12 text-center">Proces współpracy</h2>

            <div className="space-y-8">
              {[
                {
                  step: '01',
                  title: 'Zgłoszenie',
                  description:
                    'Wyślij nam synopsis (max 2 strony) wraz z próbką tekstu (10-20 stron). Napisz kilka zdań o sobie i dlaczego właśnie ten temat Cię fascynuje.',
                },
                {
                  step: '02',
                  title: 'Ocena wstępna',
                  description:
                    'Sprawdzamy, czy temat pasuje do naszego profilu wydawniczego. Odpowiadamy w ciągu 2-3 tygodni.',
                },
                {
                  step: '03',
                  title: 'Spotkanie',
                  description:
                    'Jeśli jesteśmy zainteresowani, umawiamy się na spotkanie (online lub stacjonarne), aby omówić szczegóły projektu.',
                },
                {
                  step: '04',
                  title: 'Umowa',
                  description:
                    'Ustalamy warunki współpracy, harmonogram i szczegóły wydawnicze. Podpisujemy umowę wydawniczą.',
                },
                {
                  step: '05',
                  title: 'Praca redakcyjna',
                  description:
                    'Wspólnie pracujemy nad tekstem - redakcja merytoryczna, stylistyczna, korekta. To proces współtwórczy.',
                },
                {
                  step: '06',
                  title: 'Projekt i publikacja',
                  description:
                    'Tworzymy projekt graficzny, łamiemy tekst, drukujemy. Ty jesteś częścią tego procesu i masz wpływ na finalny kształt książki.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 flex gap-6 group stagger-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--sapphire-deep)] to-[var(--violet-accent)] rounded-full flex items-center justify-center text-white font-display text-xl group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl mb-3 text-[var(--sapphire-deep)] font-heading group-hover:text-[var(--violet-accent)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[var(--color-text-muted)] font-body leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Co zapewniamy */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="mb-12 text-center">Co zapewniamy?</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-xl mb-3 text-[var(--sapphire-deep)] font-heading">
                  Partnerstwo
                </h3>
                <p className="text-[var(--color-text-muted)] font-body">
                  Traktujemy autorów jako partnerów. Masz wpływ na proces wydawniczy
                  i finalny kształt książki.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-xl mb-3 text-[var(--sapphire-deep)] font-heading">
                  Profesjonalizm
                </h3>
                <p className="text-[var(--color-text-muted)] font-body">
                  Zapewniamy pełną obsługę redakcyjną, korektę, projekt graficzny
                  i profesjonalny druk.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="text-5xl mb-4">📢</div>
                <h3 className="text-xl mb-3 text-[var(--sapphire-deep)] font-heading">
                  Promocja
                </h3>
                <p className="text-[var(--color-text-muted)] font-body">
                  Aktywnie promujemy nasze książki w mediach społecznościowych,
                  księgarniach i na wydarzeniach kulturalnych.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-[var(--sapphire-deep)] to-[var(--violet-accent)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-8 text-white">Gotowy, żeby wysłać swój manuskrypt?</h2>
            <p className="text-xl mb-10 leading-relaxed font-body text-white/90">
              Wyślij nam synopsis, próbkę tekstu i kilka zdań o sobie na adres:
            </p>
            <a
              href="mailto:manuskrypty@safaia.pl"
              className="inline-block px-10 py-4 bg-white text-[var(--sapphire-deep)] font-body text-lg tracking-wide rounded-sm hover:bg-[var(--cream)] transition-all duration-300 hover:shadow-2xl hover:scale-105 mb-8"
            >
              manuskrypty@safaia.pl
            </a>
            <p className="text-sm text-white/70 font-body">
              Lub skorzystaj z{' '}
              <Link href="/kontakt" className="underline hover:text-white transition-colors">
                formularza kontaktowego
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-12 text-center">Najczęściej zadawane pytania</h2>

            <div className="space-y-6">
              <details className="group bg-[var(--cream)] p-6 rounded-lg cursor-pointer">
                <summary className="font-heading text-lg text-[var(--sapphire-deep)] list-none flex items-center justify-between">
                  Czy mogę zgłosić nieukończony manuskrypt?
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[var(--color-text-muted)] font-body leading-relaxed">
                  Tak! Wystarczy synopsis i próbka tekstu (10-20 stron). Jeśli będziemy zainteresowani,
                  ustalimy harmonogram ukończenia pracy.
                </p>
              </details>

              <details className="group bg-[var(--cream)] p-6 rounded-lg cursor-pointer">
                <summary className="font-heading text-lg text-[var(--sapphire-deep)] list-none flex items-center justify-between">
                  Jak długo czeka się na odpowiedź?
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[var(--color-text-muted)] font-body leading-relaxed">
                  Staramy się odpowiadać w ciągu 2-3 tygodni. Czytamy każdy zgłoszony tekst
                  i udzielamy odpowiedzi wszystkim autorom.
                </p>
              </details>

              <details className="group bg-[var(--cream)] p-6 rounded-lg cursor-pointer">
                <summary className="font-heading text-lg text-[var(--sapphire-deep)] list-none flex items-center justify-between">
                  Czy współpracujecie tylko z doświadczonymi autorami?
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[var(--color-text-muted)] font-body leading-relaxed">
                  Nie! Liczy się dla nas przede wszystkim temat, pasja i jakość tekstu.
                  Chętnie pracujemy z debiutantami, którzy mają coś ciekawego do powiedzenia.
                </p>
              </details>

              <details className="group bg-[var(--cream)] p-6 rounded-lg cursor-pointer">
                <summary className="font-heading text-lg text-[var(--sapphire-deep)] list-none flex items-center justify-between">
                  Jakie są warunki finansowe współpracy?
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[var(--color-text-muted)] font-body leading-relaxed">
                  Szczegóły ustalamy indywidualnie z każdym autorem. Oferujemy honorarium autorskie
                  lub system tantiem. Wszystkie warunki są transparentnie określone w umowie.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
