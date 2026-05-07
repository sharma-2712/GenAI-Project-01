import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import '../style/register.scss'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { loading, handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister({ username, email, password })
    navigate('/')
  }

  if (loading) {
    return (
      <main className="register-root">
        <div className="register-loading">Establishing identity...</div>
      </main>
    )
  }

  return (
    <main className="register-root">

      {/* LEFT PANEL */}
      <div className="register-left">
        <div className="reg-brand">
          <span className="brand-italic">Archive</span>
        </div>

        <div className="reg-hero">
          <h1 className="reg-heading">
            The silence of <em>permanent</em> structures.
          </h1>
          <p className="reg-sub">
            Enter the digital vault of architectural precision. Curate your
            history with intentionality and spatial awareness.
          </p>
        </div>

        <div className="reg-meta">
          <div className="meta-item">
            <div className="meta-label">EDITION</div>
            <div className="meta-value">v2.4 Obsidian</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">STATUS</div>
            <div className="meta-value">Encrypted</div>
          </div>
        </div>

        <div className="alpha-tag">A<br />L<br />P<br />H<br />A</div>
      </div>

      {/* RIGHT PANEL */}
      <div className="register-right">
        <div className="reg-form-wrap">
          <div className="reg-eyebrow">NEW MEMBERSHIP</div>
          <h2 className="reg-title">Create your account</h2>

          <form onSubmit={handleSubmit} className="reg-form">

            <div className="reg-field">
              <label htmlFor="username">FULL NAME</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="LUKAS VANDERBILT"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="reg-field">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="L.VANDERBILT@STUDIO.ARCH"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="reg-field password-field">
              <label htmlFor="password">PASSWORD</label>
              <button
                type="button"
                className="show-toggle"
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="establish-btn">
              ESTABLISH IDENTITY
            </button>

            <p className="secure-note">SECURE ACCESS ONLY</p>

            <p className="signin-link">
              Already part of the collective?{' '}
              <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>

        <div className="reg-footer">
          <div className="encryption-badge">
            <span className="lock-icon">🔒</span>
            END-TO-END ENCRYPTION ENABLED
          </div>
          <p className="reg-terms">
            By proceeding, you agree to the Architectural Governance and
            Privacy Frameworks of the Archive.
          </p>
        </div>
      </div>

    </main>
  )
}

export default Register