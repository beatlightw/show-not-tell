import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import BookCard from '../components/BookCard';
import EmptyState from '../components/EmptyState';
import { books } from '../content/books';
import { useLanguage } from '../i18n';

export default function BookLibraryPage() {
  const { t } = useLanguage();

  return (
    <div className="page">
      <section className="page-head">
        <div className="container">
          <nav className="breadcrumb breadcrumb--light" aria-label={t('ariaBreadcrumb')}>
            <Link to="/">{t('home')}</Link>
            <ChevronRight size={13} />
            <span>{t('navLibrary')}</span>
          </nav>
          <h1>{t('libraryPageTitle')}</h1>
          <p>{t('libraryPageText')}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {books.length > 0 ? (
            <div className="book-grid">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </div>
  );
}
