import './WelcomePage.scss'
import Button from '../../components/button/Button'
import { useNavigate } from 'react-router-dom'
import LanguageChanger from '../../components/languageChanger/LanguageChanger'
import { useTranslation } from 'react-i18next'

export default function WelcomePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const toStoreClick = () => {
    navigate('/fragrances')
  }

  return (
    <>
      <div className="welcome__page__container">
        <LanguageChanger className="language__changer" />
        <img src="/public/logo.png" className="brand__logo" alt="logo" />
        <h4 className="slogan">{t('slogan')}</h4>
        <Button className="special__page__btn to__search__btn" onClick={toStoreClick}>
          {t('find your fragrance')}
        </Button>
      </div>
    </>
  )
}
