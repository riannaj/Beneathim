import { useCart } from '../context/CartContext'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const displayName = product.variant
    ? `${product.name} [${product.variant}]`
    : product.name

  return (
    <article className="product-card">
      <a href={`#product-${product.id}`} className="product-card__link">
        <div className="product-card__info">
          <h3 className="product-card__name">{displayName}</h3>
          <p className="product-card__price">${product.price}.00</p>
        </div>
      </a>
      <button
        className="product-card__add"
        onClick={() => addToCart(product)}
        aria-label={`Add ${product.name} to cart`}
      >
        Add to cart
      </button>
    </article>
  )
}
