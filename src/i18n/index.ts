import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const lang = typeof window !== 'undefined' ? localStorage.getItem('lang') || 'en' : 'en';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: lang,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
