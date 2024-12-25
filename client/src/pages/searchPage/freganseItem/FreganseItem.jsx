import Button from '/src/components/Button/Button.jsx'
import { useTranslation } from 'react-i18next'
import { useState, useRef } from 'react'
import { useClickOutside } from '/src/components/hooks/useClickOutside'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsItemInCart, addItemToCart, openCart } from '../../../redux-toolkit/cart/cartSlise'
import './FreganseItem.scss'

export default function FreganseItem({ perfume }) {
  if (!perfume || !perfume.volumesAndPrices?.length) {
    return <div>{t('no fragrance data available')}</div>
  }

  const [choosenPerfumeIndex, setChoosenPerfumeIndex] = useState(perfume.mainVolumeIndex || 0)
  const [isOpenChooseSection, setIsOpenChooseSection] = useState(false)
  const [isMouseEnteredOnAddBtn, setIsMouseEnteredOnAddBtn] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const refVolumeChanger = useRef(null)
  const isItemInCart = useSelector((state) => selectIsItemInCart(state, perfume.id, choosenPerfumeIndex))

  useClickOutside(refVolumeChanger, () => setIsOpenChooseSection(false))

  return (
    <div className="freganse__item">
      <img src={perfume.photo || '/default-image.jpg'} className="freganse__item__image" alt={perfume.name || t('no name')} />
      <span className="brand">{perfume.brand || t('no brand')}</span>
      <span className="name">{perfume.name || t('no name')}</span>

      {/* Section for volume changer */}
      <div className="volume__changer" ref={refVolumeChanger} onMouseLeave={() => setIsOpenChooseSection(false)}>
        <Button className="volume__btn items__btn" onClick={() => setIsOpenChooseSection(!isOpenChooseSection)}>
          <span className="volume__info">
            {perfume.volumesAndPrices[choosenPerfumeIndex]?.volume || t('no data')} {t('ml')}
          </span>
          {perfume.volumesAndPrices.length > 1 && <span className={`choose__icon arrow ${isOpenChooseSection ? 'rotate' : ''}`}>▼</span>}
        </Button>

        {isOpenChooseSection && perfume.volumesAndPrices.length > 1 && (
          <div className="choose__volume__section">
            {perfume.volumesAndPrices.map((volume, index) => {
              if (index !== choosenPerfumeIndex) {
                return (
                  <Button
                    className="volume__btn items__btn"
                    onClick={() => {
                      setIsOpenChooseSection(false)
                      setChoosenPerfumeIndex(index)
                    }}
                    key={index}
                  >
                    <span className="volume__info">
                      {volume.volume} {t('ml')}
                    </span>
                  </Button>
                )
              }
            })}
          </div>
        )}
      </div>
      {!isOpenChooseSection && (
        <div className="price__addBtn__container">
          <span className="price">
            {perfume.volumesAndPrices[choosenPerfumeIndex]?.price !== undefined
              ? `${perfume.volumesAndPrices[choosenPerfumeIndex].price} $`
              : t('no price')}
          </span>
          <Button
            className="addBtn items__btn"
            onMouseEnter={() => setIsMouseEnteredOnAddBtn(true)}
            onMouseLeave={() => setIsMouseEnteredOnAddBtn(false)}
            onClick={
              !isItemInCart
                ? () =>
                    dispatch(
                      addItemToCart({
                        item: perfume,
                        choosenItemIndex: choosenPerfumeIndex
                      })
                    )
                : () => dispatch(openCart())
            }
          >
            {!isItemInCart ? t('add to cart') : isMouseEnteredOnAddBtn ? t('open cart') : t('added') + ' ✔'}
          </Button>
        </div>
      )}
    </div>
  )
}
