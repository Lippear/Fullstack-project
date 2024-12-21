import { useState, useRef } from 'react'
import Button from '/src/components/button/Button.jsx'
import { VscSearch } from 'react-icons/vsc'
import './Search.scss'
import { AiOutlineFilter } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'
import { useClickOutside } from '/src/components/hooks/useClickOutside'
import { useNavigate } from 'react-router-dom'

export default function Search() {
  const [querySearchInput, setQuerySearchInput] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isInputSectionActive, setIsInputSectionActive] = useState(false)
  const [indexOfSelectedHint, setIndexOfSelectedHint] = useState(0)
  const inputSectionRef = useRef(null)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  let hintCount = searchResults.length
  // http://localhost:5173/fragrances?search=Dior%20Sauvage

  const { t } = useTranslation()

  useClickOutside(inputSectionRef, () => {
    setQuerySearchInput(inputRef.current.value)
    fetchSearchResults(inputRef.current.value, false)
    setIndexOfSelectedHint(0)
    setIsInputSectionActive(false)
  })

  const navigateWitchQuery = (searchQueryInput) => {
    navigate(`/fragrances?search=${encodeURIComponent(searchQueryInput)}`)
  }

  const fetchSearchResults = (value) => {
    if (value.trim()) {
      fetch(`http://localhost:3500/api/searchQuery?search=${value}`)
        .then((response) => {
          if (!response.ok) throw new Error('Error')
          else return response.json()
        })
        .then((data) => {
          setSearchResults(data.searchResults)
        })
        .catch((error) => console.error(error))
    } else setSearchResults([])
  }

  const makeQuery = (searchForQuery) => {
    setIndexOfSelectedHint(0)
    setQuerySearchInput(searchForQuery)
    fetchSearchResults(searchForQuery)
    setIsInputSectionActive(false)
    navigateWitchQuery(searchForQuery)
  }

  const handleKeyPress = (event) => {
    const { key } = event
    if (key === 'ArrowDown') {
      if (hintCount === indexOfSelectedHint) {
        setIndexOfSelectedHint(0)
      } else {
        setIndexOfSelectedHint((prev) => prev + 1)
      }
    } else if (key === 'ArrowUp') {
      event.preventDefault()
      if (indexOfSelectedHint === 0) {
        setIndexOfSelectedHint(hintCount)
      } else {
        setIndexOfSelectedHint((prev) => prev - 1)
      }
    } else if (key === 'Enter' && querySearchInput.trim()) {
      makeQuery(event.target.value)
    }
  }

  const handleInput = (event) => {
    setIndexOfSelectedHint(0)
    setQuerySearchInput(event.target.value)
    fetchSearchResults(event.target.value)
  }

  const clearInputLine = () => {
    setIndexOfSelectedHint(0)
    setQuerySearchInput('')
    fetchSearchResults('')
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
            className={`input__line ${isInputSectionActive && 'imput__section__active'}`}
            onFocus={() => setIsInputSectionActive(true)}
            onKeyDown={handleKeyPress}
            onInput={handleInput}
            value={indexOfSelectedHint === 0 ? querySearchInput : `${searchResults[indexOfSelectedHint - 1]}`}
            autoComplete="off"
            ref={inputRef}
          />
          {isInputSectionActive && querySearchInput.length > 0 && (
            <Button className="clear__btn special__page__btn" onClick={clearInputLine}>
              ✖
            </Button>
          )}
          {isInputSectionActive && (
            <ul className="hint__section">
              {!querySearchInput.trim() && (
                <li className="hint">
                  <VscSearch className="search__icon" /> <p>{t('enter your search query')}</p>
                </li>
              )}
              {searchResults.length === 0 && querySearchInput.trim() && (
                <li className="hint">
                  <VscSearch className="search__icon" />
                  <p>
                    {t('on request')} " <strong>{querySearchInput}</strong> " {t('nothing found')}
                  </p>
                </li>
              )}
              {searchResults.map((searchResult, index) => {
                return (
                  <li key={index}>
                    <Button
                      className={`hint__button ${index + 1 === indexOfSelectedHint && 'selected__hint'}`}
                      onClick={() => {
                        console.log(searchResult)
                        makeQuery(searchResult)
                      }}
                    >
                      {index + 1 === indexOfSelectedHint && <div className="selected__hint__line"></div>}
                      <VscSearch className="search__icon" />
                      <span>{searchResult}</span>
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
