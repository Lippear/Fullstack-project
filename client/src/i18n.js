import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEn from './locales/en.json'
import translationUa from './locales/ua.json'
import translationDe from './locales/de.json'
import translationFr from './locales/fr.json'
import translationEs from './locales/es.json'
import translationZh from './locales/zh.json'

const resources = {
  en: {
    translation: translationEn
  },
  ua: {
    translation: translationUa
  },
  de: {
    translation: translationDe
  },
  fr: {
    translation: translationFr
  },
  es: {
    translation: translationEs
  },
  zh: {
    translation: translationZh
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
