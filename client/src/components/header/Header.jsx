import logo from '/public/logo.png'
import Button from '/src/components/button/Button.jsx'
import { VscAccount } from 'react-icons/vsc'
import { IoCartOutline } from 'react-icons/io5'
import LanguageChanger from './languageChanger/LanguageChanger.jsx'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { openCart } from '../../redux-toolkit/cart/cartSlise.js'
import './Header.scss'

export default function Header() {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const handleOpenCart=()=>{
    dispatch(openCart())
  }

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
        <Button className="functional__button cart" onClick={handleOpenCart}>
          <IoCartOutline className="icon" />
        </Button>
        <LanguageChanger/>
        <div className="line" />
        <Button className="account__button">
          <VscAccount className="icon" />
          <strong>{t('sign in')}</strong>
        </Button>
      </div>
    </header>
  )
}
