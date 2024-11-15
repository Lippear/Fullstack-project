import Button from '/src/components/Button/Button.jsx'
import { useTranslation } from 'react-i18next'
import { useState, useRef } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import './FreganseItem.scss'

export default function FreganseItem({ perfume }) {
  const [choosenPerfumeIndex, setChoosenPerfumeIndex] = useState(perfume.mainVolumeIndex - 1)
  const [isOpenChooseSection, setIsOpenChooseSection] = useState(false)
  const { t } = useTranslation()
  const refChooseSection = useRef(null)

  useClickOutside(refChooseSection,()=>setIsOpenChooseSection(false))

  return (
    <div className="freganse__item">
      <div className="freganse__info">
        <img src={perfume.photo} className="freganse__item__image" alt={perfume.name} />
        <span className="brand">{perfume.brand}</span>
        <span className="name">{perfume.name}</span>
        <div className="select__volume_section">
          <Button className="volume__btn" onClick={()=>setIsOpenChooseSection(true)}>
            <span className="volume__info"> {perfume.volumesAndPrices[choosenPerfumeIndex].volume}</span>
            {perfume.volumesAndPrices.length > 1 && <span className="choose__icon">▼</span>}
          </Button>
          {isOpenChooseSection&&perfume.volumesAndPrices.length>1}
        </div>
        <div className="price__addBtn__container">
          <span className="price">{perfume.volumesAndPrices[choosenPerfumeIndex].price} $</span>
          <Button className="addBtn">{t('add to cart')}</Button>
        </div>
      </div>
    </div>
  )
}
