import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const fallbackLng = 'en'
const availableLanguages = ['en', 'np']
const resources = {
    en: {
        translations: require('./locales/en/translations.json')
    },
    np: {
        translations: require('./locales/np/translations.json')
    }
}

//   .use(LanguageDetector) // detect user language
i18n
    .use(initReactI18next)
    .init({
        fallbackLng,
        resources,
        detection: {
            checkWhitelist: true,
        },
        debug: false,
        whitelist: availableLanguages,
        interpolation: {
            escapeValue: false,
        },
        ns: ['translations'],
        defaultNS: 'translations'
    });


i18n.languages = ['en', 'np'];

export default i18n;