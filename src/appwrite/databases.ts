import { ID, Models } from 'appwrite'
import { databases } from './config.js'

const { VITE_DATABASE_ID, VITE_NOTES_COLLECTION_ID } = import.meta.env

type DatabaseDocument = Models.Document

interface CollectionsConfig {
  dbId: string
  id: string
  name: string
}

export const db: {
  [key: string]: {
    get: (id: string) => Promise<DatabaseDocument>
    list: () => Promise<Models.DocumentList<DatabaseDocument>>
    create: (payload: any, permissions: string[], id?: string) => Promise<DatabaseDocument>
    update: (id: string, payload: any, permissions: string[]) => Promise<DatabaseDocument>
    delete: (id: string) => Promise<void>
  }
} = {}

const collections: CollectionsConfig[] = [
  {
    dbId: VITE_DATABASE_ID as string,
    id: VITE_NOTES_COLLECTION_ID as string,
    name: 'notes',
  },
]

collections.forEach((col) => {
  db[col.name] = {
    get: (id: string) => databases.getDocument(col.dbId, col.id, id),
    list: () => databases.listDocuments(col.dbId, col.id),
    create: (payload: any, permissions: string[], id: string = ID.unique()) =>
      databases.createDocument(col.dbId, col.id, payload, permissions, [id]),
    update: (id: string, payload: any, permissions: string[]) =>
      databases.updateDocument(col.dbId, col.id, id, payload, permissions),
    delete: (id: string) => databases.deleteDocument(col.dbId, col.id, id) as unknown as Promise<void>,
  }
})
