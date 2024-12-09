import './MainPage.scss'
import Search from './search/Search'
import { useState, useEffect } from 'react'
import FreganseItem from './freganseItem/FreganseItem.jsx'

export default function MainPage() {
  const [freagnses, setFreganses] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3500/api/fragrances`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Search error')
        } else {
          return response.json()
        }
      })
      .then((data) => {
        setFreganses(data.perfumes)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <section className="main__page">
      <div className="product__page">
        <Search setFreganses={setFreganses} />
        <div className="freganses__container">
          {freagnses.map((perfume, index) => (
            <FreganseItem className="fregance__button" perfume={perfume} key={index}></FreganseItem>
          ))}
        </div>
      </div>
    </section>
  )
}
