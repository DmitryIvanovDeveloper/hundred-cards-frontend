import React, { useState } from 'react'
import CreateMenu from './CreateMenu'
import CreateProjectLayout from './CreateProjectLayout'
import CreateAchievementLayout from './CreateAchievementsLayout'
import './CreateProjectPage.css'

export default function CreateProjectPage() {
  const [selection, setSelection] = useState({ type: 'project' })

  return (
    <div className="create-page-wrapper">
      <CreateMenu onSelectionChange={setSelection} />
      <div className="create-page-content">
        {selection.type === 'achievement' ? (
          <CreateAchievementLayout achievementId={selection.id} />
        ) : (
          <CreateProjectLayout />
        )}
      </div>
    </div>
  )
}
