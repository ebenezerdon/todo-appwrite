import { useState } from 'react'
import { db } from '../appwrite/databases'
import { NoteType } from '../pages/Notes'

interface NoteFormProps {
  setNotes: (notes: any) => void
}

const NoteForm = ({ setNotes }: NoteFormProps) => {
  const [noteBody, setNoteBody] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const payload = { body: noteBody }

      const response = await db.notes.create(payload)

      setNotes((prevNotes: NoteType[]) => [response, ...prevNotes])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="body" placeholder="What doest thou?" onChange={(e) => setNoteBody(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  )
}

export default NoteForm
