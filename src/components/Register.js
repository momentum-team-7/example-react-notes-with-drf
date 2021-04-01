import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

function Register({ isLoggedIn, setAuth }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState()

  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios
      .post('http://127.0.0.1:8000/auth/users/', {
        username,
        password,
      })
      .then((res) => {
        return axios
          .post('http://127.0.0.1:8000/auth/token/login', {
            username,
            password,
          })
          .then((data) => {
            if (data && data.data.auth_token) {
              setAuth(username, data.data.auth_token)
            }
          })
      })
      .catch((error) => {
        let errors = []
        if (error.response) {
          const data = error.response.data
          if (data.username) {
            errors = errors.concat(data.username)
          }
          if (data.password) {
            errors = errors.concat(data.password)
          }
        }
      })
  }

  return (
    <div className="Register">
      <h2>
        Register or <Link to="/login">Login</Link>
      </h2>
      <form onSubmit={handleSubmit}>
        {errors && <div class="bg-red white pa3">{errors}</div>}

        <div className="mv2">
          <label className="db mb2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mv2">
          <label className="db mb2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
