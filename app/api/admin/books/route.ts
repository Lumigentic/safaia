/**
 * Admin Books API - List and Create
 * GET /api/admin/books - List all books
 * POST /api/admin/books - Create new book
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getBooks, addBook } from '@/lib/storage';

/**
 * GET - List all books
 */
export async function GET() {
  try {
    // Require authentication
    await requireAuth();

    const books = await getBooks();

    return NextResponse.json({ books }, { status: 200 });
  } catch (error) {
    console.error('Get books error:', error);
    return NextResponse.json(
      { error: 'Błąd serwera' },
      { status: 500 }
    );
  }
}

/**
 * POST - Create new book
 */
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    await requireAuth();

    const bookData = await request.json();

    // Validate required fields
    if (!bookData.title || !bookData.slug || !bookData.author?.name) {
      return NextResponse.json(
        { error: 'Brak wymaganych pól: title, slug, author.name' },
        { status: 400 }
      );
    }

    const newBook = await addBook(bookData);

    return NextResponse.json(
      { success: true, book: newBook },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create book error:', error);

    if (error instanceof Error && error.message.includes('already exists')) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Błąd serwera' },
      { status: 500 }
    );
  }
}
