import rawBooks from './books.json';
import type { Book } from './types';

export const books: Book[] = rawBooks.books;

export function getBookById(id: string): Book | undefined {
  return books.find((book) => book.id === id);
}

export function getLesson(bookId: string, lessonId: string) {
  const book = getBookById(bookId);
  return {
    book,
    lesson: book?.lessons.find((item) => item.id === lessonId),
  };
}
