import logo from '/public/logo.png'
import './Header.scss'
import Button from '/src/components/button/Button.jsx'
import { VscAccount, VscSignIn } from 'react-icons/vsc'
import { IoCartOutline } from 'react-icons/io5'
import LanguageChanger from './languageChanger/LanguageChanger.jsx'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const {t} = useTranslation()


  return (
    <header>
      <div className="left__menu">
        <button className="menu__button">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <img src={logo} className="logo" alt="Logo"></img>
      </div>
      <div className="right__menu">
        <Button className="functional__button cart">
          <IoCartOutline className="icon" />
        </Button>
        <LanguageChanger className="functional__button"/>
        <div className="line" />
        <Button className="account__button">
          <VscAccount className="icon" />
          <strong>{t('sign in')}</strong>
        </Button>
      </div>
    </header>
  )
}
