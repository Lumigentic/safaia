'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DlaAutorowPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Formspree endpoint - REPLACE WITH YOUR FORMSPREE FORM ID
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.get('firstName')) newErrors.firstName = 'Imię jest wymagane';
    if (!formData.get('lastName')) newErrors.lastName = 'Nazwisko jest wymagane';

    const email = formData.get('email') as string;
    if (!email) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }

    const description = formData.get('description') as string;
    if (!description) {
      newErrors.description = 'Opis projektu jest wymagany';
    } else if (description.length < 100) {
      newErrors.description = 'Opis powinien mieć minimum 100 znaków';
    }

    const uniqueness = formData.get('uniqueness') as string;
    if (!uniqueness) {
      newErrors.uniqueness = 'To pole jest wymagane';
    } else if (uniqueness.length < 50) {
      newErrors.uniqueness = 'Odpowiedź powinna mieć minimum 50 znaków';
    }

    const targetAudience = formData.get('targetAudience') as string;
    if (!targetAudience) {
      newErrors.targetAudience = 'To pole jest wymagane';
    } else if (targetAudience.length < 30) {
      newErrors.targetAudience = 'Odpowiedź powinna mieć minimum 30 znaków';
    }

    if (!formData.get('consent')) {
      newErrors.consent = 'Zgoda RODO jest wymagana';
    }

    // At least one genre must be selected
    const genres = ['sztuka', 'moda', 'fotografia', 'sztuka-ludowa', 'historia-kulinarow', 'inne'];
    const hasGenre = genres.some(genre => formData.get(genre));
    if (!hasGenre) {
      newErrors.genres = 'Wybierz przynajmniej jedną dziedzinę';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, file: 'Plik nie może być większy niż 10MB' }));
        setSelectedFile(null);
        e.target.value = '';
        return;
      }

      // Check file type
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({ ...prev, file: 'Plik musi być w formacie PDF' }));
        setSelectedFile(null);
        e.target.value = '';
        return;
      }

      setSelectedFile(file);
      setErrors(prev => {
        const { file, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Validate
    if (!validateForm(formData)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Submit to Formspree
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
        setSelectedFile(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setUploadProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <>
        {/* Success Page */}
        <section className="section-padding bg-gradient-to-br from-cream to-white">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h1 className="mb-6">Dziękujemy za zgłoszenie!</h1>

              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Twoja propozycja została pomyślnie wysłana. Doceniamy Twoje zainteresowanie współpracą z Wydawnictwem Safaia.
              </p>

              <div className="bg-white p-8 mb-8 border-l-4 border-sapphire">
                <h2 className="text-2xl font-display mb-4 text-sapphire-dark">Co dalej?</h2>
                <div className="text-left space-y-4 text-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-sapphire text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <p>Nasz zespół redakcyjny zapozna się z Twoją propozycją w ciągu <strong>14 dni roboczych</strong>.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-sapphire text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <p>Jeśli projekt zainteresuje nas, skontaktujemy się emailem lub telefonicznie, aby umówić spotkanie.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-sapphire text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <p>W przypadku pytań lub chęci dostarczenia dodatkowych materiałów, napisz na: <a href="mailto:manuskrypty@safaia.pl" className="text-sapphire hover:underline">manuskrypty@safaia.pl</a></p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/katalog"
                  className="px-8 py-4 bg-sapphire text-white font-medium hover:bg-sapphire-800 transition-colors"
                >
                  Przeglądaj katalog
                </Link>
                <Link
                  href="/"
                  className="px-8 py-4 border-2 border-sapphire text-sapphire font-medium hover:bg-sapphire hover:text-white transition-all"
                >
                  Powrót do strony głównej
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-cream to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">Dla autorów</h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-4">
              Szukamy unikalnych głosów i fascynujących historii.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Jeśli masz pomysł na książkę o sztuce, modzie, fotografii lub kulturze ludowej — książkę, która wnosi świeże spojrzenie i została napisana z pasją — chcemy Cię poznać.
            </p>
          </div>
        </div>
      </section>

      {/* What We're Looking For */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-12 text-center">Czego szukamy?</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-cream p-8">
                <h3 className="text-xl font-display mb-4 text-sapphire-dark">
                  Tematy, które nas interesują
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {[
                    'Historia sztuki i rzemiosła artystycznego',
                    'Moda i jej kulturowe konteksty',
                    'Fotografia dokumentalna i artystyczna',
                    'Tradycje ludowe i ich współczesne interpretacje',
                    'Historia kulinariów i kultury jedzenia',
                    'Design i jego wpływ na życie codzienne'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-sapphire flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-cream p-8">
                <h3 className="text-xl font-display mb-4 text-sapphire-dark">
                  Czego oczekujemy
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {[
                    'Rzetelność i staranność w badaniach',
                    'Przystępny, ale nie uproszczony język',
                    'Świeża perspektywa i nowe spojrzenie',
                    'Bogaty materiał ilustracyjny (jeśli dotyczy)',
                    'Gotowość do współpracy redakcyjnej',
                    'Pasja do tworzonego tematu'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-sapphire flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="section-padding bg-cream">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Wyślij swoją propozycję</h2>
              <p className="text-gray-600">
                Wypełnij formularz poniżej. Odpowiemy w ciągu 14 dni roboczych.
              </p>
            </div>

            {submitStatus === 'error' && (
              <div className="mb-8 p-6 bg-red-50 border-l-4 border-red-500">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-red-800 mb-1">Wystąpił błąd</h3>
                    <p className="text-sm text-red-700">
                      Nie udało się wysłać formularza. Spróbuj ponownie lub napisz bezpośrednio na: manuskrypty@safaia.pl
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg">
              {/* Personal Info */}
              <div className="mb-10">
                <h3 className="text-2xl font-display mb-6 text-sapphire-dark border-b-2 border-sapphire pb-3">
                  1. Dane kontaktowe
                </h3>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
                      Imię <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className={`w-full px-4 py-3 border-2 ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:border-sapphire focus:outline-none transition-colors`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">
                      Nazwisko <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className={`w-full px-4 py-3 border-2 ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:border-sapphire focus:outline-none transition-colors`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className={`w-full px-4 py-3 border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-sapphire focus:outline-none transition-colors`}
                      placeholder="twoj@email.pl"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
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
                </div>
              </div>

              {/* Project Info */}
              <div className="mb-10">
                <h3 className="text-2xl font-display mb-6 text-sapphire-dark border-b-2 border-sapphire pb-3">
                  2. Informacje o projekcie
                </h3>

                <div className="mb-6">
                  <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-900 mb-2">
                    Tytuł roboczy projektu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="projectTitle"
                    name="projectTitle"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-sapphire focus:outline-none transition-colors"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Dziedzina / gatunek <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600 mb-3">Zaznacz wszystkie, które pasują</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { id: 'sztuka', label: 'Sztuka' },
                      { id: 'moda', label: 'Moda' },
                      { id: 'fotografia', label: 'Fotografia' },
                      { id: 'sztuka-ludowa', label: 'Sztuka ludowa' },
                      { id: 'historia-kulinarow', label: 'Historia kulinariów' },
                      { id: 'inne', label: 'Inne' },
                    ].map((genre) => (
                      <label key={genre.id} className="flex items-center gap-3 p-3 border-2 border-gray-200 hover:border-sapphire transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          name={genre.id}
                          value={genre.label}
                          className="w-5 h-5 text-sapphire border-gray-300 focus:ring-sapphire"
                        />
                        <span className="text-gray-900">{genre.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.genres && <p className="text-red-500 text-sm mt-2">{errors.genres}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
                    Opis projektu <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600 mb-2">Opisz pokrótce temat książki, jej zakres i strukturę (minimum 100 znaków)</p>
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    required
                    className={`w-full px-4 py-3 border-2 ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:border-sapphire focus:outline-none transition-colors resize-y`}
                    placeholder="Opowiedz nam o swoim projekcie: jaki jest temat, zakres, struktura..."
                  ></textarea>
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
              </div>

              {/* Key Questions */}
              <div className="mb-10">
                <h3 className="text-2xl font-display mb-6 text-sapphire-dark border-b-2 border-sapphire pb-3">
                  3. Pytania pomocnicze
                </h3>

                <div className="mb-6">
                  <label htmlFor="uniqueness" className="block text-sm font-medium text-gray-900 mb-2">
                    Dlaczego ta książka jest wyjątkowa? <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600 mb-2">Co wyróżnia Twój projekt spośród innych publikacji na ten temat? (minimum 50 znaków)</p>
                  <textarea
                    id="uniqueness"
                    name="uniqueness"
                    rows={4}
                    required
                    className={`w-full px-4 py-3 border-2 ${errors.uniqueness ? 'border-red-500' : 'border-gray-300'} focus:border-sapphire focus:outline-none transition-colors resize-y`}
                    placeholder="Co czyni tę książkę wyjątkową? Jaką nową perspektywę wnosi?"
                  ></textarea>
                  {errors.uniqueness && <p className="text-red-500 text-sm mt-1">{errors.uniqueness}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-900 mb-2">
                    Jaka grupa czytelników? <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-600 mb-2">Dla kogo jest ta książka? Kto będzie ją czytał? (minimum 30 znaków)</p>
                  <textarea
                    id="targetAudience"
                    name="targetAudience"
                    rows={3}
                    required
                    className={`w-full px-4 py-3 border-2 ${errors.targetAudience ? 'border-red-500' : 'border-gray-300'} focus:border-sapphire focus:outline-none transition-colors resize-y`}
                    placeholder="Opisz grupę docelową: zainteresowania, wiek, poziom wiedzy..."
                  ></textarea>
                  {errors.targetAudience && <p className="text-red-500 text-sm mt-1">{errors.targetAudience}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-900 mb-2">
                    Status pracy <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-sapphire focus:outline-none transition-colors"
                  >
                    <option value="">Wybierz status</option>
                    <option value="pomysl">Pomysł / koncepcja</option>
                    <option value="w-trakcie">W trakcie pisania</option>
                    <option value="gotowy">Gotowy manuskrypt</option>
                  </select>
                </div>
              </div>

              {/* File Upload and Portfolio */}
              <div className="mb-10">
                <h3 className="text-2xl font-display mb-6 text-sapphire-dark border-b-2 border-sapphire pb-3">
                  4. Materiały dodatkowe
                </h3>

                <div className="mb-6">
                  <label htmlFor="manuscript" className="block text-sm font-medium text-gray-900 mb-2">
                    Załącz próbkę / manuskrypt (PDF)
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    Fragmenty manuskryptu, spis treści lub przykładowe rozdziały (maksymalnie 10MB)
                  </p>
                  <div className={`border-2 ${errors.file ? 'border-red-500' : 'border-dashed border-gray-300'} p-8 text-center hover:border-sapphire transition-colors`}>
                    <input
                      type="file"
                      id="manuscript"
                      name="manuscript"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="manuscript" className="cursor-pointer">
                      <div className="w-16 h-16 mx-auto mb-4 bg-sapphire/10 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-sapphire" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        {selectedFile ? (
                          <span className="font-medium text-sapphire">{selectedFile.name}</span>
                        ) : (
                          'Kliknij aby wybrać plik lub przeciągnij go tutaj'
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        Tylko pliki PDF, maksymalnie 10MB
                      </p>
                    </label>
                  </div>
                  {errors.file && <p className="text-red-500 text-sm mt-2">{errors.file}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="portfolio" className="block text-sm font-medium text-gray-900 mb-2">
                    Link do portfolio / Instagram / Website
                  </label>
                  <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-sapphire focus:outline-none transition-colors"
                    placeholder="https://"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Jeśli masz stronę WWW, profil na Instagramie lub portfolio online, podaj link
                  </p>
                </div>
              </div>

              {/* Additional Info and Consent */}
              <div className="mb-8">
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-900 mb-2">
                  Dodatkowe informacje
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-sapphire focus:outline-none transition-colors resize-y"
                  placeholder="Czy współpracowałeś wcześniej z innymi wydawnictwami? Czy masz doświadczenie jako autor? Inne istotne informacje..."
                ></textarea>
              </div>

              {/* RODO Consent */}
              <div className="mb-8 p-6 bg-gray-50 border-2 border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className={`mt-1 w-5 h-5 text-sapphire ${errors.consent ? 'border-red-500' : 'border-gray-300'} focus:ring-sapphire`}
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych przez Wydawnictwo Safaia
                    w celu rozpatrzenia zgłoszenia i ewentualnego nawiązania współpracy. Zapoznałem/am się z{' '}
                    <Link href="/polityka-prywatnosci" className="text-sapphire hover:underline" target="_blank">
                      polityką prywatności
                    </Link>.{' '}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.consent && <p className="text-red-500 text-sm mt-2 ml-8">{errors.consent}</p>}
              </div>

              {/* Upload Progress */}
              {isSubmitting && uploadProgress > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-700 mb-2">
                    <span>Wysyłanie formularza...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-sapphire h-full transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-5 bg-sapphire text-white text-lg font-medium hover:bg-sapphire-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Wysyłanie...
                  </>
                ) : (
                  'Wyślij zgłoszenie'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                * Pola wymagane
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Process Info */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-12 text-center">Jak wygląda proces?</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Zgłoszenie',
                  description: 'Wypełniasz formularz i wysyłasz propozycję projektu',
                },
                {
                  step: '02',
                  title: 'Ocena',
                  description: 'Analizujemy zgłoszenie pod kątem zgodności z naszym profilem (14 dni)',
                },
                {
                  step: '03',
                  title: 'Rozmowa',
                  description: 'Jeśli projekt nas zainteresuje, umawiamy spotkanie lub rozmowę',
                },
                {
                  step: '04',
                  title: 'Współpraca',
                  description: 'Wspólnie pracujemy nad kształtem finalnej publikacji',
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-sapphire text-white rounded-full flex items-center justify-center text-2xl font-display">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-display mb-2 text-sapphire-dark">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
