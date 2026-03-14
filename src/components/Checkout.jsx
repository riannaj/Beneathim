import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './Checkout.css'

export default function Checkout({ onBack }) {
  const { items, cartTotal, clearCart } = useCart()
  const [placed, setPlaced] = useState(false)

  const handlePlaceOrder = () => {
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <section className="checkout">
        <div className="checkout__content checkout__content--thanks">
          <h2 className="checkout__thanks-title">Thank you</h2>
          <p className="checkout__thanks-text">
            Your order has been received. We&apos;ll be in touch soon.
          </p>
          <button type="button" className="checkout__btn checkout__btn--primary" onClick={onBack}>
            Continue shopping
          </button>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="checkout">
        <div className="checkout__content">
          <h2 className="checkout__title">Checkout</h2>
          <p className="checkout__empty">Your cart is empty.</p>
          <button type="button" className="checkout__btn checkout__btn--primary" onClick={onBack}>
            Continue shopping
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="checkout">
      <div className="checkout__content">
        <h2 className="checkout__title">Checkout</h2>

        <div className="checkout__summary">
          <ul className="checkout__list">
            {items.map((item) => (
              <li key={item.id} className="checkout__item">
                <span className="checkout__item-name">
                  {item.variant ? `${item.name} [${item.variant}]` : item.name}
                </span>
                <span className="checkout__item-meta">
                  {item.quantity} × ${item.price}
                </span>
                <span className="checkout__item-total">
                  ${(item.quantity * item.price).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <p className="checkout__total">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </p>
        </div>

        <p className="checkout__note">
          Payment and shipping details will be collected in a future update.
        </p>

        <div className="checkout__actions">
          <button type="button" className="checkout__btn checkout__btn--secondary" onClick={onBack}>
            Continue shopping
          </button>
          <button type="button" className="checkout__btn checkout__btn--primary" onClick={handlePlaceOrder}>
            Place order
          </button>
        </div>
      </div>
    </section>
  )
}
