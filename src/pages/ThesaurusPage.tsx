import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Lightbulb,
  Quote,
  Search,
} from 'lucide-react';
import { thesaurus } from '../content/thesaurus';
import {
  thesaurusMeaning,
  thesaurusWhenToUse,
  useLanguage,
} from '../i18n';

export default function ThesaurusPage() {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = thesaurus.filter(
    (entry) =>
      entry.simple.toLowerCase().includes(normalizedQuery) ||
      entry.advanced.some((word) =>
        word.word.toLowerCase().includes(normalizedQuery),
      ),
  );

  return (
    <div className="page">
      <section className="page-head">
        <div className="container">
          <nav
            className="breadcrumb breadcrumb--light"
            aria-label={t('ariaBreadcrumb')}
          >
            <Link to="/">{t('home')}</Link>
            <ChevronRight size={13} />
            <span>{t('navThesaurus')}</span>
          </nav>
          <h1>{t('thesaurusTitle')}</h1>
          <p>{t('thesaurusText')}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-head__en">{t('thesaurusEyebrow')}</span>
              <h2>{t('thesaurusTitle')}</h2>
            </div>
          </div>
          <div className="thesaurus-search">
            <Search size={16} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('searchPlaceholder')}
              aria-label={t('searchLabel')}
            />
          </div>
          {filtered.length === 0 ? (
            <p className="thesaurus-empty">{t('searchEmpty')}</p>
          ) : (
            <div className="thesaurus-grid">
              {filtered.map((entry) => (
                <article key={entry.id} className="thesaurus-card">
                  <div className="thesaurus-head">
                    <div className="thesaurus-word">
                      <small>{t('simpleLabel')}</small>
                      <strong className="thesaurus-word__simple">
                        {entry.simple}
                      </strong>
                    </div>
                    <span className="chip chip--count">
                      {entry.advanced.length} {t('advancedLabel')}
                    </span>
                  </div>
                  <div className="thesaurus-advanced-list">
                    {entry.advanced.map((word, wordIndex) => (
                      <div key={word.word} className="thesaurus-advanced-item">
                        <div className="thesaurus-advanced-item__head">
                          <span className="thesaurus-advanced-item__num">
                            {String(wordIndex + 1).padStart(2, '0')}
                          </span>
                          <strong className="thesaurus-advanced-item__word">
                            {word.word}
                          </strong>
                        </div>
                        <p className="thesaurus-meaning">
                          {thesaurusMeaning(word, language)}
                        </p>
                        <div className="thesaurus-usage">
                          <strong>
                            <Lightbulb size={13} />
                            {t('whenToUseLabel')}
                          </strong>
                          <p>{thesaurusWhenToUse(word, language)}</p>
                        </div>
                        <blockquote className="thesaurus-example">
                          <Quote size={14} />
                          <span>{word.example}</span>
                        </blockquote>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
