import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeCart } from '../../redux-toolkit/cart/cartSlise'
import { useClickOutside } from '../hooks/useClickOutside'
import Button from '/src/components/button/Button'
import './cartModal.scss'

export default function CartModal() {
  const modalRef = useRef(null)
  const cartMenuRef = useRef(null)
  const isOpen = useSelector((state) => state.cart.isOpen)
  const dispatch = useDispatch()

  const openCartModal = () => {
    document.body.classList.add('no-scroll')
    modalRef.current?.classList.add('open')  // Добавляем класс для появления модального окна
  }

  const closeCartModal = () => {
    document.body.classList.remove('no-scroll')
    modalRef.current?.classList.remove('open')  // Убираем класс, чтобы скрыть окно
  }

  useClickOutside(cartMenuRef, () => {
    dispatch(closeCart())
  })

  useEffect(() => {
    if (isOpen) {
      openCartModal()
    } else {
      closeCartModal()
    }
  }, [isOpen])

  return (
    <dialog className="cart__modal" ref={modalRef}>
      <div className="cart__menu" ref={cartMenuRef}></div>
    </dialog>
  )
}
