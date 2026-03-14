import { useCart } from '../context/CartContext'
import './Cart.css'

export default function Cart({ open, onClose, onCheckout }) {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart()

  return (
    <div className={`cart-overlay ${open ? 'cart-overlay--open' : ''}`} onClick={onClose}>
      <aside
        className={`cart ${open ? 'cart--open' : ''}`}
        onClick={(e) => e.stopPropagation()}
        aria-label="Shopping cart"
      >
        <div className="cart__header">
          <h2 className="cart__title">Your cart</h2>
          <button className="cart__close" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>

        <div className="cart__body">
          {items.length === 0 ? (
            <p className="cart__empty">Your cart is empty.</p>
          ) : (
            <ul className="cart__list">
              {items.map((item) => (
                <li key={item.id} className="cart__item">
                  <div className="cart__item-details">
                    <h3 className="cart__item-name">{item.variant ? `${item.name} [${item.variant}]` : item.name}</h3>
                    <p className="cart__item-price">${item.price}</p>
                    <div className="cart__item-actions">
                      <div className="cart__quantity">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="cart__remove"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart__footer">
            <p className="cart__total">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </p>
            <button type="button" className="cart__checkout" onClick={onCheckout}>
            Checkout
          </button>
          </div>
        )}
      </aside>
    </div>
  )
}
