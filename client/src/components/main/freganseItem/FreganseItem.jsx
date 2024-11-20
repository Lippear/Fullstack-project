import Button from '/src/components/Button/Button.jsx'
import { useTranslation } from 'react-i18next'
import { useState, useRef } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsItemInCart, addItemToCart, openCart } from '../../../redux-toolkit/cart/cartSlise'
import './FreganseItem.scss'

export default function FreganseItem({ perfume }) {
  const [choosenPerfumeIndex, setChoosenPerfumeIndex] = useState(perfume.mainVolumeIndex)
  const [isOpenChooseSection, setIsOpenChooseSection] = useState(false)
  const [isMouseEnteredOnAddBtn, setisMouseEnteredOnAddBtn] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const refVolumeChanger = useRef(null)
  const isItemInCart = useSelector((state) => selectIsItemInCart(state, perfume.id, choosenPerfumeIndex))

  useClickOutside(refVolumeChanger, () => setIsOpenChooseSection(false))

  return (
    <div className="freganse__item">
      <div className="freganse__info">
        <img src={perfume.photo} className="freganse__item__image" alt={perfume.name} />
        <span className="brand">{perfume.brand}</span>
        <span className="name">{perfume.name}</span>
        <div className="volume__changer" ref={refVolumeChanger} onMouseLeave={() => setIsOpenChooseSection(false)}>
          <Button className="volume__btn items__btn" onClick={() => setIsOpenChooseSection(!isOpenChooseSection)}>
            <span className="volume__info">
              {perfume.volumesAndPrices[choosenPerfumeIndex].volume} {t('ml')}
            </span>
            {perfume.volumesAndPrices.length > 1 && <span className={`choose__icon arrow ${isOpenChooseSection ? 'rotate' : ''}`}>▼</span>}
          </Button>
          {isOpenChooseSection && perfume.volumesAndPrices.length > 1 && (
            <div className="choose__volume__section">
              {perfume.volumesAndPrices.map((volume, index) => {
                if (!(index === choosenPerfumeIndex)) {
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
            <span className="price">{perfume.volumesAndPrices[choosenPerfumeIndex].price} $</span>
            <Button
              className="addBtn items__btn"
              onMouseEnter={() => setisMouseEnteredOnAddBtn(true)}
              onMouseLeave={() => setisMouseEnteredOnAddBtn(false)}
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
    </div>
  )
}
