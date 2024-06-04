import { Client, Databases } from 'appwrite'

export const client = new Client()

client.setEndpoint(import.meta.env.VITE_ENDPOINT).setProject(import.meta.env.VITE_PROJECT_ID)

export const databases = new Databases(client)
