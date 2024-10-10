// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome",
      "choose_language": "Choose a language",
    }
  },
  fr: {
    translation: {
      "welcome": "Bienvenue",
      "choose_language": "Choisissez une langue",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // Langue par défaut
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;