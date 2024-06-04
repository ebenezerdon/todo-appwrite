import { useEffect, useState } from 'react'
import { type Models } from 'appwrite'
import { databases } from '../appwrite/config'

const Notes = () => {
  interface NoteType extends Models.Document {
    body: string
    completed: boolean
  }

  const [notes, setNotes] = useState<NoteType[]>([])

  useEffect(() => {
    const init = async () => {
      const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_NOTES_COLLECTION_ID,
      )

      setNotes(response.documents as NoteType[])
    }

    init()
  }, [])

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.$id}>
            {note.body} - {note.completed ? 'Completed' : 'Not completed'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notes
