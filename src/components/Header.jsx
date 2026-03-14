import { useState, useRef, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import Cart from './Cart'
import './Header.css'

export default function Header({ searchQuery, setSearchQuery, onOpenCheckout }) {
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchInputRef = useRef(null)
  const { cartCount } = useCart()

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  return (
    <>
      <header className="header">
        <button
          type="button"
          className="header__menu-btn"
          onClick={() => onOpenMenu?.()}
          aria-label="Open menu"
        >
          <span />
          <span />
          <span />
        </button>
        <div className="header__right">
          <div className="header__search-wrap">
            <span className="header__icon header__icon--search" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            {searchOpen ? (
              <>
                <input
                  ref={searchInputRef}
                  type="search"
                  className="header__search-input"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => setSearchOpen(false)}
                  onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
                  aria-label="Search products"
                />
                <button
                  type="button"
                  className="header__search-close"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  ×
                </button>
              </>
            ) : (
              <button
                type="button"
                className="header__link"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
              >
                Search
              </button>
            )}
          </div>
          <button
            type="button"
            className="header__link header__cart-btn"
            aria-label={`Cart, ${cartCount} items`}
            onClick={() => setCartOpen(true)}
          >
            <span className="header__icon header__icon--cart" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </span>
            Cart ({cartCount})
          </button>
          <button type="button" className="header__link" onClick={onOpenCheckout}>
            Check Out
          </button>
        </div>
      </header>

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false)
          onOpenCheckout?.()
        }}
      />
    </>
  )
}
