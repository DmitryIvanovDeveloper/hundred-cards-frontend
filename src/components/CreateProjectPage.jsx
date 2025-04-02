import React from 'react'
import './CreateProjectPage.css'
import CreateMenu from './CreateMenu'
import CreateProjectLayout from './CreateProjectLayout'

export default function CreateProjectPage() {
  return (
    <div className="create-page-wrapper">
      <CreateMenu />
      <div className="create-page-content">
        <CreateProjectLayout />
      </div>
    </div>
  )
}
