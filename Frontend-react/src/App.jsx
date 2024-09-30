import { useState } from 'react'
import Header from '/src/components/header/Header.jsx'
import MainPage from './components/main/MainPage'
import Footer from './components/footer/Footer'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  return (
    <>
      <Header selectedCategory={selectedCategory} onChangeCategory={setSelectedCategory} />
      <MainPage/>
      <Footer></Footer>
    </>
  )
}

export default App
