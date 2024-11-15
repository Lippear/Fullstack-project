import Header from '/src/components/header/Header.jsx'
import MainPage from './components/main/MainPage'
import Footer from './components/footer/Footer'
import CartModal from './components/cartModal/CartModal'
import './i18n'

function App() {
  return (
    <>
      <CartModal/>
      <Header />
      <MainPage/>
      <Footer></Footer>
    </>
  )
}

export default App
