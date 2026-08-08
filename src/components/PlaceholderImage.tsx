import { useState } from 'react';
import { BookOpen, ImageIcon } from 'lucide-react';
import { useLanguage } from '../i18n';

interface PlaceholderImageProps {
  src: string;
  alt: string;
  label?: string;
  variant?: 'book' | 'lesson';
}

export default function PlaceholderImage({
  src,
  alt,
  label,
  variant = 'lesson',
}: PlaceholderImageProps) {
  const [failed, setFailed] = useState(false);
  const { t } = useLanguage();

  if (src && !failed) {
    return (
      <img
        className={`media media--img media--${variant}`}
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className={`media media--placeholder media--${variant}`}
      role="img"
      aria-label={alt}
    >
      <span className="media__quote" aria-hidden="true">
        “
      </span>
      {variant === 'book' ? (
        <BookOpen size={28} strokeWidth={1.6} />
      ) : (
        <ImageIcon size={28} strokeWidth={1.6} />
      )}
      <span className="media__label">{label || alt}</span>
      <span className="media__hint">{t('photoHint')}</span>
    </div>
  );
}
