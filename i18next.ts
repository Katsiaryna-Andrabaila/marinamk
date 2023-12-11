import en from './src/shared/assets/langs/en.json';
import ru from './src/shared/assets/langs/ru.json';
import ar from './src/shared/assets/langs/ar.json';
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
    ar: {
        translation: ar,
    },
  },
  lng: 'en',
  fallbackLng: 'ru',

  interpolation: {
    escapeValue: false,
  },
});