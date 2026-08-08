import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import PlaceholderImage from '../components/PlaceholderImage';
import { getBookById } from '../content/books';
import {
  bookAuthor,
  bookIntro,
  bookTitle,
  lessonScene,
  lessonTitle,
  useLanguage,
} from '../i18n';

export default function BookDetailPage() {
  const { bookId } = useParams();
  const book = bookId ? getBookById(bookId) : undefined;
  const { language, t } = useLanguage();

  if (!book) {
    return <Navigate to="/books" replace />;
  }

  const title = bookTitle(book, language);

  return (
    <div className="page">
      <section className="page-head page-head--book">
        <div className="container">
          <nav className="breadcrumb breadcrumb--light" aria-label={t('ariaBreadcrumb')}>
            <Link to="/">{t('home')}</Link>
            <ChevronRight size={13} />
            <Link to="/books">{t('navLibrary')}</Link>
            <ChevronRight size={13} />
            <span>{title}</span>
          </nav>
          <div className="book-intro">
            <div className="book-intro__cover">
              <PlaceholderImage
                src={book.coverImage}
                alt={`${title} ${t('coverAlt')}`}
                label={title}
                variant="book"
              />
            </div>
            <div className="book-intro__copy">
              <p className="book-intro__author">
                {bookAuthor(book, language)}
              </p>
              <h1>{title}</h1>
              <p>{bookIntro(book, language)}</p>
              <span className="chip chip--light">
                <BookOpen size={13} />
                {t('totalLessons').replace(
                  '{count}',
                  String(book.lessons.length),
                )}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-head__en">
                {t('lessonDirectoryEyebrow')}
              </span>
              <h2>{t('lessonDirectoryTitle')}</h2>
            </div>
          </div>
          <ol className="lesson-list">
            {book.lessons.map((lesson, index) => (
              <li key={lesson.id}>
                <Link
                  to={`/lesson/${book.id}/${lesson.id}`}
                  className="lesson-row"
                >
                  <span className="lesson-row__num">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="lesson-row__copy">
                    <strong>{lessonTitle(lesson, language)}</strong>
                    <small>{lessonScene(lesson, language)}</small>
                  </span>
                  <span className="lesson-row__source">{lesson.source}</span>
                  <span className="lesson-row__arrow" aria-hidden="true">
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
