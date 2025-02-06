import Button from '/src/components/button/Button.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { AiOutlineFilter } from 'react-icons/ai'
import { useClickOutside } from '/src/components/hooks/useClickOutside'
import './Filter.scss'
import { useTranslation } from 'react-i18next'

export default function Filter() {
  const [filterParams, setFilterParams] = useState({})
  const [activeFilter, setActiveFilter] = useState({})
  const [isFilterWindowActive, setIsWindowActive] = useState(false)
  const [selectedFilterSection, setSelectedFilterSection] = useState('')
  const filterRef = useRef(null)

  const location = useLocation()
  const navigate = useNavigate()

  const { t } = useTranslation()

  useClickOutside(filterRef, () => setIsWindowActive(false))

  const fetchFilterParams = async () => {
    try {
      const response = await fetch('http://localhost:3500/api/filter')
      if (!response.ok) {
        throw new Error('Ошибка получения параметров фильтра')
      }
      const data = await response.json()
      setFilterParams(data)
      setSelectedFilterSection(Object.keys(data)[0])
    } catch (error) {
      console.error('Ошибка при загрузке параметров фильтра:', error.message)
    }
  }

  useEffect(() => {
    fetchFilterParams()
  }, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const brands = searchParams.get('brands')
    const genders = searchParams.get('genders')
    setActiveFilter({
      brands: brands ? brands.split(',') : [],
      genders: genders ? genders.split(',') : []
    })
  }, [location])

  const setParamsURL = () => {
    const searchParams = new URLSearchParams(location.search)
    Object.entries(activeFilter).forEach(([category, params]) => {
      if (params.length > 0) {
        searchParams.set(category, params.join(','))
      } else {
        searchParams.delete(category)
      }
    })
    searchParams.set('page', '1')
    setIsWindowActive(false)
    setSelectedFilterSection(Object.keys(filterParams)[0])
    navigate(`${location.pathname}?${searchParams.toString()}`)
  }

  return (
    <div className="filter" ref={filterRef}>
      <Button className="filter__btn" onClick={() => setIsWindowActive((prev) => !prev)}>
        <AiOutlineFilter className="filter__icon" />
      </Button>
      {isFilterWindowActive && !!filterParams && (
        <div className="filter__window">
          <div className="choose__filter">
            {Object.keys(filterParams).map((param, index) => (
              <Button
                key={index}
                className={`choose__filter__btn ${param === selectedFilterSection ? 'active__filter__param' : 'inactive__filter__param'}`}
                onClick={() => setSelectedFilterSection(param)}
              >
                {t(param).toUpperCase()}
              </Button>
            ))}
          </div>
          <div className="params__filter">
            {filterParams[selectedFilterSection].map((param, index) => {
              return (
                <label key={index} htmlFor={`checkbox-${index}`}>
                  <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    checked={activeFilter[selectedFilterSection].map((item) => item.toLowerCase()).includes(param.toLowerCase())}
                    onChange={() => {
                      if (activeFilter[selectedFilterSection].map((item) => item.toLowerCase()).includes(param.toLowerCase())) {
                        setActiveFilter((prev) => ({
                          ...prev,
                          [selectedFilterSection]: prev[selectedFilterSection].filter((item) => item.toLowerCase() !== param.toLowerCase())
                        }))
                      } else {
                        setActiveFilter((prev) => ({
                          ...prev,
                          [selectedFilterSection]: [...prev[selectedFilterSection], param]
                        }))
                      }
                    }}
                  />
                  {selectedFilterSection === 'genders' ? t(param) : param}
                </label>
              )
            })}
          </div>
          <Button className="set__filter__btn" onClick={() => setParamsURL()}>
            {t('set filters').toUpperCase()}
          </Button>
        </div>
      )}
    </div>
  )
}
