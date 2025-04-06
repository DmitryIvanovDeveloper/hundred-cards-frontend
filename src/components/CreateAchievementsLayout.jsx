import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './CreateProjectPage.css'

export default function CreateAchievementsLayout() {
  const { t } = useTranslation()
  const [achievementTitle, setAchievementTitle] = useState('')
  const [activateAchievement, setActivateAchievement] = useState(false)
  const [description, setDescription] = useState('')
  const [achievementIcon, setAchievementIcon] = useState('')
  const [achievementCategory, setAchievementCategory] = useState('')
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0)
  const [selectedQuestions, setSelectedQuestions] = useState([])

  const handleSaveAchievement = () => {
    const newAchievement = {
      title: achievementTitle,
      isActive: activateAchievement,
      description,
      icon: achievementIcon,
      category: achievementCategory,
      correctAnswersNeeded: numberOfCorrectAnswers,
      questions: selectedQuestions
    }
    console.log('Achievement saved:', newAchievement)
    alert(t('achievementsPage.save') + ' (example)!')
  }

  const handlePreview = () => {
    alert(t('achievementsPage.preview') + ' (example)!')
  }

  return (
    <div className="achievements-layout">
      <div className="block-container">
        <label className="label-top">{t('achievementsPage.achievementTitle')}</label>
        <input
          type="text"
          className="input-field"
          value={achievementTitle}
          onChange={(e) => setAchievementTitle(e.target.value)}
        />
      </div>
      <div className="block-container">
        <label className="label-inline">
          <input
            type="checkbox"
            checked={activateAchievement}
            onChange={(e) => setActivateAchievement(e.target.checked)}
          />
          {t('achievementsPage.activateAchievement')}
        </label>
      </div>
      <div className="block-container">
        <label className="label-top">{t('achievementsPage.description')}</label>
        <textarea
          className="input-field"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="block-container">
        <label className="label-top">{t('achievementsPage.achievementIcon')}</label>
        <input
          type="text"
          className="input-field"
          placeholder="e.g. 🐤"
          value={achievementIcon}
          onChange={(e) => setAchievementIcon(e.target.value)}
        />
      </div>
      <div className="block-container">
        <label className="label-top">{t('achievementsPage.selectAchievementCategory')}</label>
        <select
          className="input-field"
          value={achievementCategory}
          onChange={(e) => setAchievementCategory(e.target.value)}
        >
          <option value="">-- {t('achievementsPage.selectAchievementCategory')} --</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
        </select>
      </div>
      <div className="block-container">
        <label className="label-top">{t('achievementsPage.numberOfCorrectAnswers')}</label>
        <input
          type="number"
          className="input-field"
          min={0}
          value={numberOfCorrectAnswers}
          onChange={(e) => setNumberOfCorrectAnswers(e.target.value)}
        />
      </div>
      <div className="block-container">
        <label className="label-top">{t('achievementsPage.selectQuestionsToAchieve')}</label>
        <input
          type="text"
          className="input-field"
          placeholder="Question IDs or Titles"
          value={selectedQuestions.join(', ')}
          onChange={(e) => setSelectedQuestions(e.target.value.split(','))}
        />
      </div>
      <div className="buttons-row">
        <button onClick={handlePreview}>{t('achievementsPage.preview')}</button>
        <button onClick={handleSaveAchievement}>{t('achievementsPage.save')}</button>
      </div>
    </div>
  )
}
