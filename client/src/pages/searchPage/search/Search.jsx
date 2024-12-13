import { useState, useRef } from 'react'
import Button from '/src/components/button/Button.jsx'
import { VscSearch } from 'react-icons/vsc'
import './Search.scss'
import { AiOutlineFilter } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'
import { useClickOutside } from '/src/components/hooks/useClickOutside'

export default function Search({ setFreganses }) {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isInputSectiionActive, setIsInputSectionActive] = useState(false)
  const [indexOfSelectedHint, setIndexOfSelectedHint] = useState(0)
  const inputSectionRef = useRef(null)
  const inputRef = useRef(null)
  let hintCount = searchResults.length

  const { t } = useTranslation()

  useClickOutside(inputSectionRef, () => {
    setQuery(inputRef.current.value)
    fetchSearchResults(inputRef.current.value, false)
    setIndexOfSelectedHint(0)
    setIsInputSectionActive(false)
  })

  const fetchSearchResults = (value, isSetToMain) => {
    if (value.trim()) {
      fetch(`http://localhost:3500/api/fragrances?search=${value}`)
        .then((response) => {
          if (!response.ok) throw new Error('Error')
          else return response.json()
        })
        .then((data) => {
          setSearchResults(data.perfumes)
          if (isSetToMain) {
            setFreganses(data.perfumes)
          }
        })
        .catch((error) => console.error(error))
    } else setSearchResults([])
  }

  const handleKeyPress = (event) => {
    const { key } = event
    if (key === 'ArrowDown') {
      if (hintCount === indexOfSelectedHint) setIndexOfSelectedHint(0)
      else setIndexOfSelectedHint((prev) => prev + 1)
    } else if (key === 'ArrowUp') {
      event.preventDefault()
      if (indexOfSelectedHint === 0) setIndexOfSelectedHint(hintCount)
      else setIndexOfSelectedHint((prev) => prev - 1)
    } else if (key === 'Enter' && query.trim()) {
      if (searchResults.length > 0 && indexOfSelectedHint === 0) {
        setFreganses(searchResults)
      }
      if (indexOfSelectedHint > 0) {
        setIndexOfSelectedHint(0)
        setQuery(event.target.value)
        fetchSearchResults(event.target.value, true)
      }
      setIsInputSectionActive(false)
      const childElements = inputSectionRef.current.querySelectorAll('input,button')
      childElements.forEach((element) => {
        element.blur()
      })
    }
  }

  const handleInput = (event) => {
    setIndexOfSelectedHint(0)
    setQuery(event.target.value)
    fetchSearchResults(event.target.value, false)
  }

  const clearInputLine = () => {
    setIndexOfSelectedHint(0)
    setQuery('')
    fetchSearchResults('', false)
    inputRef.current.focus()
  }

  return (
    <section className="search__section">
      <div className="search__container">
        <Button className="filter">
          <AiOutlineFilter className="filter__icon" />
        </Button>
        <div className="input__section" ref={inputSectionRef}>
          <VscSearch className="search__icon" />
          <input
            type="text"
            id="textInput"
            name="textInput"
            placeholder={`${t('search')}...`}
            className={`input__line ${isInputSectiionActive && 'imput__section__active'}`}
            onFocus={() => setIsInputSectionActive(true)}
            onKeyDown={handleKeyPress}
            onInput={handleInput}
            value={
              indexOfSelectedHint === 0 ? query : `${searchResults[indexOfSelectedHint - 1].brand} ${searchResults[indexOfSelectedHint - 1].name}`
            }
            autoComplete="off"
            ref={inputRef}
          />
          {isInputSectiionActive && query.trim().length > 0 && (
            <Button className="clear__btn special__page__btn" onClick={clearInputLine}>
              ✖
            </Button>
          )}
          {isInputSectiionActive && (
            <ul className="hint__section">
              {!query.trim() && (
                <li className="hint">
                  <VscSearch className="search__icon" /> <p>{t('enter your search query')}</p>
                </li>
              )}
              {searchResults.length === 0 && query.trim() && (
                <li className="hint">
                  <VscSearch className="search__icon" />
                  <p>
                    {t('on request')} " <strong>{query}</strong> " {t('nothing found')}
                  </p>
                </li>
              )}
              {searchResults.map((result, index) => {
                return (
                  <li key={index}>
                    <Button className={`hint__button ${index + 1 === indexOfSelectedHint && 'selected__hint'}`}>
                      {index + 1 === indexOfSelectedHint && <div className="selected__hint__line"></div>}
                      <VscSearch className="search__icon" />
                      <span className="brand__hint">{result.brand}</span>
                      <span className="name__hint">{result.name}</span>
                    </Button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
