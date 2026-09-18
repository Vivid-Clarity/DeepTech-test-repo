import { useEffect } from 'react';

const SITE_NAME = 'Ember & Oak';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} | Café & Bakery in Millbrook`;
  }, [title]);
}
