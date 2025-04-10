// src/components/CreateProjectLayout.jsx
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './CreateProjectPage.css'
import addIcon from '../assets/add.svg'

export default function CreateProjectLayout() {
  const { t } = useTranslation()
  const [answers, setAnswers] = useState([
    { id: 1, text: t('secondPage.answer1'), checked: true },
    { id: 2, text: t('secondPage.answer2'), checked: false }
  ])
  const [categoryTitle, setCategoryTitle] = useState(t('createProjectLayout.categoryTitleLabel'))
  const [questionText, setQuestionText] = useState(t('createProjectLayout.questionLabel'))

  const handleAddAnswer = () => {
    const newId = answers.length + 1
    setAnswers([...answers, { id: newId, text: '', checked: false }])
  }

  const handleToggleCheck = (id) => {
    setAnswers(prev =>
      prev.map(ans => (ans.id === id ? { ...ans, checked: !ans.checked } : ans))
    )
  }

  const handleAnswerTextChange = (id, newText) => {
    setAnswers(prev =>
      prev.map(ans => (ans.id === id ? { ...ans, text: newText } : ans))
    )
  }

  const handleDeleteAnswer = (id) => {
    setAnswers(prev => prev.filter(ans => ans.id !== id))
  }

  const handleSave = () => {
    console.log('Saved:', { categoryTitle, questionText, answers })
    alert(t('createProjectLayout.saveButton') + ' (example)!')
  }

  const handleDelete = () => {
    console.log('Deleted (example)!')
    alert(t('createProjectLayout.deleteButton') + ' (example)!')
  }

  return (
    <div className="project-layout">
      <CategorySection title={categoryTitle} onTitleChange={setCategoryTitle} />
      <QuestionSection questionText={questionText} onQuestionChange={setQuestionText} />
      <AnswersSection
        answers={answers}
        onAddAnswer={handleAddAnswer}
        onToggleCheck={handleToggleCheck}
        onAnswerTextChange={handleAnswerTextChange}
        onDeleteAnswer={handleDeleteAnswer}
      />
      <div className="buttons-row">
        <button onClick={handleSave}>{t('createProjectLayout.saveButton')}</button>
        <button onClick={handleDelete}>{t('createProjectLayout.deleteButton')}</button>
      </div>
    </div>
  )
}

function CategorySection({ title, onTitleChange }) {
  const { t } = useTranslation()
  const modules = { toolbar: { container: '#category-toolbar' } }
  const formats = ['bold', 'italic', 'underline']
  return (
    <div className="block-container category-section">
      <div className="category-top-block">
        <div id="category-toolbar">
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
          </span>
        </div>
        <div className="category-title-label">{t('createProjectLayout.categoryTitleLabel')}</div>
      </div>
      <ReactQuill
        value={title}
        onChange={onTitleChange}
        modules={modules}
        formats={formats}
        className="category-editor"
      />
    </div>
  )
}

function QuestionSection({ questionText, onQuestionChange }) {
  const { t } = useTranslation()
  return (
    <div className="block-container question-section">
      <label className="question-label">{t('createProjectLayout.questionLabel')}</label>
      <textarea
        className="question-textarea"
        value={questionText}
        onChange={(e) => onQuestionChange(e.target.value)}
      />
    </div>
  )
}

function AnswersSection({ answers, onAddAnswer, onToggleCheck, onAnswerTextChange, onDeleteAnswer }) {
  const { t } = useTranslation()
  return (
    <div className="block-container answers-section">
      <div className="answers-header">
        <label className="answers-label">{t('createProjectLayout.answersLabel')}</label>
      </div>
      <div className="answers-list">
        {answers.map((ans) => (
          <AnswerItem
            key={ans.id}
            answer={ans}
            onToggleCheck={onToggleCheck}
            onAnswerTextChange={onAnswerTextChange}
            onDeleteAnswer={onDeleteAnswer}
          />
        ))}
      </div>
      <div className="add-answer-button" onClick={onAddAnswer}>
        Add
      </div>
    </div>
  )
}

function AnswerItem({ answer, onToggleCheck, onAnswerTextChange, onDeleteAnswer }) {
  return (
    <div className="answer-item">
      <label className="custom-checkbox">
        <input
          type="checkbox"
          checked={answer.checked}
          onChange={() => onToggleCheck(answer.id)}
        />
        <span className="checkmark"></span>
      </label>
      <input
        className="answer-input"
        type="text"
        value={answer.text}
        onChange={(e) => onAnswerTextChange(answer.id, e.target.value)}
      />
      <button className="delete-answer-btn" onClick={() => onDeleteAnswer(answer.id)}>
        ✕
      </button>
    </div>
  )
}
