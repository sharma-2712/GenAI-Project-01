import React from 'react'
import '../style/header.scss'

const Header = ({ onCreateReport, onLogout, onNavigateToReports }) => {
  return (
    <header className='app-header'>
      <div className='header-container'>
        <div className='header-left'>
          <h1 className='brand-logo'>NeonObsidian</h1>
          <nav className='header-nav'>
            <button 
              className='nav-link' 
              onClick={onNavigateToReports}
            >
              REPORTS
            </button>
            <button 
              className='nav-link' 
              onClick={onLogout}
            >
              LOGOUT
            </button>
          </nav>
        </div>
        <button 
          className='btn-create-report'
          onClick={onCreateReport}
        >
          CREATE REPORT
        </button>
        <button className='btn-profile-icon'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="8" r="4"/>
            <path d="M 12 14 C 8 14 4 16 4 20 L 20 20 C 20 16 16 14 12 14 Z"/>
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
