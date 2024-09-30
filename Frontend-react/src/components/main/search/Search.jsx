import { useState } from 'react'
import Button from '/src/components/button/Button.jsx'
import { VscSearch } from 'react-icons/vsc'
import './Search.scss'

export default function Search() {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const searchLimit = 4

  function handleInputChange(event) {
    const value = event.target.value
    setQuery(value)

    if (value.trim()) {
      fetch(`http://localhost:3500/api/fragrances?search=${value}`) // Используем текущее значение `value`
        .then((response) => {
          if (!response.ok) {
            throw new Error('случилась ошибка')
          } else {
            return response.json()
          }
        })
        .then((data) => {
          setSearchResults(data.perfumes) // Получаем массив `perfumes` из объекта
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

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section className="search__section">
      <div className="search__container">
        <div className="input__section child">
          <Button className="search__button" onClick={handleSearch}>
            <VscSearch />
          </Button>
          <input
            type="text"
            id="textInput"
            name="textInput"
            placeholder="Search..."
            className="input__line"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        {searchResults.length > 0 && (
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
