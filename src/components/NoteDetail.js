import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const NoteDetail = ({ isLoggedIn, token }) => {
  const { id } = useParams()
  const [note, setNote] = useState(null)

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/notes/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((data) => setNote(data.data))
  }, [])

  return (
    note && (
      <article className="pa3 pa5-ns">
        <h1 className="f3 f2-m f1-l">{note.title}</h1>
        <p className="measure lh-copy">{note.body}</p>
      </article>
    )
  )
}

export default NoteDetail
