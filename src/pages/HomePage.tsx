import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Eye,
  Feather,
  Layers,
  Sparkles,
} from 'lucide-react';
import BookCard from '../components/BookCard';
import CurvedLoop from '../components/CurvedLoop';
import EmptyState from '../components/EmptyState';
import PlaceholderImage from '../components/PlaceholderImage';
import ShinyText from '../components/ShinyText';
import { books } from '../content/books';
import {
  bookTitle,
  lessonScene,
  lessonTitle,
  useLanguage,
} from '../i18n';

export default function HomePage() {
  const { language, t } = useLanguage();
  const featured = books.slice(0, 4);
  const lessonCount = books.reduce(
    (sum, book) => sum + book.lessons.length,
    0,
  );
  const techniqueCount = books.reduce(
    (sum, book) =>
      sum +
      book.lessons.reduce(
        (inner, lesson) => inner + lesson.techniques.length,
        0,
      ),
    0,
  );
  const previewBook = books[0];
  const featuredLessons = books
    .flatMap((book) =>
      book.lessons.map((lesson) => ({
        book,
        lesson,
      })),
    )
    .slice(0, 3);

  const features = [
    {
      icon: Feather,
      color: 'cyan',
      title: t('featureOriginal'),
      text: t('featureOriginalText'),
    },
    {
      icon: Eye,
      color: 'orange',
      title: t('featureCompare'),
      text: t('featureCompareText'),
    },
    {
      icon: Layers,
      color: 'green',
      title: t('featureTechnique'),
      text: t('featureTechniqueText'),
    },
    {
      icon: Sparkles,
      color: 'rose',
      title: t('featureUpdate'),
      text: t('featureUpdateText'),
    },
  ];

  return (
    <div className="page">
      <section className="hero">
        <div className="container hero__inner">
          <span className="hero__eyebrow">
            <Sparkles size={13} />
            {t('heroEyebrow')}
          </span>
          <h1>
            <ShinyText
              text={t('heroTitle')}
              color="#c9b8ea"
              shineColor="#ffffff"
              speed={3}
              spread={130}
            />
          </h1>
          <p className="hero__lead">{t('heroLead')}</p>
          <div className="hero__actions">
            <Link to="/books" className="btn btn--lg btn--accent">
              {t('enterLibrary')}
              <ArrowRight size={16} />
            </Link>
            {previewBook && (
              <Link
                to={`/book/${previewBook.id}`}
                className="btn btn--lg btn--ghost-light"
              >
                <BookOpen size={16} />
                {t('firstLesson')}
              </Link>
            )}
          </div>
          <div className="hero__stats">
            <div>
              <strong>{books.length}</strong>
              <span>{t('statBooks')}</span>
            </div>
            <div>
              <strong>{lessonCount}</strong>
              <span>{t('statLessons')}</span>
            </div>
            <div>
              <strong>{techniqueCount}</strong>
              <span>{t('statTechniques')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="curved-band">
        <CurvedLoop
          marqueeText={t('curvedMarquee')}
          speed={1.6}
          curveAmount={320}
        />
      </section>

      <section className="feature-strip">
        <div className="container feature-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="feature-card">
                <span
                  className={`feature-card__icon feature-card__icon--${feature.color}`}
                >
                  <Icon size={18} />
                </span>
                <div>
                  <strong>{feature.title}</strong>
                  <p>{feature.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-head__en">{t('libraryEyebrow')}</span>
              <h2>{t('libraryTitle')}</h2>
            </div>
            {books.length > 0 && (
              <Link to="/books" className="section-head__more">
                {t('allBooks')}
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
          {books.length > 0 ? (
            <div className="book-grid">
              {featured.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-head__en">{t('lessonsEyebrow')}</span>
              <h2>{t('lessonsTitle')}</h2>
            </div>
          </div>
          {featuredLessons.length > 0 ? (
            <div className="lesson-grid">
              {featuredLessons.map(({ book, lesson }) => (
                <Link
                  key={lesson.id}
                  to={`/lesson/${book.id}/${lesson.id}`}
                  className="lesson-card"
                >
                  <PlaceholderImage
                    src={lesson.photo}
                    alt={`${lessonTitle(lesson, language)} ${t('scenePhotoAlt')}`}
                    label={lessonTitle(lesson, language)}
                    variant="lesson"
                  />
                  <div className="lesson-card__body">
                    <span className="lesson-card__tag">
                      {bookTitle(book, language)}
                    </span>
                    <h3>{lessonTitle(lesson, language)}</h3>
                    <p>{lessonScene(lesson, language)}</p>
                    <div className="lesson-card__foot">
                      <span className="lesson-card__mini">
                        {t('tellShowMini')}
                      </span>
                      <span className="lesson-card__arrow" aria-hidden="true">
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <div>
            <span className="cta-band__en">{t('ctaEn')}</span>
            <h2>{t('ctaTitle')}</h2>
            <p>{t('ctaText')}</p>
          </div>
          <Link to="/books" className="btn btn--lg btn--ghost-light">
            {t('enterLibrary')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
