import { useState, useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Checkout from './components/Checkout'
import AccessGate, { getIsUnlocked } from './components/AccessGate'
import './App.css'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    setUnlocked(getIsUnlocked())
  }, [])

  if (!unlocked) {
    return <AccessGate onUnlock={() => setUnlocked(true)} />
  }

  return (
    <CartProvider>
      <Sidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <div className="app__main">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenCheckout={() => setShowCheckout(true)}
        />
        <main>
          {showCheckout ? (
            <Checkout onBack={() => setShowCheckout(false)} />
          ) : (
            <>
              <Hero />
              <ProductGrid searchQuery={searchQuery} selectedCategory={selectedCategory} />
            </>
          )}
        </main>
        <footer className="footer">
          <div className="footer__links">
            <a href="https://www.instagram.com/beneathhim/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#archive">Archive</a>
            <a href="#newsletter">Newsletter</a>
            <a href="#shipping">Shipping Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
          <p className="footer__copy">
            © {new Date().getFullYear()} Beneathhim.
          </p>
        </footer>
      </div>
    </CartProvider>
  )
}
