# Safaia Design System - Tokeny projektowe

## 🎨 Paleta kolorów

### Primary - Sapphire
Główny kolor marki - szlachetny niebieski inspirowany szafirem.

```css
--color-sapphire-50: #f0f2f9   /* Najjaśniejszy - tła */
--color-sapphire-100: #dde1f0
--color-sapphire-200: #c2c9e4
--color-sapphire-300: #9da8d4
--color-sapphire-400: #7684c2
--color-sapphire-500: #5a6bad
--color-sapphire-600: #4a5c9e
--color-sapphire-700: #334782  /* GŁÓWNY KOLOR MARKI */
--color-sapphire-800: #2a3a6b
--color-sapphire-900: #27315a  /* Najciemniejszy */
```

**Zastosowanie:**
- `sapphire-700` - podstawowy kolor nagłówków, linków, primary buttons
- `sapphire-50-200` - tła sekcji, subtle highlights
- `sapphire-800-900` - hover states, deep backgrounds

### Secondary - Violet/Indigo
Uzupełniające odcienie fioletu i indygo dla akcentów i gradientów.

```css
/* Violet */
--color-violet-600: #6b5b95    /* Główny violet */
--color-violet-500: #826a8f
--color-violet-400: #9d83aa

/* Indigo */
--color-indigo-600: #4f46e5    /* Główny indigo */
--color-indigo-500: #6366f1
--color-indigo-400: #818cf8
```

**Zastosowanie:**
- Gradienty z sapphire
- Akcenty wizualne
- Secondary elements

### Accent - Cream/Warm
Ciepłe, jasne odcienie dla tła i kontrastów.

```css
--color-cream: #f7f8fb          /* Główny cream */
--color-warm-cream: #faf9f6     /* Cieplejszy variant */
--color-cream-300: #f7f8fb
--color-cream-200: #faf9f6
```

**Zastosowanie:**
- Tła sekcji alternatywnych
- Karty i boksy
- Subtle backgrounds

### Neutrals - Grays
Kompletna skala szarości dla tekstu i elementów UI.

```css
--color-charcoal: #2d2d2d      /* Główny kolor tekstu */
--color-gray-600: #6b7280      /* Secondary text */
--color-gray-400: #a3a3a3      /* Disabled, placeholders */
--color-gray-200: #e5e5e5      /* Borders */
--color-light-gray: #e5e7eb    /* Light borders */
```

### Semantic Colors
```css
--color-success: #10b981   /* Success states */
--color-error: #ef4444     /* Errors, warnings */
--color-warning: #f59e0b   /* Attention needed */
--color-info: #3b82f6      /* Information */
```

---

## 📏 Typography Scale

### Font Families
```css
--font-family-display: 'Cormorant Garamond', Georgia, serif
--font-family-heading: 'Cormorant Garamond', Georgia, serif
--font-family-body: 'Inter', -apple-system, sans-serif
```

### Font Sizes (rem / px)

| Token | Rem | Pixels | Użycie |
|-------|-----|--------|--------|
| `xs` | 0.75rem | 12px | Captions, labels |
| `sm` | 0.875rem | 14px | Small text, metadata |
| `base` | 1rem | 16px | Body text (default) |
| `lg` | 1.125rem | 18px | Lead paragraphs |
| `xl` | 1.25rem | 20px | Large body, subheadings |
| `2xl` | 1.5rem | 24px | H4, section titles |
| `3xl` | 1.875rem | 30px | H3 |
| `4xl` | 2.25rem | 36px | H2 |
| `5xl` | 3rem | 48px | H1 (mobile) |
| `6xl` | 3.75rem | 60px | H1 (tablet) |
| `7xl` | 4.5rem | 72px | H1 (desktop) |

### Typography Hierarchy

**H1** - Hero headings
```css
font-size: clamp(2.5rem, 5vw, 4.5rem)
font-family: Cormorant Garamond
font-weight: 400
line-height: 1.1
letter-spacing: -0.025em
```

**H2** - Section titles
```css
font-size: clamp(2rem, 4vw, 3rem)
font-family: Cormorant Garamond
font-weight: 500
line-height: 1.2
letter-spacing: -0.025em
```

**H3** - Subsection headings
```css
font-size: clamp(1.5rem, 3vw, 2rem)
font-family: Cormorant Garamond
font-weight: 500
line-height: 1.2
```

**Body** - Regular text
```css
font-size: 1rem (16px)
font-family: Inter
font-weight: 400
line-height: 1.6
max-width: 70ch
```

**Lead** - Introduction paragraphs
```css
font-size: 1.25rem (20px)
font-family: Inter
line-height: 1.6
color: gray-600
```

**Small** - Captions, metadata
```css
font-size: 0.875rem (14px)
line-height: 1.5
```

### Line Heights
```css
--line-height-tight: 1.1    /* Headings */
--line-height-snug: 1.2     /* Subheadings */
--line-height-normal: 1.5   /* UI text */
--line-height-relaxed: 1.6  /* Body text */
--line-height-loose: 1.8    /* Editorial content */
```

### Letter Spacing
```css
--letter-spacing-tighter: -0.05em
--letter-spacing-tight: -0.025em   /* Headings */
--letter-spacing-normal: 0em       /* Body */
--letter-spacing-wide: 0.025em
--letter-spacing-wider: 0.05em
--letter-spacing-widest: 0.1em     /* Uppercase labels */
```

---

## 📐 Spacing Scale

System 8px base grid:

| Token | Rem | Pixels |
|-------|-----|--------|
| `1` | 0.25rem | 4px |
| `2` | 0.5rem | 8px |
| `3` | 0.75rem | 12px |
| `4` | 1rem | 16px |
| `5` | 1.25rem | 20px |
| `6` | 1.5rem | 24px |
| `8` | 2rem | 32px |
| `10` | 2.5rem | 40px |
| `12` | 3rem | 48px |
| `16` | 4rem | 64px |
| `20` | 5rem | 80px |
| `24` | 6rem | 96px |
| `32` | 8rem | 128px |

### Section Padding
```css
.section-padding: py-16 md:py-24     /* Standardowe sekcje */
.section-padding-sm: py-12 md:py-16  /* Mniejsze sekcje */
.section-padding-lg: py-24 md:py-32  /* Większe sekcje */
```

---

## 🌑 Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)    /* Cards hover */
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)    /* Modals */
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25) /* Hero elements */
```

---

## ⬜ Border Radius

```css
--radius-sm: 0.125rem (2px)   /* Subtle rounding */
--radius: 0.25rem (4px)       /* Default */
--radius-md: 0.375rem (6px)
--radius-lg: 0.5rem (8px)     /* Cards */
--radius-xl: 0.75rem (12px)
--radius-2xl: 1rem (16px)
--radius-full: 9999px         /* Pills, circles */
```

---

## 📊 Z-Index Scale

```css
--z-0: 0
--z-10: 10
--z-20: 20
--z-30: 30
--z-40: 40
--z-50: 50
--z-modal: 100       /* Modal dialogs */
--z-dropdown: 200    /* Dropdowns */
--z-sticky: 300      /* Sticky headers */
--z-fixed: 400       /* Fixed navigation */
--z-overlay: 500     /* Overlays */
```

---

## 🖼️ Image Utilities

### Aspect Ratios
```css
.aspect-book: 3/4      /* Book covers */
.aspect-hero: 16/9     /* Hero images */
.aspect-square: 1/1    /* Square images */
```

### Responsive Images
```html
<!-- Zalecana struktura -->
<img
  src="image.jpg"
  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="Description"
  class="image-cover aspect-book"
/>
```

---

## 🧩 Utility Classes

### Containers
```css
.container          /* max-width: 1100px - editorial */
.container-wide     /* max-width: 1400px - wide layouts */
```

### Grids
```css
.grid-catalog      /* 3-column catalog grid */
.grid-editorial    /* 2-column editorial grid */
```

### Buttons
```css
.btn               /* Base button */
.btn-primary       /* Primary action */
.btn-secondary     /* Secondary action */
.btn-lg            /* Large button */
.btn-sm            /* Small button */
```

### Cards
```css
.card              /* Elevated card with shadow */
.card-flat         /* Flat card with border */
```

### Animations
```css
.fade-in           /* Fade in animation */
.slide-up          /* Slide up animation */
.scale-on-hover    /* Scale transform on hover */
```

---

## 📱 Responsive Breakpoints

```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Przykłady użycia
```html
<!-- Mobile-first approach -->
<div class="text-sm md:text-base lg:text-lg">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<div class="px-4 md:px-6 lg:px-8">
```

---

## ♿ Accessibility

### Kontrast kolorów
- Tekst body na białym tle: `charcoal` (#2d2d2d) - WCAG AAA
- Headings: `sapphire-700` (#334782) - WCAG AA
- Secondary text: `gray-600` (#6b7280) - WCAG AA

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--color-sapphire-700);
  outline-offset: 2px;
}
```

### Skip Links
```html
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

---

## 📖 Przykłady komponentów

Zobacz `COMPONENT-SNIPPETS.md` dla gotowych do użycia snippetów komponentów wykorzystujących ten design system.
