import Button from '/src/components/button/Button'
import { useTranslation } from 'react-i18next'
import { useState, useRef } from 'react'
import { useClickOutside } from '/src/components/hooks/useClickOutside'
import './LanguageChanger.scss'

export default function LanguageChanger() {
  const flagOfLanguages = [
    {
      code: 'en',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Flag_of_the_United_Kingdom_%283-2%29.svg'
    },
    {
      code: 'ua',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/800px-Flag_of_Ukraine.svg.png'
    },
    {
      code: 'de',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg'
    },
    {
      code: 'fr',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg'
    },
    {
      code: 'es',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1200px-Bandera_de_Espa%C3%B1a.svg.png'
    },
    {
      code: 'zh',
      flag: 'https://cdn.britannica.com/90/7490-050-5D33348F/Flag-China.jpg'
    }
  ]

  const { i18n } = useTranslation()

  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

  const [isChooseSectionOpen, setIsChooseSectionOpen] = useState(false)

  const menuRef = useRef(null)

  useClickOutside(menuRef, () => setIsChooseSectionOpen(false))

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
    setCurrentLanguage(language)
    setIsChooseSectionOpen(false)
  }

  return (
    <div className={'language__changer'} ref={menuRef}>
      <Button className="btn" onClick={() => setIsChooseSectionOpen(!isChooseSectionOpen)}>
        <img src={flagOfLanguages.find((lang) => lang.code === currentLanguage)?.flag} className="flag__icon" />
        <strong className={`arrow ${isChooseSectionOpen ? 'rotate' : ''}`}>▼</strong>
      </Button>
      {isChooseSectionOpen && (
        <div className="choose__section">
          {flagOfLanguages.map((language, index) => {
            if (!(language.code === currentLanguage)) {
              return (
                <Button className="btn" onClick={() => changeLanguage(language.code)} key={index}>
                  <img src={language.flag} className="flag__icon" />
                </Button>
              )
            }
          })}
        </div>
      )}
    </div>
  )
}
