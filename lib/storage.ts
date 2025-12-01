/**
 * Local Storage for Books
 * Uses JSON file storage in /data directory
 */

import fs from 'fs/promises';
import path from 'path';
import type { Book } from '@/types/book';

const DATA_DIR = path.join(process.cwd(), 'data');
const BOOKS_FILE = path.join(DATA_DIR, 'books.json');

/**
 * Ensure data directory exists
 */
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

/**
 * Get all books
 */
export async function getBooks(): Promise<Book[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(BOOKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    console.error('Error reading books:', error);
    return [];
  }
}

/**
 * Get book by slug
 */
export async function getBookBySlug(slug: string): Promise<Book | null> {
  const books = await getBooks();
  return books.find((book) => book.slug === slug) || null;
}

/**
 * Save all books
 */
export async function saveBooks(books: Book[]): Promise<void> {
  try {
    await ensureDataDir();
    await fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving books:', error);
    throw new Error('Failed to save books');
  }
}

/**
 * Add new book
 */
export async function addBook(book: Book): Promise<Book> {
  const books = await getBooks();

  // Check if slug already exists
  if (books.some((b) => b.slug === book.slug)) {
    throw new Error(`Book with slug "${book.slug}" already exists`);
  }

  books.push(book);
  await saveBooks(books);
  return book;
}

/**
 * Update existing book
 */
export async function updateBook(slug: string, updates: Partial<Book>): Promise<Book> {
  const books = await getBooks();
  const index = books.findIndex((b) => b.slug === slug);

  if (index === -1) {
    throw new Error(`Book with slug "${slug}" not found`);
  }

  // If slug is being changed, check for conflicts
  if (updates.slug && updates.slug !== slug) {
    if (books.some((b) => b.slug === updates.slug)) {
      throw new Error(`Book with slug "${updates.slug}" already exists`);
    }
  }

  books[index] = { ...books[index], ...updates };
  await saveBooks(books);
  return books[index];
}

/**
 * Delete book
 */
export async function deleteBook(slug: string): Promise<void> {
  const books = await getBooks();
  const filteredBooks = books.filter((b) => b.slug !== slug);

  if (filteredBooks.length === books.length) {
    throw new Error(`Book with slug "${slug}" not found`);
  }

  await saveBooks(filteredBooks);
}

/**
 * Get books by category
 */
export async function getBooksByCategory(category: string): Promise<Book[]> {
  const books = await getBooks();
  return books.filter((book) => book.category === category);
}

/**
 * Get featured books
 */
export async function getFeaturedBooks(): Promise<Book[]> {
  const books = await getBooks();
  return books.filter((book) => book.featured);
}

/**
 * Get new releases
 */
export async function getNewReleases(): Promise<Book[]> {
  const books = await getBooks();
  return books.filter((book) => book.newRelease);
}

/**
 * Search books
 */
export async function searchBooks(query: string): Promise<Book[]> {
  const books = await getBooks();
  const lowerQuery = query.toLowerCase();

  return books.filter((book) => {
    return (
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.name.toLowerCase().includes(lowerQuery) ||
      book.description.short.toLowerCase().includes(lowerQuery) ||
      book.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  });
}
