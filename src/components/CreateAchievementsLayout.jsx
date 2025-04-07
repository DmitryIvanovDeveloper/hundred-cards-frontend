import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './CreateAchievementsPage.css'
import Apple from '../assets/achievements/apple.svg'
import Arrow3 from '../assets/achievements/Arrow 3.svg'
import Cancel from '../assets/achievements/Cancel.svg'
import Career1 from '../assets/achievements/career 1.svg'
import Chicken1 from '../assets/achievements/chicken 1.svg'
import Diamond from '../assets/achievements/diamond.svg'
import Crown from '../assets/achievements/crown.svg'
import Eye from '../assets/achievements/eye.svg'
import Group210 from '../assets/achievements/Group 210.svg'
import Group125 from '../assets/achievements/Group 125.svg'
import Group216 from '../assets/achievements/Group 216.svg'
import Group219 from '../assets/achievements/Group 219.svg'
import Group221 from '../assets/achievements/Group 221.svg'
import Group222 from '../assets/achievements/Group 222.svg'
import Group223 from '../assets/achievements/Group 223.svg'
import MagicBall1 from '../assets/achievements/magic-ball 1.svg'
import Megaphone1 from '../assets/achievements/megaphone 1.svg'
import Plane from '../assets/achievements/plane.svg'
import Rocket from '../assets/achievements/rocket.svg'
import Save from '../assets/achievements/Save.svg'
import Startach from '../assets/achievements/startach.svg'
import Rectangle from '../assets/achievements/Rectangle.svg'
import Rectangle37 from '../assets/achievements/Rectangle 37.svg'
import Polygon6 from '../assets/achievements/Polygon 6.svg'

const iconList = [
  { id: 'chicken1', src: Chicken1, alt: 'chicken-1' },
  { id: 'rocket', src: Rocket, alt: 'rocket' },
  { id: 'startach', src: Startach, alt: 'startach' },
  { id: 'career1', src: Career1, alt: 'career-1' },
  { id: 'magicBall1', src: MagicBall1, alt: 'magic-ball-1' },
  { id: 'group216', src: Group216, alt: 'sett' },
  { id: 'crown', src: Crown, alt: 'crown' },
  { id: 'eye', src: Eye, alt: 'eye' },
  { id: 'group125', src: Group125, alt: 'zipper' },
  { id: 'group219', src: Group219, alt: 'magnifier' },
  { id: 'group221', src: Group221, alt: 'human' },
  { id: 'group222', src: Group222, alt: 'message' },
  { id: 'group223', src: Group223, alt: 'community' },
  { id: 'magicBall1', src: MagicBall1, alt: 'magic-ball-1' },
  { id: 'megaphone1', src: Megaphone1, alt: 'megaphone-1' },
  { id: 'plane', src: Plane, alt: 'plane' },
  { id: 'startach', src: Startach, alt: 'startach' },
  { id: 'arrow', src: Arrow3, alt: 'arrow' }
]

export default function CreateAchievementsLayout() {
  const { t } = useTranslation()
  const [achievementIcon, setAchievementIcon] = useState(Chicken1)
  const [achievementTitle, setAchievementTitle] = useState('')
  const [activateAchievement, setActivateAchievement] = useState(false)
  const [description, setDescription] = useState('')
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
    alert(`${t('achievementsPage.save')} (example)!`)
  }

  const handlePreview = () => {
    alert(`${t('achievementsPage.preview')} (example)!`)
  }

  const handleDownload = () => {
    if (!achievementIcon) return
    const link = document.createElement('a')
    link.href = achievementIcon
    link.download = 'icon.png'
    link.click()
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
          <span>{t('achievementsPage.activateAchievement')}</span>
          <div className="toggle-switch" onClick={() => setActivateAchievement(!activateAchievement)}>
            <img src={Rectangle} alt="toggle-bg" className="toggle-bg" />
            <img src={Rectangle37} alt="toggle-handle" className={`toggle-handle ${activateAchievement ? 'active' : ''}`} />
          </div>
          <span>{activateAchievement ? t('achievementsPage.toggleOn') : t('achievementsPage.toggleOff')}</span>
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
      <div className="block-container icon-selection">
        <div className="icon-selection-wrapper">
          <div className="preview-column">
            <div className="selected-icon-preview">
              {achievementIcon ? <img src={achievementIcon} alt="Selected Icon" /> : <span>{t('achievementsPage.noIconSelected')}</span>}
            </div>
            <button className="upload-button" onClick={handleDownload} style={{ width: '55px', height: '26px' }}>
              {t('achievementsPage.uploadIcon')}
            </button>
          </div>
          <div className="icon-text-area">
            <label className="label-top">{t('achievementsPage.achievementIcon')}</label>
            <div className="icons-grid">
              {iconList.map(icon => (
                <div
                  key={icon.id}
                  className={`icon-wrapper ${achievementIcon === icon.src ? 'active' : ''}`}
                  onClick={() => setAchievementIcon(icon.src)}
                >
                  <img src={icon.src} alt={icon.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="block-container">
        <label className="label-top">{t('achievementsPage.selectAchievementCategory')}</label>
        <select
          className="input-field"
          value={achievementCategory}
          onChange={(e) => setAchievementCategory(e.target.value)}
        >
          <option value="">-- {t('achievementsPage.selectAchievementCategory')} --</option>
          <option value="category1">{t('createMenu.category1')}</option>
          <option value="category2">{t('createMenu.category2')}</option>
          <option value="category3">{t('createMenu.category3')}</option>
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
