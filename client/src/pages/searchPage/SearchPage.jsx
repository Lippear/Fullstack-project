import './SearchPage.scss'
import Search from './search/Search.jsx'
import { useState, useEffect } from 'react'
import FreganseItem from './freganseItem/FreganseItem.jsx'

export default function SearchPage() {
  const [freagnses, setFreganses] = useState([])
  const [querySearch, setQuerySearch]=useState('')

  useEffect(() => {
    const query = `?${querySearch.length>0&&`search=${querySearch}`}`
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
    <>
      <div className="search__page">
        <div className="product__page">
          <Search setFreganses={setFreganses} />
          <div className="freganses__container">
            {freagnses.map((perfume, index) => (
              <FreganseItem className="fregance__button" perfume={perfume} key={index}></FreganseItem>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
