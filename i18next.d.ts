import 'i18next';
import en from './src/shared/langs/en.json';
import ru from './src/shared/langs/ru.json';
import ar from './src/shared/langs/ar.json';

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
