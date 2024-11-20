import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeCart, selectIsCartOpen, selectCartItems, clearCart } from '../../redux-toolkit/cart/cartSlise'
import { useClickOutside } from '../hooks/useClickOutside'
import { calculateTotalCartPrice } from '../../servises/calculateTotalCartPrice'
import Button from '/src/components/button/Button'
import CartItem from './cartItem/CartItem'
import './cartModal.scss'

export default function CartModal() {
  const modalRef = useRef(null)
  const contentRef = useRef(null)
  const isOpen = useSelector(selectIsCartOpen)
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()
  const [isOrderProcesPageOpen, setIsOrderProcesPageOpen] = useState(false)

  const totalPrice = calculateTotalCartPrice(cartItems)

  const closeCartModal = () => {
    document.body.classList.remove('no-scroll')
    dispatch(closeCart())
    modalRef.current.close()
  }

  const openCartModal = () => {
    document.body.classList.add('no-scroll')
    modalRef.current.showModal()
  }

  useClickOutside(contentRef, () => {
    if (!isOrderProcesPageOpen) {
      closeCartModal()
    } else {
      setIsOrderProcesPageOpen(false)
    }
  })

  const makeCartClear = () => dispatch(clearCart())

  useEffect(() => {
    if (isOpen) {
      openCartModal()
    } else {
      closeCartModal()
    }
  }, [isOpen])

  return (
    <dialog ref={modalRef} className={`cart-modal ${isOpen ? 'open' : ''}`}>
      <div className="cart__modal__content" ref={contentRef}>
        {!isOrderProcesPageOpen && (
          <div className="item__page">
            <div className="item__editor">
              <div className="modal__container">
                {Object.keys(cartItems).map((itemId) => {
                  const item = cartItems[itemId]
                  return Object.keys(item.addedVolumes).map((volumeId) => {
                    return <CartItem key={volumeId} item={item} itemId={itemId} volumeId={volumeId} />
                  })
                })}
              </div>
            </div>
            <div className="to__offer__info">
              <div className="modal__container">
                <strong>Total price: {totalPrice}$</strong>
                <Button className="special__page__btn clear__cart__btn" onClick={makeCartClear}>
                  Clear cart
                </Button>
                <Button className="special__page__btn proceed__to__checkout__btn" onClick={() => setIsOrderProcesPageOpen(true)}>
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
        {isOrderProcesPageOpen && <div className="order__proces__page"></div>}
      </div>
    </dialog>
  )
}
