import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { removeItemFromCart, setItemCount } from '../../../redux-toolkit/cart/cartSlise'
import { useTranslation } from 'react-i18next'
import { FaTrash } from 'react-icons/fa'
import Button from '../.././button/Button.jsx'
import './CartItem.scss'

export default function CartItem({ item, itemId, volumeId }) {
  const { brand, name, photo, volumesAndPrices, addedVolumes } = item
  const { volume, price } = volumesAndPrices[volumeId]
  const { count } = addedVolumes[volumeId]
  const dispatch = useDispatch()
  const [value, setValue] = useState(count)
  const inputRef = useRef(null)
  const { t } = useTranslation()

  const totalPrice = () => {
    if (!(value === '')) {
      const itemPrice = parseInt(price)
      const itemCount = parseInt(value)
      return `${t('total')} : ${itemPrice * itemCount}$`
    } else return ''
  }
  const handleChange = (event) => {
    let inputValue = event.target.value
    if (inputValue === '0' && event.target.selectionStart === 1) {
      event.target.value = ''
      return
    }
    if (inputValue.startsWith('0') && inputValue.length > 1) {
      event.target.value = ''
      return
    }
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2)
    }
    if (/^(-?[1-9]\d*|0)?$/.test(inputValue)) {
      if (!(inputValue === '')) {
        dispatch(setItemCount({ _id: itemId, volumeIndex: volumeId, selectedCount: parseInt(inputValue) }))
      }
      setValue(inputValue)
    }
  }

  const handleBlur = () => {
    if (value === '') {
      dispatch(setItemCount({ _id: itemId, volumeIndex: volumeId, selectedCount: 1 }))
      setValue('1')
    }
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      inputRef.current.blur()
    }
  }

  const addItemClick = () => {
    let newValue = parseInt(value) || 0
    newValue += 1

    setValue(newValue.toString())
    dispatch(setItemCount({ _id: itemId, volumeIndex: volumeId, selectedCount: newValue }))
  }

  const removeItemClick = () => {
    let newValue = parseInt(value) || 0
    if (newValue > 1) {
      newValue -= 1
      setValue(newValue.toString())
      dispatch(setItemCount({ _id: itemId, volumeIndex: volumeId, selectedCount: newValue }))
    } else {
      setValue('1')
    }
  }

  const removeItem = () => {
    dispatch(removeItemFromCart({ _id: itemId, volumeIndex: volumeId }))
  }
  return (
    <div className="cart__item">
      <img className="item__photo" src={photo} alt={`${brand} ${name}`} />
      <div className="cart__item__info">
        <strong className="item__brand">{brand}</strong>
        <strong className="item__name">{name}</strong>
        <span className="item__volume">
          {volume} {t('ml')}
        </span>
        <span className="item__price">{price}$</span>
      </div>

      <div className="count__edittor">
        <Button className="special__page__btn edit__count_btn" onClick={removeItemClick}>
          -
        </Button>
        <input
          type="text"
          className="count__input"
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        <Button className="special__page__btn edit__count_btn" onClick={addItemClick}>
          +
        </Button>
        <strong className="total">{totalPrice()}</strong>
      </div>
      <Button className="special__page__btn remove__item__btn" onClick={removeItem}>
        <FaTrash />
      </Button>
    </div>
  )
}
