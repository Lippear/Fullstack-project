import { useState } from 'react'
import Button from '/src/components/button/Button.jsx'
import { VscSearch } from 'react-icons/vsc'
import './Search.scss'
import { AiOutlineFilter } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'

export default function Search({ setFreganses }) {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isFocused, setIsFocused] = useState(false)
  const searchLimit = 4

  const { t } = useTranslation()

  function handleInputChange(event) {
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

  function handleSearch() {
    console.log('выполнен поиск')
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && query.trim()) {
      setFreganses(searchResults)  // Устанавливаем результаты в setFreganses
      setSearchResults([]) // Очищаем подсказки
    }
  }

  return (
    <section className="search__section">
      <div className="search__container">
        <Button className="filter">
          <AiOutlineFilter className="filter__icon" />
        </Button>
        <div className="input__section child">
          <div className="search__icon" onClick={handleSearch}>
            <VscSearch />
          </div>
          <input
            type="text"
            id="textInput"
            name="textInput"
            placeholder={`${t('search')}...`}
            className="input__line"
            value={query}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress} // Обработчик для Enter
          />
        </div>
        {isFocused && searchResults.length > 0 && (
          <div className="hint__section hint__border">
            {searchResults.map((result, index) => (
              <div className="hint child" key={index}>
                <img src={result.photo} alt={result.name} className="image__hint" />
                <span className="brand__hint">{result.brand}</span>
                <span className="name__hint">{result.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
