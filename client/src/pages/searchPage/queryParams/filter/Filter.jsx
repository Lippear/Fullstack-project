import Button from '/src/components/button/Button.jsx'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AiOutlineFilter } from 'react-icons/ai'
import './Filter.scss'

export default function Filter() {
  const location = useLocation()
  const [filterParams, setFilterParams] = useState({})
  const [activeFilter, setActiveFilter] = useState({})
  const [isFilterWindowActive, setIsWindowActive] = useState(false)
  const [selectedFilterSection, setSelectedFilterSection] = useState('brands')

  const fetchFilterParams = async () => {
    try {
      const response = await fetch('http://localhost:3500/api/filter')
      if (!response.ok) {
        throw new Error('Ошибка получения параметров фильтра')
      }
      const data = await response.json()
      setFilterParams(data)
    } catch (error) {
      console.error('Ошибка при загрузке параметров фильтра:', error.message)
    }
  }

  useEffect(() => {
    fetchFilterParams()
  }, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const brands = searchParams.get('brand')
    const genders = searchParams.get('gender')
    setActiveFilter({
      brands: brands ? brands.split(',') : [],
      genders: genders ? genders.split(',') : []
    })
  }, [location])

  return (
    <Button className="filter">
      <AiOutlineFilter className="filter__icon" />
      {isFilterWindowActive && !!filterParams && (
        <div className="filter__window">
          <div className="choose__filter">
            <Button className="choose__filter-button" onClick={() => setSelectedFilterSection('brands')}>
              Brands
            </Button>
            <Button className="choose__filter-button" onClick={() => setSelectedFilterSection('genders')}>
              Genders
            </Button>
          </div>
          <div className="params__filter">
            {filterParams[selectedFilterSection]?.map((param, index) => {
              return (
                <label key={index} htmlFor={`checkbox-${index}`}>
                  <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    checked={activeFilter[selectedFilterSection].includes(param)}
                    onChange={() => {
                      if (activeFilter[selectedFilterSection].includes(param)) {
                        setActiveFilter((prev) => ({
                          ...prev,
                          [selectedFilterSection]: prev[selectedFilterSection].filter((item) => item !== param)
                        }))
                      } else {
                        setActiveFilter((prev) => ({
                          ...prev,
                          [selectedFilterSection]: [...prev[selectedFilterSection], param]
                        }))
                      }
                    }}
                  />
                  {param}
                </label>
              )
            })}
          </div>
          <div className="set__filter"></div>
        </div>
      )}
    </Button>
  )
}
