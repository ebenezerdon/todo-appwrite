import { useState } from 'react'
import { NoteType } from '../pages/Notes'
import { db } from '../appwrite/databases'

interface NoteProps {
  noteData: NoteType
  setNotes: (notes: any) => void
}

const Note = ({ noteData, setNotes }: NoteProps) => {
  const [note, setNote] = useState<NoteType>(noteData)

  const handleUpdate = async () => {
    const completed = !note.completed

    try {
      setNote((prevNote) => ({ ...prevNote, completed }))
      await db.notes.update(note.$id, { completed })
    } catch (error) {
      setNote((prevNote) => ({ ...prevNote, completed: !completed }))
      console.error(error)
    }
  }

  const handleDelete = async () => {
    try {
      await db.notes.delete(note.$id)
      setNotes((prevNotes: NoteType[]) => prevNotes.filter((n: NoteType) => n.$id !== note.$id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <span
        onClick={handleUpdate}
        style={{
          textDecoration: note.completed ? 'line-through' : 'none',
          cursor: 'pointer',
          marginRight: '1rem',
        }}
      >
        {note.body}
      </span>
      <button onClick={handleDelete}>❌</button>
    </div>
  )
}

export default Note
