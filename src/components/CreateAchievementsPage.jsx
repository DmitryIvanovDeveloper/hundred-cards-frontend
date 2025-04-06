import React from 'react'
import CreateMenu from './CreateMenu'
import CreateAchievementsLayout from './CreateAchievementsLayout'
import './CreateProjectPage.css' 

export default function CreateAchievementsPage() {
  return (
    <div className="create-page-wrapper">
      <CreateMenu />
      <div className="create-page-content">
        <CreateAchievementsLayout />
      </div>
    </div>
  )
}
