import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ProjectsPage from './components/ProjectsPage'
import CreateProjectPage from './components/CreateProjectPage'
import './App.css'

export default function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<ProjectsPage />} />
            <Route path="/create" element={<CreateProjectPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
