import { useEffect, useState } from 'react'
import axios from 'axios'

const NoteList = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('notesToken'))
    axios
      .get('http://127.0.0.1:8000/notes/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((data) => {
        setNotes(data.data)
      })
  }, [])

  return (
    <main className="notes">
      <h1 className="f5 f4-ns fw6 black-70 ttu tracked">Notes</h1>
      <div>
        {notes.length > 0 &&
          notes.map((note) => (
            <article class="center mw5 mw6-ns br3 hidden ba b--black-10 mv4 note-card">
              <h1 class="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
                {note.title}
              </h1>
              <div class="pa3 bt b--black-10">
                <p class="f6 f5-ns lh-copy measure">{note.body}</p>
              </div>
            </article>
          ))}
      </div>
    </main>
  )
}

export default NoteList
