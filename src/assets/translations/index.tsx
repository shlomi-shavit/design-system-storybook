import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationsHe from './general/translations-he.json';

export const useTranslations = () => {
  i18n.use( initReactI18next ).init( {
    resources: {
      he: { translation: translationsHe },
    },
    lng: document.documentElement.lang,
    fallbackLng: 'he',
  } );
};
