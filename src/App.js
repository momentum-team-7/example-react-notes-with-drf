import { useEffect, useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import NoteList from './components/NoteList'
import useLocalStorageState from 'use-local-storage-state'

const App = () => {
  const [username, setUsername] = useLocalStorageState('notesUsername', '')
  const [token, setToken] = useLocalStorageState('notesToken', '')

  function setAuth(username, token) {
    setUsername(username)
    setToken(token)
  }

  function logOut() {
    setToken.reset()
    setUsername.reset()
  }

  const isLoggedIn = true

  return (
    <>
      {isLoggedIn ? (
        <NoteList />
      ) : (
        <Login setAuth={setAuth} isLoggedIn={isLoggedIn} />
      )}
    </>
  )
}

export default App
