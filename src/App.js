import { useEffect, useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import NoteList from './components/NoteList'
import NoteDetail from './components/NoteDetail'
import useLocalStorageState from 'use-local-storage-state'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useLocalStorageState('notesUsername', '')
  const [token, setToken] = useLocalStorageState('notesToken', '')

  function setAuth(username, token) {
    setUsername(username)
    setToken(token)
  }

  function logOut() {
    setToken(null)
    setUsername(null)
  }

  const isLoggedIn = username && token

  return (
    <>
      <Router>
        <nav className="pa3 pa4-ns">
          <Link
            to="/"
            className="link dim black f6 f5-ns dib mr3"
            title="My Notes"
          >
            Home
          </Link>
          {isLoggedIn ? (
            <Link
              to="/logout"
              className="link dim gray f6 f5-ns dib mr3"
              title="Log Out"
              onClick={logOut}
            >
              Log Out
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="link dim black f6 f5-ns dib mr3"
                title="Register"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="link dim gray f6 f5-ns dib mr3"
                title="Log In"
              >
                Log In
              </Link>
            </>
          )}

          <Link
            to="/notes"
            className="link dim gray f6 f5-ns dib mr3"
            title="My Notes"
          >
            My Notes
          </Link>
        </nav>
        <Switch>
          <Route path="/login">
            <Login setAuth={setAuth} isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/register">
            <Register setAuth={setAuth} isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/notes/:id">
            <NoteDetail isLoggedIn={isLoggedIn} token={token} />
          </Route>
          <Route path="/notes">
            <NoteList isLoggedIn={isLoggedIn} token={token} />
          </Route>
          <Route path="/">
            {!isLoggedIn && <Redirect to="/login" />}
            <Redirect to="/notes" />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
