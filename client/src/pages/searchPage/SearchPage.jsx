import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '/src/components/button/Button'
import Search from './queryParams/Search.jsx'
import FreganseItem from './freganseItem/FreganseItem.jsx'
import './SearchPage.scss'

export default function SearchPage() {
  const [freagnses, setFreganses] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(null)
  const [sequenceOfPageSwitchingButtons, setSequenceOfPageSwitchingButtons] = useState([])

  const switchPage = (switchedPageNumber) => {
    const duration = 500
    const start = window.scrollY
    const startTime = performance.now()

    const scrollToTop = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = progress * (2 - progress)
      window.scrollTo(0, start * (1 - ease))

      if (progress < 1) {
        requestAnimationFrame(scrollToTop)
      } else {
        setTimeout(() => {
          const params = new URLSearchParams(location.search)
          params.set('page', switchedPageNumber)
          navigate(`/fragrances?${params.toString()}`)
        }, 100)
      }
    }

    requestAnimationFrame(scrollToTop)
  }

  const makeASequenceOfPageSwitchingButtons = (countOfPages, activePage) => {
    if (countOfPages <= 11) {
      let mas = []
      for (let i = 1; i <= countOfPages; i++) {
        mas.push(i)
      }
      setSequenceOfPageSwitchingButtons(mas)
    } else if (activePage <= 6) {
      setSequenceOfPageSwitchingButtons([1, 2, 3, 4, 5, 6, 7, 8, 9, '...', countOfPages - 1, countOfPages])
    } else if (countOfPages - activePage <= 6) {
      setSequenceOfPageSwitchingButtons([
        1,
        2,
        '...',
        countOfPages - 8,
        countOfPages - 7,
        countOfPages - 6,
        countOfPages - 5,
        countOfPages - 4,
        countOfPages - 3,
        countOfPages - 2,
        countOfPages - 1,
        countOfPages
      ])
    } else {
      setSequenceOfPageSwitchingButtons([
        1,
        2,
        '...',
        activePage - 3,
        activePage - 2,
        activePage - 1,
        activePage,
        activePage + 1,
        activePage + 2,
        activePage + 3,
        '...',
        countOfPages - 1,
        countOfPages
      ])
    }
  }

  console.log(sequenceOfPageSwitchingButtons)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    setPageNumber(Number(searchParams.get('page')))
    makeASequenceOfPageSwitchingButtons(26, Number(searchParams.get('page')))

    fetch(`http://localhost:3500/api/fragrances?`)
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
  }, [location])

  return (
    <>
      <div className="search__page">
        <div className="product__page">
          <Search />
          <div
            className="freganses__container"
            onClick={() => {
              console.log(pageNumber + 1)
            }}
          >
            {freagnses.map((perfume, index) => (
              <FreganseItem className="fregance__button" perfume={perfume} key={index}></FreganseItem>
            ))}
          </div>
          <div className="select__pageNumber__section">
            <div className="switch__page__number__btns__container">
              {sequenceOfPageSwitchingButtons.map((designation, index) => {
                if (designation === '...') {
                  return (
                    <span className="switch__page__text" key={index}>
                      ...
                    </span>
                  )
                } else {
                  return (
                    <Button
                      className={`${designation ===pageNumber?'active_page__number__btn':'switch__page__number__btn' } ${designation > 9 && designation < 100 && 'padding__right'}`}
                      onClick={() => switchPage(designation)}
                      key={index}
                    >
                      {designation}
                    </Button>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
