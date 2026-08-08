import { BookOpen } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function EmptyState() {
  const { t } = useLanguage();

  return (
    <div className="empty-state">
      <span className="empty-state__icon">
        <BookOpen size={22} />
      </span>
      <h3>{t('emptyTitle')}</h3>
      <p>{t('emptyText')}</p>
    </div>
  );
}
