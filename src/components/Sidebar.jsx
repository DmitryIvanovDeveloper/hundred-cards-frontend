import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Sidebar.css'
import logo from '../assets/Logo (2).svg'
import folder2 from '../assets/folder 2.svg'
import analytics from '../assets/analytics 1.svg'
import settings from '../assets/settings.svg'
import human from '../assets/human.svg'
import voprosik from '../assets/voprosik.svg'
import logout from '../assets/logout 1.svg'

export default function Sidebar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()

  const isCreatePage = location.pathname === '/create'

  return (
    <div
      className={`sidebar ${
        isCreatePage ? 'closed' : isOpen ? 'open' : 'closed'
      }`}
    >
      <div className="sidebar-content">
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" />
          {(!isCreatePage && isOpen) && (
            <span className="company-name">{t('sidebar.companyName')}</span>
          )}
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/my-account" className="nav-link">
              <img src={human} alt={t('sidebar.myAccount')} />
              <span>{t('sidebar.myAccount')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="nav-link">
              <img src={folder2} alt={t('sidebar.projects')} />
              <span>{t('sidebar.projects')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics" className="nav-link">
              <img src={analytics} alt={t('sidebar.analytics')} />
              <span>{t('sidebar.analytics')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className="nav-link">
              <img src={settings} alt={t('sidebar.settings')} />
              <span>{t('sidebar.settings')}</span>
            </NavLink>
          </li>
        </ul>
        <div className="sidebar-bottom">
          <NavLink to="/help" className="nav-link">
            <img src={voprosik} alt={t('sidebar.help')} />
            <span>{t('sidebar.help')}</span>
          </NavLink>
          <NavLink to="/logout" className="nav-link">
            <img src={logout} alt={t('sidebar.logOut')} />
            <span>{t('sidebar.logOut')}</span>
          </NavLink>
          {!isCreatePage && (
            <button className="hide-btn" onClick={() => setIsOpen(!isOpen)}>
              <span>
                {isOpen ? t('sidebar.hideButton') || 'Hide' : t('sidebar.showButton') || 'Show'}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
