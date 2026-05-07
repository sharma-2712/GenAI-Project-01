import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import '../style/login.scss'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleLogin({ email, password })
    navigate('/')
  }

  if (loading) {
    return (
      <main className="login-root">
        <div className="login-loading">Authenticating...</div>
      </main>
    )
  }

  return (
    <main className="login-root">

      {/* LEFT PANEL */}
      <div className="login-left">
        <div className="login-brand">
          <span className="brand-italic">Archive</span>
        </div>

        <div className="login-form-wrap">
          <h1 className="login-heading">
            Access the<br />vault.
          </h1>
          <p className="login-sub">
            Please enter your credentials to authenticate
            into the archival management system.
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="field-group">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="architect@archive.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label htmlFor="password">PASSWORD</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-btn">
              AUTHENTICATE
            </button>
          </form>

          <div className="login-footer-links">
            <span className="muted-link">FORGOT CREDENTIALS?</span>
            <Link to="/register" className="bright-link">REQUEST ACCESS</Link>
          </div>
        </div>

        <p className="login-copyright">
          © 2024 ARCHIVE SYSTEMS. ALL RIGHTS RESERVED.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <img
          className="right-bg-img"
          src="/arch_bg.png"
          alt="Architectural background"
        />
        <div className="right-overlay" />

        <div className="quote-card">
          <div className="quote-mark">"</div>
          <blockquote>
            "The architect represents neither a Dionysian nor an Apollonian
            condition: here it is the mighty act of will, the will which moves
            mountains, the intoxication of the strong will, which seeks
            expression."
          </blockquote>
          <div className="quote-author">
            <span className="author-line" />
            FRIEDRICH NIETZSCHE
          </div>
        </div>
      </div>

    </main>
  )
}

export default Login