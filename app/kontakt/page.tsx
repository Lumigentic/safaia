'use client';

import { Metadata } from 'next';
import { useState } from 'react';

export default function KontaktPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Reset form
      (e.target as HTMLFormElement).reset();
    }, 2000);
  };

  return (
    <>
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-cream to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Kontakt</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Masz pytania? Chcesz się z nami skontaktować? Jesteśmy tu, aby pomóc.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info and Form */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-display mb-6 text-sapphire-dark">
                Wydawnictwo Safaia
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div>
                  <h3 className="text-sm font-medium text-sapphire-dark uppercase tracking-wide mb-2">
                    Adres
                  </h3>
                  <p className="text-gray-600">
                    ul. Przykładowa 123<br />
                    00-001 Warszawa<br />
                    Polska
                  </p>
                </div>

                {/* Email */}
                <div>
                  <h3 className="text-sm font-medium text-sapphire-dark uppercase tracking-wide mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:kontakt@safaia.pl"
                    className="text-sapphire hover:text-sapphire-dark transition-colors"
                  >
                    kontakt@safaia.pl
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    Dla autorów:
                    <br />
                    <a
                      href="mailto:manuskrypty@safaia.pl"
                      className="text-sapphire hover:text-sapphire-dark transition-colors"
                    >
                      manuskrypty@safaia.pl
                    </a>
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <h3 className="text-sm font-medium text-sapphire-dark uppercase tracking-wide mb-2">
                    Telefon
                  </h3>
                  <a
                    href="tel:+48123456789"
                    className="text-sapphire hover:text-sapphire-dark transition-colors"
                  >
                    +48 123 456 789
                  </a>
                  <p className="text-sm text-gray-600 mt-1">
                    Pn-Pt: 9:00 - 17:00
                  </p>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-sm font-medium text-sapphire-dark uppercase tracking-wide mb-3">
                    Social Media
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-sapphire/10 hover:bg-sapphire text-sapphire hover:text-white rounded-full flex items-center justify-center transition-colors"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-sapphire/10 hover:bg-sapphire text-sapphire hover:text-white rounded-full flex items-center justify-center transition-colors"
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-sapphire/10 hover:bg-sapphire text-sapphire hover:text-white rounded-full flex items-center justify-center transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="mt-8 p-6 bg-cream">
                <h3 className="text-sm font-medium text-sapphire-dark uppercase tracking-wide mb-3">
                  Godziny pracy
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Poniedziałek - Piątek:</dt>
                    <dd className="font-medium">9:00 - 17:00</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Sobota - Niedziela:</dt>
                    <dd className="font-medium">Zamknięte</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-display mb-6 text-sapphire-dark">
                Wyślij wiadomość
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-green-800">Wiadomość wysłana!</h3>
                      <p className="text-sm text-green-700 mt-1">
                        Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-sapphire-dark mb-2">
                      Imię i nazwisko <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:border-sapphire focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-sapphire-dark mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:border-sapphire focus:outline-none transition-colors"
                      placeholder="twoj@email.pl"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-sapphire-dark mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-sapphire focus:outline-none transition-colors"
                    placeholder="+48 123 456 789"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-sapphire-dark mb-2">
                    Temat <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-sapphire focus:outline-none transition-colors"
                  >
                    <option value="">Wybierz temat</option>
                    <option value="general">Pytanie ogólne</option>
                    <option value="order">Zamówienie</option>
                    <option value="collaboration">Współpraca</option>
                    <option value="manuscript">Manuskrypt</option>
                    <option value="press">Zapytanie prasowe</option>
                    <option value="other">Inne</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-sapphire-dark mb-2">
                    Wiadomość <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-sapphire focus:outline-none transition-colors resize-y"
                    placeholder="Jak możemy Ci pomóc?"
                  ></textarea>
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-1 w-5 h-5 text-sapphire border-2 border-gray-300 focus:ring-sapphire"
                    />
                    <span className="text-sm text-gray-600">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych w celu udzielenia odpowiedzi na zapytanie.{' '}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-sapphire text-white font-medium hover:bg-sapphire-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  * Pola wymagane
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-cream">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-12 text-center">Najczęściej zadawane pytania</h2>
            <div className="space-y-6">
              {[
                {
                  question: 'Jak mogę zamówić książkę?',
                  answer: 'Obecnie przyjmujemy zamówienia drogą mailową na adres kontakt@safaia.pl. Wkrótce uruchomimy sklep internetowy z możliwością zamówień online.',
                },
                {
                  question: 'Jaki jest czas realizacji zamówienia?',
                  answer: 'Standardowy czas realizacji to 2-3 dni robocze. Po wysłaniu paczki otrzymasz numer przesyłki do śledzenia.',
                },
                {
                  question: 'Czy mogę zwrócić książkę?',
                  answer: 'Tak, masz 14 dni na zwrot od daty otrzymania przesyłki. Książka musi być w stanie nienaruszonym.',
                },
                {
                  question: 'Czy współpracujecie z księgarniami?',
                  answer: 'Tak, chętnie nawiążemy współpracę. Napisz do nas na kontakt@safaia.pl z informacją o Twojej księgarni.',
                },
                {
                  question: 'Jak mogę zgłosić propozycję książki?',
                  answer: 'Zapraszamy na stronę "Dla autorów", gdzie znajdziesz formularz zgłoszeniowy i szczegółowe informacje o procesie.',
                },
              ].map((faq, index) => (
                <details key={index} className="bg-white p-6 group">
                  <summary className="font-display text-lg text-sapphire-dark cursor-pointer list-none flex justify-between items-center">
                    <span>{faq.question}</span>
                    <svg
                      className="w-5 h-5 text-sapphire transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Placeholder */}
      <section className="bg-gray-200">
        <div className="aspect-video md:aspect-[21/9] bg-gradient-to-br from-sapphire/20 to-violet/20 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-16 h-16 text-sapphire/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-600">
              Warszawa, ul. Przykładowa 123
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
