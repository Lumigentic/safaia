import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O nas',
  description: 'Historia Wydawnictwa Safaia, nasza misja i wartości.',
};

export default function AboutPage() {
  return (
    <>
      <section className="section-padding bg-gradient-to-br from-cream to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-8 text-center">O Wydawnictwie Safaia</h1>
            <div className="editorial-content">
              <p className="text-xl text-gray mb-8 text-center">
                Safaia to niezależne wydawnictwo założone z pasji do pięknej literatury faktu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-12">Dlaczego Safaia?</h2>
            <div className="space-y-6 text-gray leading-relaxed">
              <p>
                Nazwa „Safaia" pochodzi z japońskiego słowa oznaczającego szafir (サファイア) — kamień szlachetny,
                który od wieków symbolizuje mądrość, prawdę i intelektualną jasność.
              </p>
              <p>
                Podobnie jak szafir ukryty w skale wymaga oszlifowania, aby ujawnić swój blask,
                tak teksty i historie, które publikujemy, zasługują na staranne opracowanie i prezentację.
              </p>
              <p>
                Każda książka w naszym katalogu to klejnot — unikalny, wartościowy i starannie dopracowany,
                gotowy by zachwycać czytelników.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-12 text-center">Nasze wartości</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Otwartość na nowe',
                  description: 'Nie boimy się niesztampowych tematów i świeżych perspektyw. Poszukujemy głosów, które wnoszą coś wartościowego do dyskusji kulturowej.',
                },
                {
                  title: 'Wiedza jako źródło radości',
                  description: 'Wierzymy, że poznawanie świata i poszerzanie horyzontów jest jednym z największych źródeł radości w życiu.',
                },
                {
                  title: 'Piękno w prostocie',
                  description: 'Elegancja nie wymaga nadmiaru. Stawiamy na klarowność, harmonię i wyważone proporcje — w treści i formie.',
                },
                {
                  title: 'Ciekawość świata',
                  description: 'Świat jest pełen fascynujących historii czekających na odkrycie. Nasza rola to znajdowanie ich i dzielenie się nimi.',
                },
              ].map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-sm">
                  <h3 className="text-2xl mb-4">{value.title}</h3>
                  <p className="text-gray leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-sapphire text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-white mb-6">Rita Krawczyk</h2>
            <p className="text-xl text-white/90 mb-4">
              Założycielka i redaktorka naczelna
            </p>
            <p className="text-white/80 leading-relaxed">
              Pasjonatka literatury faktu, sztuki i dobrze opowiedzianej historii.
              Safaia to jej marzenie o wydawnictwie, które łączy rzetelną wiedzę z piękną formą.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
