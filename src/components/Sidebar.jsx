import Logo from './Logo'
import './Sidebar.css'

const CATEGORIES = [
  { label: 'Tops', id: 'tops' },
  { label: 'Bottoms', id: 'bottoms' },
  { label: 'Caps', id: 'caps' },
]

export default function Sidebar({ selectedCategory, onSelectCategory, open, onClose }) {
  const handleCategoryClick = (id) => {
    onSelectCategory(id)
    onClose?.()
    const shop = document.getElementById('shop')
    if (shop) shop.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div
        className={`sidebar__backdrop ${open ? 'sidebar__backdrop--open' : ''}`}
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose?.()}
        role="button"
        tabIndex={0}
        aria-label="Close menu"
      />
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`} aria-label="Category menu">
        <button
          type="button"
          className="sidebar__close"
          onClick={onClose}
          aria-label="Close menu"
        >
          ×
        </button>
        <div className="sidebar__logo">
          <Logo />
        </div>
      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          <li>
            <button
              type="button"
              className={`sidebar__link ${selectedCategory == null ? 'sidebar__link--active' : ''}`}
              onClick={() => handleCategoryClick(null)}
            >
              All
            </button>
          </li>
          {CATEGORIES.map(({ label, id }) => (
            <li key={id}>
              <button
                type="button"
                className={`sidebar__link ${selectedCategory === id ? 'sidebar__link--active' : ''}`}
                onClick={() => handleCategoryClick(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
    </>
  )
}
