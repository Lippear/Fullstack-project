import Button from '/src/components/Button/Button.jsx'
import { useTranslation } from 'react-i18next'
import { useState, useRef } from 'react'
import { useClickOutside } from '/src/components/hooks/useClickOutside'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsItemInCart, addItemToCart, openCart } from '../../../redux-toolkit/cart/cartSlise'
import './FreganseItem.scss'

export default function FreganseItem({fragrance }) {
  if (!fragrance || !fragrance.volumesAndPrices?.length) {
    return <div>{t('no fragrance data available')}</div>
  }

  const [choosenPerfumeIndex, setChoosenPerfumeIndex] = useState(fragrance.mainVolumeIndex)
  const [isOpenChooseSection, setIsOpenChooseSection] = useState(false)
  const [isMouseEnteredOnAddBtn, setIsMouseEnteredOnAddBtn] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const refVolumeChanger = useRef(null)
  const isItemInCart = useSelector((state) => selectIsItemInCart(state, fragrance._id, choosenPerfumeIndex))

  useClickOutside(refVolumeChanger, () => setIsOpenChooseSection(false))

  return (
    <div className="freganse__item">
      <img src={fragrance.photo || '/default-image.jpg'} className="freganse__item__image" alt={fragrance.name || t('no name')} />
      <span className="brand">{fragrance.brand || t('no brand')}</span>
      <span className="name">{fragrance.name || t('no name')}</span>

      {/* Section for volume changer */}
      <div className="volume__changer" ref={refVolumeChanger} onMouseLeave={() => setIsOpenChooseSection(false)}>
        <Button className="volume__btn items__btn" onClick={() => setIsOpenChooseSection(!isOpenChooseSection)}>
          <span className="volume__info">
            {fragrance.volumesAndPrices[choosenPerfumeIndex]?.volume || t('no data')} {t('ml')}
          </span>
          {fragrance.volumesAndPrices.length > 1 && <span className={`choose__icon arrow ${isOpenChooseSection ? 'rotate' : ''}`}>▼</span>}
        </Button>

        {isOpenChooseSection && fragrance.volumesAndPrices.length > 1 && (
          <div className="choose__volume__section">
            {fragrance.volumesAndPrices.map((volume, index) => {
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
            {fragrance.volumesAndPrices[choosenPerfumeIndex]?.price !== undefined
              ? `${fragrance.volumesAndPrices[choosenPerfumeIndex].price} $`
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
                        item: fragrance,
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
