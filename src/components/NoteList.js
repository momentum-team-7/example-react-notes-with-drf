import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import NoteForm from './NoteForm'

const NoteList = ({ isLoggedIn, token }) => {
  const [notes, setNotes] = useState([])
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/notes/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((data) => {
        setNotes(data.data)
      })
  }, [token])

  if (!isLoggedIn) {
    return <Redirect to="/login" />
  }

  return (
    <main className="notes">
      {isCreating ? (
        <NoteForm
          token={token}
          isLoggedIn={isLoggedIn}
          handleDone={(newNote) => {
            debugger
            setIsCreating(false)
            setNotes([...notes, newNote])
          }}
        />
      ) : (
        <button
          className="f6 link dim br2 ph3 pv2 mb2 dib white bg-dark-gray"
          onClick={() => setIsCreating(true)}
        >
          Add a note
        </button>
      )}
      <h1 className="f5 f4-ns fw6 black-70 ttu tracked">Notes</h1>
      <div>
        {notes.length > 0 &&
          notes.map((note) => (
            <article
              key={note.id}
              className="mw5 mw6-ns br3 hidden ba b--black-10 mv4 note-card"
            >
              <Link to={`/notes/${note.id}`} className="link">
                <h1 className="f4 bg-near-black light-silver hover-orange br3 br--top black-60 mv0 pv2 ph3">
                  {note.title}
                </h1>
              </Link>
              <div className="pa3 bt b--black-10 bg-washed-blue">
                <p className="f6 f5-ns lh-copy measure">{note.body}</p>
              </div>
            </article>
          ))}
      </div>
    </main>
  )
}

export default NoteList
