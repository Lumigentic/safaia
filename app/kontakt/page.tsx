'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tu można dodać obsługę wysyłania formularza (np. do API)
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[var(--lavender-soft)]/20 to-transparent">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 fade-in-up">Kontakt</h1>
            <p className="text-2xl text-[var(--color-text-muted)] font-body leading-relaxed fade-in-up" style={{ animationDelay: '0.2s' }}>
              Masz pytania? Chcesz z nami współpracować?
              <span className="block mt-2 text-[var(--sapphire-deep)] font-semibold">
                Skontaktuj się z nami — odpowiadamy na każdą wiadomość.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Informacje kontaktowe + formularz */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            {/* Lewa strona - informacje */}
            <div>
              <h2 className="mb-8">Skontaktuj się z nami</h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--sapphire-deep)] to-[var(--violet-accent)] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading text-[var(--sapphire-deep)] mb-2">
                      Email
                    </h3>
                    <p className="text-[var(--color-text-muted)] font-body mb-1">
                      Ogólne pytania:{' '}
                      <a
                        href="mailto:kontakt@safaia.pl"
                        className="text-[var(--sapphire-deep)] hover:underline"
                      >
                        kontakt@safaia.pl
                      </a>
                    </p>
                    <p className="text-[var(--color-text-muted)] font-body">
                      Dla autorów:{' '}
                      <a
                        href="mailto:manuskrypty@safaia.pl"
                        className="text-[var(--sapphire-deep)] hover:underline"
                      >
                        manuskrypty@safaia.pl
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--sapphire-deep)] to-[var(--violet-accent)] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading text-[var(--sapphire-deep)] mb-2">
                      Social Media
                    </h3>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="text-[var(--color-text-muted)] hover:text-[var(--sapphire-deep)] transition-colors"
                      >
                        Instagram
                      </a>
                      <a
                        href="#"
                        className="text-[var(--color-text-muted)] hover:text-[var(--sapphire-deep)] transition-colors"
                      >
                        Facebook
                      </a>
                      <a
                        href="#"
                        className="text-[var(--color-text-muted)] hover:text-[var(--sapphire-deep)] transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--sapphire-deep)] to-[var(--violet-accent)] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading text-[var(--sapphire-deep)] mb-2">
                      Założycielka
                    </h3>
                    <p className="text-[var(--color-text-muted)] font-body">
                      <strong>Rita Krawczyk</strong>
                      <br />
                      Redaktor naczelna i wydawca
                    </p>
                  </div>
                </div>
              </div>

              {/* Dodatkowe info */}
              <div className="mt-12 p-6 bg-[var(--cream)] rounded-lg">
                <h4 className="text-lg font-heading text-[var(--sapphire-deep)] mb-3">
                  Czas odpowiedzi
                </h4>
                <p className="text-sm text-[var(--color-text-muted)] font-body leading-relaxed">
                  Staramy się odpowiadać na wszystkie wiadomości w ciągu 2-3 dni roboczych.
                  W przypadku zgłoszeń manuskryptów czas odpowiedzi może wynosić do 3 tygodni.
                </p>
              </div>
            </div>

            {/* Prawa strona - formularz */}
            <div className="bg-[var(--cream)] p-8 rounded-lg">
              <h3 className="text-2xl font-heading text-[var(--sapphire-deep)] mb-6">
                Wyślij wiadomość
              </h3>

              {submitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800 font-body text-sm">
                  Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-body text-[var(--color-text)] mb-2"
                  >
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:border-[var(--sapphire-deep)] focus:outline-none font-body bg-white"
                    placeholder="Jan Kowalski"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-body text-[var(--color-text)] mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:border-[var(--sapphire-deep)] focus:outline-none font-body bg-white"
                    placeholder="jan@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-body text-[var(--color-text)] mb-2"
                  >
                    Temat *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:border-[var(--sapphire-deep)] focus:outline-none font-body bg-white"
                  >
                    <option value="">Wybierz temat...</option>
                    <option value="manuskrypt">Zgłoszenie manuskryptu</option>
                    <option value="uslugi">Zapytanie o usługi wydawnicze</option>
                    <option value="wspolpraca">Propozycja współpracy</option>
                    <option value="zamowienie">Zamówienie książki</option>
                    <option value="inne">Inne</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-body text-[var(--color-text)] mb-2"
                  >
                    Wiadomość *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:border-[var(--sapphire-deep)] focus:outline-none font-body resize-none bg-white"
                    placeholder="Twoja wiadomość..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-[var(--sapphire-deep)] text-white font-body text-lg tracking-wide rounded-sm hover:bg-[var(--indigo-dark)] transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Wyślij wiadomość
                </button>

                <p className="text-xs text-[var(--color-text-muted)] font-body text-center">
                  * Pola wymagane
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa lub dodatkowa sekcja */}
      <section className="section-padding bg-gradient-to-br from-[var(--sapphire-deep)] to-[var(--violet-accent)] text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-white">Współpracujmy razem</h2>
            <p className="text-xl leading-relaxed font-body text-white/90 mb-8">
              Jesteśmy otwarci na nowe pomysły, projekty i partnerstwa.
              Niezależnie od tego, czy jesteś autorem, ilustratorem, fotografem
              czy po prostu miłośnikiem dobrych książek — chętnie Cię poznamy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:kontakt@safaia.pl"
                className="px-8 py-3 bg-white text-[var(--sapphire-deep)] font-body tracking-wide rounded-sm hover:bg-[var(--cream)] transition-all duration-300 hover:shadow-lg"
              >
                kontakt@safaia.pl
              </a>
              <a
                href="mailto:manuskrypty@safaia.pl"
                className="px-8 py-3 border-2 border-white text-white font-body tracking-wide rounded-sm hover:bg-white hover:text-[var(--sapphire-deep)] transition-all duration-300"
              >
                manuskrypty@safaia.pl
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
