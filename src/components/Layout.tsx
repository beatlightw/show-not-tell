import { Link, NavLink, Outlet } from 'react-router-dom';
import { ArrowRight, BookOpenText, Languages } from 'lucide-react';
import { books } from '../content/books';
import { useLanguage } from '../i18n';

export default function Layout() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div className="site">
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="brand">
            <span className="brand__mark">
              <BookOpenText size={18} />
            </span>
            <span className="brand__text">
              <strong>{t('brandName')}</strong>
              <small>{t('brandSub')}</small>
            </span>
          </Link>
          <nav className="site-nav" aria-label={t('ariaNav')}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'site-nav__link is-active' : 'site-nav__link'
              }
            >
              {t('navHome')}
            </NavLink>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive ? 'site-nav__link is-active' : 'site-nav__link'
              }
            >
              {t('navLibrary')}
            </NavLink>
          </nav>
          <div className="site-header__right">
            <button
              type="button"
              className="lang-toggle"
              onClick={toggleLanguage}
              aria-label={t('ariaLang')}
              title={t('ariaLang')}
            >
              <Languages size={15} />
              <span>{language === 'zh' ? 'EN' : '中'}</span>
            </button>
            {books.length > 0 && (
              <Link
                to={`/book/${books[0].id}`}
                className="btn btn--small btn--accent header__cta"
              >
                {t('startLearning')}
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="site-footer__brand">
            <span className="brand__mark">
              <BookOpenText size={16} />
            </span>
            <div>
              <strong>{t('brandName')}</strong>
              <small>{t('footerSlogan')}</small>
            </div>
          </div>
          <nav className="site-footer__nav" aria-label={t('ariaFooterNav')}>
            <Link to="/">{t('home')}</Link>
            <Link to="/books">{t('navLibrary')}</Link>
          </nav>
        </div>
        <div className="container site-footer__bar">
          <span>© 2026 {t('brandName')}</span>
          <span>{t('brandSub')}</span>
        </div>
      </footer>
    </div>
  );
}
