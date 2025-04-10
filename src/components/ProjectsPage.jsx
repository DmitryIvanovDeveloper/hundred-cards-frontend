
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './ProjectsPage.css'
import emptyFolder from '../assets/emptyFolder.svg'
import folder from '../assets/folder.svg'

export default function ProjectsPage() {
  const { t } = useTranslation()

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h2>{t('sidebar.projects')}</h2>
      </div>
      <div className="projects-container">
        <div className="project-card">
          <NavLink to="/create">
            <img src={emptyFolder} alt="Create new project" />
            <p>{t('mainPage.createNewProject')}</p>
          </NavLink>
        </div>
        <div className="project-card">
          <img src={folder} alt="My new project" />
          <p>{t('mainPage.myNewProject')}</p>
        </div>
        <div className="project-card">
          <img src={folder} alt="My second project" />
          <p>{t('mainPage.mySecondProject')}</p>
        </div>
      </div>
    </div>
  )
}