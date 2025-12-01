/**
 * Admin Books API - Single Book Operations
 * DELETE /api/admin/books/[slug]
 * PUT /api/admin/books/[slug]
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { deleteBook, updateBook, getBookBySlug } from '@/lib/storage';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/**
 * DELETE - Delete a book
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Require authentication
    await requireAuth();

    const { slug } = await params;

    await deleteBook(slug);

    return NextResponse.json(
      { success: true, message: 'Książka została usunięta' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete book error:', error);

    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        { error: 'Książka nie została znaleziona' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Błąd serwera' },
      { status: 500 }
    );
  }
}

/**
 * PUT - Update a book
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Require authentication
    await requireAuth();

    const { slug } = await params;
    const updates = await request.json();

    const updatedBook = await updateBook(slug, updates);

    return NextResponse.json(
      { success: true, book: updatedBook },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update book error:', error);

    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        { error: 'Książka nie została znaleziona' },
        { status: 404 }
      );
    }

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

/**
 * GET - Get a single book
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Require authentication
    await requireAuth();

    const { slug } = await params;
    const book = await getBookBySlug(slug);

    if (!book) {
      return NextResponse.json(
        { error: 'Książka nie została znaleziona' },
        { status: 404 }
      );
    }

    return NextResponse.json({ book }, { status: 200 });
  } catch (error) {
    console.error('Get book error:', error);
    return NextResponse.json(
      { error: 'Błąd serwera' },
      { status: 500 }
    );
  }
}
