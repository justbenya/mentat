import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function CardImage({ cardId, alt, className = '' }) {
  const [hasError, setHasError] = useState(false);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const src = hasError ? `/cards/en/${cardId}.jpg` : `/cards/${lang}/${cardId}.jpg`;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
