import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Sidebar.css'
import logo from '../assets/Logo (2).svg'
import { ReactComponent as FolderIcon }  from '../assets/folder 2.svg'
import { ReactComponent as AnalyticsIcon } from '../assets/analytics 1.svg'
import { ReactComponent as SettingsIcon } from '../assets/settings.svg'
import { ReactComponent as HumanIcon } from '../assets/human.svg'
import { ReactComponent as HelpIcon } from '../assets/voprosik.svg'
import { ReactComponent as LogoutIcon } from '../assets/logout 1.svg'
import { ReactComponent as ArrowLeftIcon } from '../assets/arrLeft.svg'

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
              <HumanIcon className="nav-icon" />
              <span>{t('sidebar.myAccount')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className={`nav-link ${isCreatePage ? 'active' : ''}`}>
              <FolderIcon className="nav-icon" />
              <span>{t('sidebar.projects')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics" className="nav-link">
              <AnalyticsIcon className="nav-icon" />
              <span>{t('sidebar.analytics')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className="nav-link">
              <SettingsIcon className="nav-icon" />
              <span>{t('sidebar.settings')}</span>
            </NavLink>
          </li>
        </ul>
        <div className="sidebar-bottom">
          <NavLink to="/help" className="nav-link">
            <HelpIcon className="nav-icon" />
            <span>{t('sidebar.help')}</span>
          </NavLink>
          <NavLink to="/logout" className="nav-link">
            <LogoutIcon className="nav-icon" />
            <span>{t('sidebar.logOut')}</span>
          </NavLink>
          {!isCreatePage && (
            <button className="hide-btn" onClick={() => setIsOpen(!isOpen)}>
              <ArrowLeftIcon className="nav-icon" />
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
