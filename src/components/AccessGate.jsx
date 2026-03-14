import { useState } from 'react'
import './AccessGate.css'

const ACCESS_KEY = 'beneathim_unlocked'
const CODE = '121125'

export function getIsUnlocked() {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(ACCESS_KEY) === '1'
}

export function setUnlocked() {
  if (typeof window !== 'undefined') sessionStorage.setItem(ACCESS_KEY, '1')
}

export default function AccessGate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim() === CODE) {
      setUnlocked()
      setError(false)
      onUnlock()
    } else {
      setError(true)
    }
  }

  return (
    <div className="access-gate">
      <div className="access-gate__box">
        <h1 className="access-gate__brand">Beneathhim</h1>
        <p className="access-gate__label">Enter code to access</p>
        <form onSubmit={handleSubmit} className="access-gate__form">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setError(false)
            }}
            className="access-gate__input"
            placeholder="Code"
            autoFocus
            autoComplete="off"
            aria-label="Access code"
          />
          <button type="submit" className="access-gate__btn">
            Enter
          </button>
        </form>
        {error && <p className="access-gate__error">Incorrect code</p>}
      </div>
    </div>
  )
}
