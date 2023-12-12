import 'i18next';
import en from './src/shared/assets/langs/en.json';
import ru from './src/shared/assets/langs/ru.json';
import ar from './src/shared/assets/langs/ar.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof en;
      ru: typeof ru;
      ar: typeof ar;
    };
  }
}