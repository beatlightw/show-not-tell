import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './i18n';
import BookDetailPage from './pages/BookDetailPage';
import BookLibraryPage from './pages/BookLibraryPage';
import HomePage from './pages/HomePage';
import LessonPage from './pages/LessonPage';
import ThesaurusPage from './pages/ThesaurusPage';

const repoPrefix = '/show-not-tell';
const appBasename =
  window.location.pathname === repoPrefix ||
  window.location.pathname.startsWith(`${repoPrefix}/`)
    ? repoPrefix
    : '/';

function RedirectFrom404() {
  const navigate = useNavigate();

  useEffect(() => {
    const target = sessionStorage.getItem('gh-pages-redirect');
    if (!target) return;
    sessionStorage.removeItem('gh-pages-redirect');
    const prefix = appBasename === '/' ? '' : appBasename;
    const path = target.startsWith(prefix) ? target.slice(prefix.length) : target;
    navigate(path || '/', { replace: true });
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename={appBasename}>
        <RedirectFrom404 />
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BookLibraryPage />} />
            <Route path="/book/:bookId" element={<BookDetailPage />} />
            <Route path="/lesson/:bookId/:lessonId" element={<LessonPage />} />
            <Route path="/thesaurus" element={<ThesaurusPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
