import { useMemo } from 'react'
import { products } from '../data/products'
import ProductCard from './ProductCard'
import './ProductGrid.css'

// Map sidebar category id to product category keywords (lowercase)
const CATEGORY_MAP = {
  tops: ['tops', 'shirts', 't-shirts', 'jerseys', 'hoodies', 'sweatshirts'],
  bottoms: ['bottoms', 'sweats', 'sweatpants', 'jeans', 'denim', 'run gear', 'running'],
  caps: ['caps', 'hats'],
}

const CATEGORY_LABELS = {
  tops: 'Tops',
  bottoms: 'Bottoms',
  caps: 'Caps',
}

export default function ProductGrid({ searchQuery = '', selectedCategory = null }) {
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    let list = products

    if (selectedCategory && CATEGORY_MAP[selectedCategory]) {
      const keywords = CATEGORY_MAP[selectedCategory]
      list = list.filter((p) => {
        const cat = (p.category || '').toLowerCase()
        return keywords.some((kw) => cat.includes(kw))
      })
    }

    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.variant && p.variant.toLowerCase().includes(q))
      )
    }

    return list
  }, [searchQuery, selectedCategory])

  const isEmptySearch = searchQuery.trim() && filteredProducts.length === 0
  const isEmptyCategory = selectedCategory && !searchQuery.trim() && filteredProducts.length === 0

  return (
    <section className="product-grid-section" id="shop">
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {isEmptySearch && (
        <p className="product-grid-section__empty">No results for &quot;{searchQuery.trim()}&quot;</p>
      )}
      {isEmptyCategory && (
        <p className="product-grid-section__empty">
          No products in {CATEGORY_LABELS[selectedCategory]} yet. Check back soon.
        </p>
      )}
    </section>
  )
}
