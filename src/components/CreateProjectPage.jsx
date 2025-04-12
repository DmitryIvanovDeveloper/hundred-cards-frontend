import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import CreateMenu from './CreateMenu'
import CreateProjectLayout from './CreateProjectLayout'
import CreateAchievementLayout from './CreateAchievementsLayout'
import './CreateProjectPage.css'
import { signUp, signIn, makeAdmin, createProject } from '../apiService'

export default function CreateProjectPage() {
  const { t } = useTranslation()
  const [selection, setSelection] = useState({ type: 'project', id: null })
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const hasFetched = useRef(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const createProjectOnLoad = async () => {
      const userData = {
        user: {
          email: "11111441123@example.com",
          first_name: "Mark",
          last_name: "Chill",
          password: "dddd55"
        },
        avatar: ""
      }
      const projectName = "Test Project 1"
      let newToken

      try {
        // Attempt to sign up the user.
        const signUpResponse = await signUp(userData)
        newToken = signUpResponse.token
        setUserName(`${userData.user.first_name} ${userData.user.last_name}`)
        console.log("Sign up successful. Token:", newToken)
      } catch (err) {
        // If sign-up fails due to a unique constraint error, fall back to sign in.
        try {
          const errorResponse = JSON.parse(err.message)
          if (
            errorResponse.user &&
            errorResponse.user.email &&
            errorResponse.user.email.includes("This field must be unique.")
          ) {
            console.log("User already exists, attempting sign in...")
            const signInResponse = await signIn({
              user: {
                email: userData.user.email,
                password: userData.user.password
              }
            })
            newToken = signInResponse.token
            setUserName(`${userData.user.first_name} ${userData.user.last_name}`)
            console.log("Sign in successful. Token:", newToken)
          } else {
            throw err
          }
        } catch (parseError) {
          throw err
        }
      }

      setToken(newToken)

      // Make the user an admin.
      try {
        await makeAdmin(newToken)
        console.log("User is now an admin.")
      } catch (err) {
        console.error("Error making user an admin:", err)
      }

      // Create a new project.
      try {
        const projectData = await createProject(newToken, projectName)
        console.log("New project created:", projectData)
        setSelection({ type: 'project', id: projectData.id })
      } catch (err) {
        console.error("Error creating project:", err)
      }

      setLoading(false)
    }

    createProjectOnLoad()
  }, [])

  return (
    <div className="create-page-wrapper">
      <CreateMenu
        onSelectionChange={setSelection}
        token={token}                       // <-- pass token here
        projectId={selection.id}            // <-- pass projectId here
      />
      <div className="create-page-content">
        {loading ? (
          <div className="loading">{t('loadingMessage', 'Loading...')}</div>
        ) : selection.type === 'achievement' ? (
          <CreateAchievementLayout achievementId={selection.id} />
        ) : selection.id ? (
          <CreateProjectLayout projectId={selection.id} userName={userName}/>
        ) : (
          <div className="loading">{t('noProjectFound', 'No Project Found')}</div>
        )}
      </div>
    </div>
  )
}
