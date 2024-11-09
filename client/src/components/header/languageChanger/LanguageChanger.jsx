import Button from '/src/components/button/Button'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import './LanguageChanger.scss'

export default function LanguageChanger({ className }) {
  const flagOfLanguages = [
    {
      code: 'en',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Flag_of_the_United_Kingdom_%283-2%29.svg',
    },
    {
      code: 'ua',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/800px-Flag_of_Ukraine.svg.png',
    },
  ]

  const {i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
    setCurrentLanguage(language)
  }

  const openChooseSection = () => {}

  const changeUa = () => {
    i18n.changeLanguage('ua')
  }

  return (
    <div className={`${className} language__changer`}>
      <Button className="btn" onClick={()=>changeLanguage('ua')}>
      <img
          src={flagOfLanguages.find((lang) => lang.code === currentLanguage)?.flag} className="flag__icon"
        />
        <strong style={{ color: 'rgb(37, 37, 37)' }}>▼</strong>
      </Button>
   {/*}   <div className="choose__section">
        {flagOfLanguages.map((lang) => (
          <Button className="btn" key={lang.code} >
            <img src={lang.flag} alt={`${lang.code} flag__icon`} />
          </Button>
        ))}
      </div>*/}
    </div>
  )
}
