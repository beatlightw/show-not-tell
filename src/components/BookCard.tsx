import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import type { Book } from '../content/types';
import {
  bookAuthor,
  bookIntro,
  bookTitle,
  useLanguage,
} from '../i18n';
import PlaceholderImage from './PlaceholderImage';

export default function BookCard({ book }: { book: Book }) {
  const { language, t } = useLanguage();
  const title = bookTitle(book, language);

  return (
    <Link to={`/book/${book.id}`} className="book-card">
      <div className="book-card__cover">
        <PlaceholderImage
          src={book.coverImage}
          alt={`${title} ${t('coverAlt')}`}
          label={title}
          variant="book"
        />
      </div>
      <div className="book-card__body">
        <h3 className="book-card__title">{title}</h3>
        <p className="book-card__author">{bookAuthor(book, language)}</p>
        <p className="book-card__intro">{bookIntro(book, language)}</p>
        <div className="book-card__foot">
          <span className="chip chip--count">
            <BookOpen size={13} />
            {book.lessons.length} {t('lessonUnit')}
          </span>
          <span className="book-card__arrow" aria-hidden="true">
            <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}
