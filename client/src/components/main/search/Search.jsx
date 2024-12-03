import { useState, useRef } from 'react'
import Button from '/src/components/button/Button.jsx'
import { VscSearch } from 'react-icons/vsc'
import './Search.scss'
import { AiOutlineFilter } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'
import { useClickOutside } from '../../hooks/useClickOutside'

export default function Search({ setFreganses }) {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isImputSectiionActive, setIsImputSectionActive] = useState(false)
  const [indexOfSelectedHintChild, setIndexSelectedHintChild] = useState(0)
  const searchLimit = 4
  const imputSectionRef = useRef(null)

  const { t } = useTranslation()
  useClickOutside(imputSectionRef, () => setIsImputSectionActive(false))

  const handleInputChange = (event) => {
    const value = event.target.value
    setQuery(value)

    if (value.trim()) {
      fetch(`http://localhost:3500/api/fragrances?search=${value}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('случилась ошибка')
          } else {
            return response.json()
          }
        })
        .then((data) => {
          setSearchResults(data.perfumes)
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      setSearchResults([])
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && query.trim()) {
      setFreganses(searchResults)
      setSearchResults([])
    }
  }

  return (
    <section className="search__section">
      <div className="search__container">
        <Button className="filter">
          <AiOutlineFilter className="filter__icon" />
        </Button>
        <div className="input__section" ref={imputSectionRef}>
          <VscSearch className="search__icon" />
          <input
            type="text"
            id="textInput"
            name="textInput"
            placeholder={`${t('search')}...`}
            className="input__line"
            value={query}
            onFocus={() => setIsImputSectionActive(true)}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            autoComplete="off"
          />
          {isImputSectiionActive && searchResults.length > 0 && (
            <ul className="hint__section">
              <li className="hint"> 
                <VscSearch className="search__icon"/>
                <strong>{query}</strong>
              </li>
              {searchResults.map((result, index) => (
                <li className="hint" key={index}>
                  <VscSearch className="search__icon" />
                  <span className="brand__hint">{result.brand}</span>
                  <span className="name__hint">{result.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
