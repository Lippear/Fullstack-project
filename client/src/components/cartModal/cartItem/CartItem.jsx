import { useDispatch } from 'react-redux'
import { removeItemFromCart } from '../../../redux-toolkit/cart/cartSlise'
import Button from '../.././button/Button.jsx'
import './CartItem.scss'

export default function CartItem({ item, itemId, volumeId }) {
  const { brand, name, photo, addedVolumes } = item
  const { price, count } = addedVolumes[volumeId]
  const dispatch = useDispatch()

  const removeItem = () => {
    dispatch(removeItemFromCart({ id: itemId, volumeIndex: volumeId }))
  }

  return (
    <div className="cart__item">
      <img className="item__photo" src={photo} alt={`${brand} ${name}`} />
      <strong className="item__brand">{brand}</strong>
      <span className="item__name">{name}</span>
      <span className="item__volume">{volumeId}</span>
      <span className="item__price">{price}$</span>
      <span className="item__count">Quantity: {count}</span>
      <Button className="remove__item__btn" onClick={removeItem}>
        Remove
      </Button>
    </div>
  )
}
