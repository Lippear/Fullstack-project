import logo from '/public/logo.png'
import './Header.scss'
import Button from '/src/components/button/Button.jsx'
import { VscAccount,VscSignIn } from "react-icons/vsc";

export default function Header(props) {
  function handleCategoryChange(category) {
    props.onChangeCategory(category)
  }

  return (
    <header>
      <button className="menu__button">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <img src={logo} className="logo" alt="Logo"></img>
      <div className="navigation">
        <Button
          className={props.selectedCategory === 'All' ? 'active' : 'navigation__button'}
          onClick={() => handleCategoryChange('All')}
        >
          All
        </Button>
        <Button
          className={props.selectedCategory === 'Unisex' ? 'active' : 'navigation__button'}
          onClick={() => handleCategoryChange('Unisex')}
        >
          Unisex
        </Button>
        <Button
          className={props.selectedCategory === 'Woman' ? 'active' : 'navigation__button'}
          onClick={() => handleCategoryChange('Woman')}
        >
          Woman
        </Button>
        <Button
          className={props.selectedCategory === 'Man' ? 'active' : 'navigation__button'}
          onClick={() => handleCategoryChange('Man')}
        >
          Man
        </Button>
      </div>
      <div className="user">
        <Button className='user__button'><VscSignIn className='user__icon'/><strong>Sing in</strong></Button>
      </div>
    </header>
  )
}
