import { useCart } from '../context/CartContext'
import './Hero.css'

export default function Hero() {
  const { cartCount } = useCart()
  return (
    <section className="hero">
      <h1 className="hero__title">COMING SOON...</h1>
      <p className="hero__subtitle">Your cart — {cartCount} items</p>
    </section>
  )
}
