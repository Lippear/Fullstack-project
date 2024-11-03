import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEn from './locales/en.json'
import translationUa from './locales/ua.json'

const resources = {
  en: {
    translation: translationEn,
  },
  ua: {
    translation: translationUa,
  },
}

const savedLanguage = localStorage.getItem('language') || 'en'

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
