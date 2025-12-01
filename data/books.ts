import booksData from './books.json';

export interface Author {
  name: string;
  bio: string;
  photo: string;
  email: string;
}

export interface Review {
  author: string;
  rating: number;
  text: string;
}

export interface Book {
  id: number;
  slug: string;
  title: string;
  author: Author;
  category: 'Sztuka' | 'Moda' | 'Fotografia' | 'Sztuka ludowa' | 'Historia kulinariów';
  tags: string[];
  description: string;
  longDescription: string;
  excerpt: string;
  tableOfContents?: string[];
  price: string;
  year: number;
  pages: number;
  isbn: string;
  dimensions: string;
  binding: string;
  weight: string;
  language: string;
  coverImage: string;
  images: string[];
  reviews: Review[];
  relatedBooks: number[];
  featured: boolean;
  newRelease: boolean;
  recommended: boolean;
  publishedDate: string;
  purchaseLink: string;
}

export const books: Book[] = booksData.books as Book[];
export const categories = booksData.categories;

export function getBookById(id: number): Book | undefined {
  return books.find(book => book.id === id);
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find(book => book.slug === slug);
}

export function getBooksByCategory(category: string): Book[] {
  if (category === 'Wszystkie') return books;
  return books.filter(book => book.category === category);
}

export function getBooksByTag(tag: string): Book[] {
  return books.filter(book => book.tags.includes(tag));
}

export function getFeaturedBooks(): Book[] {
  return books.filter(book => book.featured);
}

export function getNewReleases(): Book[] {
  return books.filter(book => book.newRelease);
}

export function getRecommendedBooks(): Book[] {
  return books.filter(book => book.recommended);
}

export function getRelatedBooks(bookId: number, limit: number = 3): Book[] {
  const book = getBookById(bookId);
  if (!book) return [];

  return book.relatedBooks
    .map(id => getBookById(id))
    .filter((b): b is Book => b !== undefined)
    .slice(0, limit);
}

export function searchBooks(query: string): Book[] {
  const lowerQuery = query.toLowerCase();
  return books.filter(book =>
    book.title.toLowerCase().includes(lowerQuery) ||
    book.author.name.toLowerCase().includes(lowerQuery) ||
    book.description.toLowerCase().includes(lowerQuery) ||
    book.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function sortBooks(books: Book[], sortBy: 'newest' | 'oldest' | 'title' | 'recommended'): Book[] {
  const sorted = [...books];

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime());
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title, 'pl'));
    case 'recommended':
      return sorted.sort((a, b) => {
        if (a.recommended && !b.recommended) return -1;
        if (!a.recommended && b.recommended) return 1;
        return 0;
      });
    default:
      return sorted;
  }
}

export function paginateBooks(books: Book[], page: number, perPage: number = 9): {
  books: Book[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  const totalPages = Math.ceil(books.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return {
    books: books.slice(start, end),
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  books.forEach(book => {
    book.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

// For SSG - get all book slugs
export function getAllBookSlugs(): string[] {
  return books.map(book => book.slug);
}

// For SSG - get all book IDs
export function getAllBookIds(): number[] {
  return books.map(book => book.id);
}
