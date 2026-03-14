import Logo from './Logo'
import './Sidebar.css'

const CATEGORIES = [
  { label: 'Tops', id: 'tops' },
  { label: 'Bottoms', id: 'bottoms' },
  { label: 'Caps', id: 'caps' },
]

export default function Sidebar({ selectedCategory, onSelectCategory }) {
  const handleCategoryClick = (id) => {
    onSelectCategory(id)
    const shop = document.getElementById('shop')
    if (shop) shop.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <aside className="sidebar" aria-label="Category menu">
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
  )
}
