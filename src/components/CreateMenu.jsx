import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './CreateMenu.css'

import optionsLines from '../assets/createproject/options-lines 1.svg'
import check from '../assets/createproject/check.svg'
import pencil from '../assets/createproject/pencil.svg'
import plus from '../assets/createproject/plus.svg'
import whitefolder from '../assets/createproject/folder white.svg'
import Rectangle from '../assets/createproject/Rectangle.svg'
import whitevoprosik from '../assets/createproject/whitevoprosik.svg'
import star from '../assets/createproject/Star 1.svg'
import idk from '../assets/createproject/idk.svg'
import acceptMedium from '../assets/createproject/fluent-mdl2_accept-medium.svg'

function QuestionItem({
  question,
  isSelected,
  onSelect,
  onToggleCheck,
  onEdit,
  editing,
  finishEditing,
  onChangeLabel,
}) {
  return (
    <li
      className={isSelected ? 'selected' : ''}
      onClick={() => onSelect(question.id)}
    >
      <img src={idk} alt="drag-handle" className="drag-handle" />
      <div
        className="checkbox"
        onClick={(e) => {
          e.stopPropagation()
          onToggleCheck(question.id)
        }}
      >
        <img src={check} alt="check" className="white-square" />
        {question.checked && (
          <img src={acceptMedium} alt="accept" className="check-icon" />
        )}
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
          alt="pencil"
          onClick={(e) => {
            e.stopPropagation()
            onEdit('question', question.id)
          }}
        />
      )}
    </li>
  )
}

function QuestionsBlock({
  questions,
  selectedQuestion,
  setSelectedQuestion,
  editing,
  setEditing,
  toggleCheck,
  setQuestions,
  finishEditing,
  onChangeLabel,
}) {
  const handleEdit = (type, id) => setEditing({ type, id })
  return (
    <ul>
      {questions.map((q) => (
        <QuestionItem
          key={q.id}
          question={q}
          isSelected={selectedQuestion === q.id}
          onSelect={setSelectedQuestion}
          onToggleCheck={toggleCheck}
          onEdit={handleEdit}
          editing={editing}
          finishEditing={finishEditing}
          onChangeLabel={onChangeLabel}
        />
      ))}
      <img src={Rectangle} alt="rectangle" />
    </ul>
  )
}

export default function CreateMenu({ onSelectionChange }) {
  const { t } = useTranslation()

  const [selectedProject, setSelectedProject] = useState('project1')
  const projectLabels = {
    project1: t('createMenu.project1'),
    project2: t('createMenu.project2'),
  }

  const initialCategories = [
    { id: 'category1', label: t('createMenu.category1') },
    { id: 'category2', label: t('createMenu.category2') },
    { id: 'category3', label: t('createMenu.category3') },
  ]
  const [categories, setCategories] = useState(initialCategories)
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategories[0].id
  )

  const initialQuestions = [
    { id: 'question1', label: t('createMenu.question1'), checked: false },
    { id: 'question2', label: t('createMenu.question2'), checked: false },
    { id: 'question3', label: t('createMenu.question3'), checked: false },
    { id: 'question4', label: t('createMenu.question4'), checked: false },
    { id: 'question5', label: t('createMenu.question5'), checked: false },
  ]
  const [questions, setQuestions] = useState(initialQuestions)
  const [selectedQuestion, setSelectedQuestion] = useState(
    initialQuestions[0].id
  )

  const [achievements, setAchievements] = useState([])

  const [editing, setEditing] = useState({ type: null, id: null })

  useEffect(() => {
    if (selectedProject && selectedCategory && selectedQuestion) {
      onSelectionChange &&
        onSelectionChange({
          project: selectedProject,
          category: selectedCategory,
          question: selectedQuestion,
        })
    } else {
      onSelectionChange && onSelectionChange(null)
    }
  }, [selectedProject, selectedCategory, selectedQuestion, onSelectionChange])

  const finishEditing = () => setEditing({ type: null, id: null })

  const addCategory = () => {
    const newNum = categories.length + 1
    const newId = `category${newNum}`
    const newLabel = `${t('createMenu.category')} ${newNum}`
    const newCategory = { id: newId, label: newLabel }
    setCategories([...categories, newCategory])
    setSelectedCategory(newId)
  }

  const addQuestion = () => {
    const newNum = questions.length + 1
    const newId = `question${newNum}`
    const newLabel = `${t('createMenu.question')} ${newNum}`
    const newQuestion = { id: newId, label: newLabel, checked: false }
    setQuestions([...questions, newQuestion])
    setSelectedQuestion(newId)
  }

  const addAchievement = () => {
    const newNum = achievements.length + 1
    const newId = `achievement${newNum}`
    const newLabel = `${t('createMenu.achievement')} ${newNum}`
    const newAchievement = { id: newId, label: newLabel }
    setAchievements([...achievements, newAchievement])
  }

  const toggleCheck = (id) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, checked: !q.checked } : q))
    )
  }

  const handleChangeQuestionLabel = (id, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, label: value } : q))
    )
  }

  return (
    <div className="create-menu">
      <h1 className="menu-title">{t('createMenu.title')}</h1>

      {/* Projects Section */}
      <div className="menu-section">
        <div className="section-header">
          <img src={whitefolder} alt="whitefolder" />
          <span>{t('createMenu.projects')}</span>
        </div>
        <ul>
          <li
            className={selectedProject === 'project1' ? 'selected' : ''}
            onClick={() => setSelectedProject('project1')}
          >
            {editing.type === 'project' && editing.id === 'project1' ? (
              <input
                type="text"
                value={projectLabels.project1}
                onChange={() => {}}
                onBlur={finishEditing}
                onKeyPress={(e) => e.key === 'Enter' && finishEditing()}
                autoFocus
              />
            ) : (
              <span>{projectLabels.project1}</span>
            )}
            {selectedProject === 'project1' && editing.type !== 'project' && (
              <img
                src={pencil}
                alt="pencil"
                onClick={(e) => {
                  e.stopPropagation()
                  setEditing({ type: 'project', id: 'project1' })
                }}
              />
            )}
          </li>
          <li
            className={selectedProject === 'project2' ? 'selected' : ''}
            onClick={() => setSelectedProject('project2')}
          >
            {editing.type === 'project' && editing.id === 'project2' ? (
              <input
                type="text"
                value={projectLabels.project2}
                onChange={() => {}}
                onBlur={finishEditing}
                onKeyPress={(e) => e.key === 'Enter' && finishEditing()}
                autoFocus
              />
            ) : (
              <span>{projectLabels.project2}</span>
            )}
            {selectedProject === 'project2' && editing.type !== 'project' && (
              <img
                src={pencil}
                alt="pencil"
                onClick={(e) => {
                  e.stopPropagation()
                  setEditing({ type: 'project', id: 'project2' })
                }}
              />
            )}
          </li>
          <img src={Rectangle} alt="rectangle" />
        </ul>
      </div>

      {/* Categories Section */}
      <div className="menu-section">
        <div className="section-header">
          <img src={optionsLines} alt="options-lines" />
          <span>{t('createMenu.categories')}</span>
          <img
            src={plus}
            alt="plus"
            className="header-plus"
            onClick={addCategory}
          />
        </div>
        <ul>
          {categories.map((cat) => (
            <li
              key={cat.id}
              className={selectedCategory === cat.id ? 'selected' : ''}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {editing.type === 'category' && editing.id === cat.id ? (
                <input
                  type="text"
                  value={cat.label}
                  onChange={(e) =>
                    setCategories(
                      categories.map((item) =>
                        item.id === cat.id
                          ? { ...item, label: e.target.value }
                          : item
                      )
                    )
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
                  alt="pencil"
                  onClick={(e) => {
                    e.stopPropagation()
                    setEditing({ type: 'category', id: cat.id })
                  }}
                />
              )}
            </li>
          ))}
          <img src={Rectangle} alt="rectangle" />
        </ul>
      </div>

      {/* Questions Section */}
      <div className="menu-section questions-block">
        <div className="section-header">
          <img src={whitevoprosik} alt="whitevoprosik" />
          <span>{t('createMenu.questions')}</span>
          <img
            src={plus}
            alt="plus"
            className="header-plus"
            onClick={addQuestion}
          />
        </div>
        <QuestionsBlock
          questions={questions}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          editing={editing}
          setEditing={setEditing}
          toggleCheck={toggleCheck}
          setQuestions={setQuestions}
          finishEditing={finishEditing}
          onChangeLabel={handleChangeQuestionLabel}
        />
      </div>

      <div className="menu-section">
        <div className="section-header">
          <img src={star} alt="star" />
          <span>{t('createMenu.achievement')}</span>
          <img
            src={plus}
            alt="plus"
            className="header-plus"
            onClick={addAchievement}
          />
        </div>
        <ul>
          {achievements.map((ach) => (
            <li key={ach.id}>{ach.label}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
