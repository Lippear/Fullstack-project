import logo from '/public/logo.png'
import Button from '/src/components/button/Button.jsx'
import { VscAccount } from 'react-icons/vsc'
import { IoCartOutline } from 'react-icons/io5'
import LanguageChanger from '../../components/languageChanger/LanguageChanger.jsx'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { openCart, selectUniqueItemsCount } from '../../redux-toolkit/cart/cartSlise.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Header.scss'

export default function Header() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const itemCountInCart = useSelector(selectUniqueItemsCount)
  const navigate = useNavigate()

  const handleOpenCart = () => {
    dispatch(openCart())
  }

  return (
    <header>
      <div className="left__menu">
        <button className="menu__button">
          <span></span>
          <span></span>
          <span></span>
        </button>{' '}
        <button onClick={()=>{navigate('welcome')}}>
          <img src={logo} className="logo" alt="Logo" />
        </button>
      </div>
      <div className="right__menu">
        <Button className="functional__button cart" onClick={handleOpenCart}>
          <IoCartOutline className="icon" />
          {itemCountInCart > 0 && <strong className="count__added__items">{itemCountInCart > 9 ? '9+' : itemCountInCart}</strong>}
        </Button>
        <LanguageChanger />
        <div className="line" />
        <Button className="account__button">
          <VscAccount className="icon" />
          <strong>{t('sign in')}</strong>
        </Button>
      </div>
    </header>
  )
}
