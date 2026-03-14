import './Logo.css'

export default function Logo({ className = '' }) {
  return (
    <a href="/" className={`logo ${className}`}>
      <img
        src="/logo.png"
        alt="Beneathhim"
        className="logo__img"
      />
    </a>
  )
}
