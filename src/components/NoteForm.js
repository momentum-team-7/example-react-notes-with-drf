import axios from 'axios'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'

const NoteForm = ({ token, isLoggedIn, handleDone }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  if (!isLoggedIn) {
    return <Redirect to="/login" />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(
        'http://127.0.0.1:8000/notes/',
        {
          title: title,
          body: body,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((data) => {
        handleDone(data.data)
      })
  }

  return (
    <>
      <h2>Create a new note!</h2>
      <form class="pa4 black-80" onSubmit={handleSubmit}>
        <div>
          <label for="note-title" className="db fw4 lh-copy f6"></label>
          <input
            id="note-title"
            className="pa2 input-reset ba bg-transparent w-100 measure"
            type="text"
            onChange={(event) => setTitle(event.target.value)}
          ></input>
        </div>
        <div>
          <label for="note-body" className="f6 black-60 db mb2">
            A title for your note
          </label>
          <textarea
            id="note-body"
            name="note-body"
            className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2 bg-transparent"
            onChange={(event) => setBody(event.target.value)}
          ></textarea>
          <small id="note-body-desc" className="f6 black-60">
            Type the body of your note here
          </small>
        </div>
        <div class="mt3">
          <button
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
            type="submit"
          >
            Add new note
          </button>
        </div>
      </form>
    </>
  )
}

export default NoteForm
