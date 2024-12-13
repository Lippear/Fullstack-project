import Header from '/src/components/header/Header.jsx'
import WelcomePage from './pages/welcomePage/WelcomePage'
import SearchPage from './pages/searchPage/SearchPage'
import Footer from './components/footer/Footer'
import CartModal from './components/cartModal/CartModal'
import { useLocation, Routes, Route, Navigate } from 'react-router-dom'
import './i18n'

function App() {
  const location = useLocation()
  return (
    <>
      <CartModal />
      {location.pathname !== '/welcome' && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="welcome" replace />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      {location.pathname !== '/welcome' && <Footer />}
    </>
  )
}

export default App
