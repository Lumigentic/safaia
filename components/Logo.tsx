import Image from 'next/image';
import Link from 'next/link';

export type LogoVariant = 'full' | 'mark' | 'text';
export type LogoColor = 'color' | 'white' | 'black';

interface LogoProps {
  /**
   * Wariant logo:
   * - 'full': pełne logo (sygnet + tekst)
   * - 'mark': tylko sygnet (geometryczny wzór safiru)
   * - 'text': tylko tekst "SAFAIA PUBLISHING HOUSE"
   */
  variant?: LogoVariant;

  /**
   * Wersja kolorystyczna:
   * - 'color': kolorowa wersja (domyślna)
   * - 'white': biała wersja (dla ciemnego tła)
   * - 'black': czarna wersja (dla jasnego tła)
   */
  color?: LogoColor;

  /**
   * Wysokość logo w pikselach (szerokość auto)
   */
  height?: number;

  /**
   * Klasy CSS dodatkowe
   */
  className?: string;

  /**
   * Czy logo ma być linkiem do strony głównej
   */
  linkToHome?: boolean;

  /**
   * Priorytet ładowania (dla hero/above-fold)
   */
  priority?: boolean;
}

/**
 * Komponent Logo Safaia Publishing House
 *
 * @example
 * // Pełne logo w header
 * <Logo variant="full" height={60} linkToHome />
 *
 * @example
 * // Sam sygnet w stopce
 * <Logo variant="mark" color="white" height={40} />
 *
 * @example
 * // Logo na ciemnym tle w hero
 * <Logo variant="full" color="white" height={80} priority />
 */
export default function Logo({
  variant = 'full',
  color = 'color',
  height = 48,
  className = '',
  linkToHome = false,
  priority = false,
}: LogoProps) {
  // Mapowanie wariantów do ścieżek plików
  const logoFiles = {
    full: {
      color: '/assets/logo/safaia-full-color.svg',
      white: '/assets/logo/safaia-full-white.svg',
      black: '/assets/logo/safaia-full-black.svg',
    },
    mark: {
      color: '/assets/logo/safaia-mark-color.svg',
      white: '/assets/logo/safaia-mark-white.svg',
      black: '/assets/logo/safaia-mark-black.svg',
    },
    text: {
      color: '/assets/logo/safaia-text-color.svg',
      white: '/assets/logo/safaia-text-white.svg',
      black: '/assets/logo/safaia-text-black.svg',
    },
  };

  // Pobierz odpowiednią ścieżkę do pliku
  const logoSrc = logoFiles[variant][color];

  // Oblicz szerokość na podstawie proporcji
  // Pełne logo: 540x750px (aspect ratio ~0.72)
  // Sygnet: 370x370px (aspect ratio 1:1)
  // Tekst: 400x120px (aspect ratio ~3.33)
  const aspectRatios = {
    full: 0.72,
    mark: 1,
    text: 3.33,
  };

  const width = Math.round(height * aspectRatios[variant]);

  // Alt text zależny od wariantu
  const altTexts = {
    full: 'Safaia Publishing House - logo',
    mark: 'Safaia - sygnet',
    text: 'Safaia Publishing House',
  };

  const logoElement = (
    <Image
      src={logoSrc}
      alt={altTexts[variant]}
      width={width}
      height={height}
      priority={priority}
      className={`logo logo--${variant} logo--${color} ${className}`}
      style={{
        width: 'auto',
        height: `${height}px`,
        maxHeight: '100%',
      }}
    />
  );

  // Jeśli ma być linkiem
  if (linkToHome) {
    return (
      <Link
        href="/"
        className="logo-link inline-block transition-opacity hover:opacity-80"
        aria-label="Powrót do strony głównej"
      >
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}

/**
 * Komponent pomocniczy dla responsywnego logo
 * Automatycznie dostosowuje rozmiar do breakpointów
 */
export function ResponsiveLogo({
  variant = 'full',
  color = 'color',
  linkToHome = false,
  priority = false,
}: Omit<LogoProps, 'height'>) {
  return (
    <div className="logo-responsive">
      {/* Mobile: 40px */}
      <div className="block sm:hidden">
        <Logo
          variant={variant}
          color={color}
          height={40}
          linkToHome={linkToHome}
          priority={priority}
        />
      </div>

      {/* Tablet: 56px */}
      <div className="hidden sm:block lg:hidden">
        <Logo
          variant={variant}
          color={color}
          height={56}
          linkToHome={linkToHome}
          priority={priority}
        />
      </div>

      {/* Desktop: 64px */}
      <div className="hidden lg:block">
        <Logo
          variant={variant}
          color={color}
          height={64}
          linkToHome={linkToHome}
          priority={priority}
        />
      </div>
    </div>
  );
}
