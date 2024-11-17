import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeCart, selectIsCartOpen } from '../../redux-toolkit/cart/cartSlise'
import { useClickOutside } from '../hooks/useClickOutside'
import Button from '/src/components/button/Button'
import './cartModal.scss'

export default function CartModal() {
  const modalRef = useRef(null)
  const contentRef = useRef(null)
  const isOpen = useSelector(selectIsCartOpen)
  const dispatch = useDispatch()
  const [isOrderProcesPageOpen, setIsOrderProcesPageOpen] = useState(false)

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
              <div className="modal__container"></div>
            </div>
            <div className="to__offer__info">
              <div className="modal__container">
                <strong>total prise: 500$</strong>
                <Button
                  className="proceed__to__checkout__btn"
                  onClick={() => setIsOrderProcesPageOpen(true)}
                >
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
