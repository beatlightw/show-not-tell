import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Quote,
  Sparkles,
} from 'lucide-react';
import PlaceholderImage from '../components/PlaceholderImage';
import { getLesson } from '../content/books';
import {
  bookTitle,
  lessonScene,
  lessonTechniques,
  lessonTitle,
  useLanguage,
} from '../i18n';

export default function LessonPage() {
  const { bookId, lessonId } = useParams();
  const { book, lesson } = getLesson(bookId ?? '', lessonId ?? '');
  const { language, t } = useLanguage();

  if (!book || !lesson) {
    return <Navigate to="/books" replace />;
  }

  const index = book.lessons.findIndex((item) => item.id === lesson.id);
  const prev = book.lessons[index - 1];
  const next = book.lessons[index + 1];
  const title = lessonTitle(lesson, language);
  const scene = lessonScene(lesson, language);

  return (
    <div className="page lesson-page">
      <div className="container">
        <nav className="breadcrumb" aria-label={t('ariaBreadcrumb')}>
          <Link to="/">{t('home')}</Link>
          <ChevronRight size={13} />
          <Link to="/books">{t('navLibrary')}</Link>
          <ChevronRight size={13} />
          <Link to={`/book/${book.id}`}>{bookTitle(book, language)}</Link>
          <ChevronRight size={13} />
          <span>{title}</span>
        </nav>
        <div className="lesson-photo">
          <PlaceholderImage
            src={lesson.photo}
            alt={`${title} ${t('scenePhotoAlt')}`}
            label={scene}
            variant="lesson"
          />
        </div>
        <h1 className="lesson-title">{title}</h1>
        <div className="lesson-meta">
          <span className="chip chip--source">
            <BookOpen size={13} />
            {lesson.source}
          </span>
        </div>
        <p className="lesson-scene">{scene}</p>

        <section className="comparison" aria-label={t('ariaCompare')}>
          <div className="panel panel--tell">
            <div className="panel__head">
              <span className="chip chip--tell">{t('tellLabel')}</span>
              <span className="panel__index">01</span>
            </div>
            <p>{lesson.tell}</p>
          </div>
          <div className="panel panel--show">
            <div className="panel__head">
              <span className="chip chip--show">{t('showLabel')}</span>
              <span className="panel__index">02</span>
            </div>
            <p>{lesson.show}</p>
          </div>
        </section>

        {language === 'zh' && lesson.translation && (
          <section className="translation">
            <Quote size={18} />
            <p>{lesson.translation}</p>
          </section>
        )}

        <section className="techniques">
          <div className="section-head">
            <div>
              <span className="section-head__en">
                {t('techniquesEyebrow')}
              </span>
              <h2>{t('techniquesTitle')}</h2>
            </div>
            <Sparkles size={18} className="section-head__icon" />
          </div>
          <ol className="technique-list">
            {lessonTechniques(lesson, language).map((technique, techniqueIndex) => (
              <li key={techniqueIndex}>
                <span className="technique-list__num">
                  {techniqueIndex + 1}
                </span>
                <p>{technique}</p>
              </li>
            ))}
          </ol>
        </section>

        <nav className="lesson-nav" aria-label={t('ariaLessonNav')}>
          {prev ? (
            <Link
              to={`/lesson/${book.id}/${prev.id}`}
              className="lesson-nav__link"
            >
              <ArrowLeft size={16} />
              <span>
                <small>{t('previousLesson')}</small>
                <strong>{lessonTitle(prev, language)}</strong>
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {next ? (
            <Link
              to={`/lesson/${book.id}/${next.id}`}
              className="lesson-nav__link lesson-nav__link--next"
            >
              <span>
                <small>{t('nextLesson')}</small>
                <strong>{lessonTitle(next, language)}</strong>
              </span>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
        </nav>
      </div>
    </div>
  );
}
