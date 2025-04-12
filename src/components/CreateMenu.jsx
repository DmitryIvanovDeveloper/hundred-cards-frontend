import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import './CreateMenu.css'

import optionsLines from '../assets/createproject/options-lines 1.svg'
import check from '../assets/createproject/check.svg'
import pencil from '../assets/createproject/pencil.svg'
import plus from '../assets/createproject/plus.svg'
import whitefolder from '../assets/createproject/folder white.svg'
import whitevoprosik from '../assets/createproject/whitevoprosik.svg'
import idk from '../assets/createproject/idk.svg'
import acceptMedium from '../assets/createproject/fluent-mdl2_accept-medium.svg'

const useUrlUpdater = () => {
  const navigate = useNavigate()
  const { search } = useLocation()

  return useCallback(
    (params, options = { replace: true }) => {
      const searchParams = new URLSearchParams(search)
      Object.entries(params).forEach(([k, v]) => {
        if (v === null || v === undefined) {
          searchParams.delete(k)
        } else {
          searchParams.set(k, v)
        }
      })
      navigate(
        {
          pathname: '/create',
          search: searchParams.toString() ? `?${searchParams.toString()}` : ''
        },
        options
      )
    },
    [navigate, search]
  )
}

const AchievementItem = ({ achievement, isSelected, onSelect, onEdit, editing, finishEditing, onChangeLabel }) => (
  <li
    className={`achievement-item ${isSelected ? 'selected' : ''} ${achievement.isSaved ? 'saved' : 'unsaved'}`}
    onClick={() => onSelect(achievement.id)}
  >
    {editing.type === 'achievement' && editing.id === achievement.id ? (
      <div className="achievement-edit">
        <input
          type="text"
          value={achievement.label}
          onChange={(e) => onChangeLabel(achievement.id, e.target.value)}
          onBlur={finishEditing}
          onKeyPress={(e) => e.key === 'Enter' && finishEditing()}
          autoFocus
        />
      </div>
    ) : (
      <div className="achievement-display">
        {achievement.icon && <img src={achievement.icon} alt="" className="achievement-icon" />}
        <span>{achievement.label}</span>
        {achievement.isSaved && <img src={acceptMedium} alt="" className="saved-icon" />}
      </div>
    )}
    {isSelected && editing.type !== 'achievement' && (
      <img
        src={pencil}
        alt=""
        onClick={(e) => {
          e.stopPropagation()
          onEdit('achievement', achievement.id)
        }}
      />
    )}
  </li>
)

const QuestionItem = ({ question, isSelected, onSelect, onToggleCheck, onEdit, editing, finishEditing, onChangeLabel }) => (
  <li className={isSelected ? 'selected' : ''} onClick={() => onSelect(question.id, question.categoryId)}>
    <img src={idk} alt="" className="drag-handle" />
    <div
      className="checkbox"
      onClick={(e) => {
        e.stopPropagation()
        onToggleCheck(question.id)
      }}
    >
      <img src={check} alt="" className="white-square" />
      {question.checked && <img src={acceptMedium} alt="" className="check-icon" />}
    </div>
    {editing.type === 'question' && editing.id === question.id ? (
      <input
        type="text"
        value={question.label}
        onChange={(e) => onChangeLabel(question.id, e.target.value)}
        onBlur={finishEditing}
        onKeyPress={(e) => e.key === 'Enter' && finishEditing()}
        autoFocus
      />
    ) : (
      <span className="question-text">{question.label}</span>
    )}
    {isSelected && editing.type !== 'question' && (
      <img
        src={pencil}
        alt=""
        onClick={(e) => {
          e.stopPropagation()
          onEdit('question', question.id)
        }}
      />
    )}
  </li>
)

const QuestionsBlock = ({
  questions,
  selectedQuestion,
  setSelectedQuestion,
  setSelectedAchievement,
  editing,
  setEditing,
  toggleCheck,
  finishEditing,
  onChangeLabel,
  updateUrl
}) => {
  const handleEdit = (type, id) => setEditing({ type, id })
  const handleSelect = (id, categoryId) => {
    setSelectedQuestion(id)
    setSelectedAchievement(null)
    updateUrl({ category: categoryId, question: id, achievement: null })
  }
  return (
    <ul>
      {questions.map((q) => (
        <QuestionItem
          key={q.id}
          question={q}
          isSelected={selectedQuestion === q.id}
          onSelect={handleSelect}
          onToggleCheck={toggleCheck}
          onEdit={handleEdit}
          editing={editing}
          finishEditing={finishEditing}
          onChangeLabel={onChangeLabel}
        />
      ))}
    </ul>
  )
}

export default function CreateMenu({ onSelectionChange }) {
  const { t } = useTranslation()
  const updateUrl = useUrlUpdater()

  const [selectedProject, setSelectedProject] = useState('project1')
  const [projectName, setProjectName] = useState(t('createMenu.project1'))

  const initialCategories = useMemo(
    () => [
      { id: 'category1', label: t('createMenu.category1') },
      { id: 'category2', label: t('createMenu.category2') },
      { id: 'category3', label: t('createMenu.category3') }
    ],
    [t]
  )
  const [categories, setCategories] = useState(initialCategories)
  const [selectedCategory, setSelectedCategory] = useState(initialCategories[0].id)

  const initialQuestions = useMemo(
    () => [
      { id: 'question1', label: t('createMenu.question1'), checked: false, categoryId: selectedCategory },
      { id: 'question2', label: t('createMenu.question2'), checked: false, categoryId: selectedCategory },
      { id: 'question3', label: t('createMenu.question3'), checked: false, categoryId: selectedCategory },
      { id: 'question4', label: t('createMenu.question4'), checked: false, categoryId: selectedCategory },
      { id: 'question5', label: t('createMenu.question5'), checked: false, categoryId: selectedCategory }
    ],
    [t, selectedCategory]
  )
  const [questions, setQuestions] = useState(initialQuestions)
  const [selectedQuestion, setSelectedQuestion] = useState(initialQuestions[0].id)

  const [achievements, setAchievements] = useState([])
  const [selectedAchievement, setSelectedAchievement] = useState(null)

  const [editing, setEditing] = useState({ type: null, id: null })
  const finishEditing = () => setEditing({ type: null, id: null })

  useEffect(() => {
    if (selectedAchievement) {
      onSelectionChange?.({ type: 'achievement', id: selectedAchievement })
    } else {
      onSelectionChange?.({
        type: 'project',
        project: selectedProject,
        projectName,
        category: selectedCategory,
        question: selectedQuestion || null
      })
    }
  }, [selectedProject, selectedCategory, selectedQuestion, selectedAchievement, projectName, onSelectionChange])

  const addCategory = () => {
    const newId = `category${categories.length + 1}`
    const newLabel = `${t('createMenu.category')} ${categories.length + 1}`
    setCategories([...categories, { id: newId, label: newLabel }])
    setSelectedCategory(newId)
    setSelectedAchievement(null)
    updateUrl({ category: newId, question: null, achievement: null })
  }

  const addQuestion = () => {
    const newId = `question${questions.length + 1}`
    const newLabel = `${t('createMenu.question')} ${questions.length + 1}`
    const newQuestion = { id: newId, label: newLabel, checked: false, categoryId: selectedCategory }
    setQuestions([...questions, newQuestion])
    setSelectedQuestion(newId)
    setSelectedAchievement(null)
    updateUrl({ category: selectedCategory, question: newId, achievement: null })
  }

  const toggleCheck = (id) => setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, checked: !q.checked } : q)))
  const handleChangeQuestionLabel = (id, value) => setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, label: value } : q)))
  const handleChangeAchievementLabel = (id, value) => setAchievements((prev) => prev.map((a) => (a.id === id ? { ...a, label: value } : a)))

  const addAchievement = () => {
    const newId = `achievement${achievements.length + 1}`
    const newLabel = `${t('createMenu.achievement')} ${achievements.length + 1}`
    const newAchievement = { id: newId, label: newLabel, icon: '', isSaved: false, categoryId: selectedCategory }
    setAchievements([...achievements, newAchievement])
    setSelectedAchievement(newId)
    updateUrl({ achievement: newId })
  }

  return (
    <div className="create-menu">
      <h1 className="menu-title">{t('createMenu.title')}</h1>
      <div className="menu-section">
        <div className="section-header">
          <img src={whitefolder} alt="" />
          <span>{t('createMenu.projects')}</span>
        </div>
        <ul>
          <li
            className={selectedProject === 'project1' ? 'selected' : ''}
            onClick={() => {
              setSelectedProject('project1')
              setSelectedAchievement(null)
              updateUrl({ project: 'project1', question: selectedQuestion || null, achievement: null })
            }}
          >
            {editing.type === 'project' && editing.id === 'project1' ? (
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onBlur={finishEditing}
                onKeyPress={(e) => e.key === 'Enter' && finishEditing()}
                autoFocus
              />
            ) : (
              <span>{projectName}</span>
            )}
            {selectedProject === 'project1' && editing.type !== 'project' && (
              <img
                src={pencil}
                alt=""
                onClick={(e) => {
                  e.stopPropagation()
                  setEditing({ type: 'project', id: 'project1' })
                }}
              />
            )}
          </li>
        </ul>
      </div>
      <div className="menu-section">
        <div className="section-header">
          <img src={optionsLines} alt="" />
          <span>{t('createMenu.categories')}</span>
          <img src={plus} alt="" className="header-plus" onClick={addCategory} />
        </div>
        <ul>
          {categories.map((cat) => (
            <li
              key={cat.id}
              className={selectedCategory === cat.id ? 'selected' : ''}
              onClick={() => {
                setSelectedCategory(cat.id)
                setSelectedAchievement(null)
                updateUrl({ category: cat.id, question: null, achievement: null })
              }}
            >
              {editing.type === 'category' && editing.id === cat.id ? (
                <input
                  type="text"
                  value={cat.label}
                  onChange={(e) =>
                    setCategories((prev) => prev.map((item) => (item.id === cat.id ? { ...item, label: e.target.value } : item)))
                  }
                  onBlur={finishEditing}
                  onKeyPress={(e) => e.key === 'Enter' && finishEditing()}
                  autoFocus
                />
              ) : (
                <span>{cat.label}</span>
              )}
              {selectedCategory === cat.id && editing.type !== 'category' && (
                <img
                  src={pencil}
                  alt=""
                  onClick={(e) => {
                    e.stopPropagation()
                    setEditing({ type: 'category', id: cat.id })
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="menu-section questions-block">
        <div className="section-header">
          <img src={whitevoprosik} alt="" />
          <span>{t('createMenu.questions')}</span>
          <img src={plus} alt="" className="header-plus" onClick={addQuestion} />
        </div>
        <QuestionsBlock
          questions={questions}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          setSelectedAchievement={setSelectedAchievement}
          editing={editing}
          setEditing={setEditing}
          toggleCheck={toggleCheck}
          finishEditing={finishEditing}
          onChangeLabel={handleChangeQuestionLabel}
          updateUrl={updateUrl}
        />
      </div>
      <div className="menu-section">
        <div className="section-header">
          <span>{t('createMenu.achievement')}</span>
          <img src={plus} alt="" className="header-plus" onClick={addAchievement} />
        </div>
        <ul>
          {achievements.map((ach) => (
            <AchievementItem
              key={ach.id}
              achievement={ach}
              isSelected={selectedAchievement === ach.id}
              onSelect={(id) => {
                setSelectedAchievement(id)
                updateUrl({ achievement: id })
                onSelectionChange?.({ type: 'achievement', id })
              }}
              onEdit={(type, id) => setEditing({ type, id })}
              editing={editing}
              finishEditing={finishEditing}
              onChangeLabel={handleChangeAchievementLabel}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
