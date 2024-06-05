import { useEffect, useState } from 'react'
import { type Models } from 'appwrite'
import { db } from '../appwrite/databases'
import NoteForm from '../components/NoteForm'
import { Query } from 'appwrite'
import Note from '../components/Note'

export interface NoteType extends Models.Document {
  body: string
  completed: boolean
}

const Notes = () => {
  const [notes, setNotes] = useState<NoteType[]>([])

  useEffect(() => {
    const init = async () => {
      const response = await db.notes.list([Query.orderDesc('$createdAt')])

      setNotes(response.documents as NoteType[])
    }

    init()
  }, [])

  return (
    <div>
      <h1>Notes</h1>
      <NoteForm setNotes={setNotes} />

      <div>
        {notes.map((note) => (
          <Note key={note.$id} noteData={note} setNotes={setNotes} />
        ))}
      </div>
    </div>
  )
}

export default Notes
