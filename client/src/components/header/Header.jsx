import logo from '/public/logo.png'
import './Header.scss'
import Button from '/src/components/button/Button.jsx'
import { VscAccount, VscSignIn } from 'react-icons/vsc'
import { IoCartOutline } from 'react-icons/io5'
import LanguageChanger from './languageChanger/LanguageChanger.jsx'

export default function Header() {
  const greatBritanFlag = 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Flag_of_the_United_Kingdom_%283-2%29.svg'
  const ukrainianFlag='https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/800px-Flag_of_Ukraine.svg.png'

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
        <Button className="right__menu__button functional__button">
          <IoCartOutline className="icon" />
        </Button>
        <Button className="right__menu__button functional__button">
          <img src={greatBritanFlag} alt="Flag of the United Kingdom" className="icon" />
          <strong style={{ color: 'rgb(37, 37, 37)' }}>▼</strong>
        </Button>
        <div className="line" />
        <Button className="account__button right__menu__button">
          <VscAccount className="icon" />
          <strong>Sing in</strong>
        </Button>
      </div>
    </header>
  )
}
