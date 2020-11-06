import axios from "axios";

const instance = axios.create({
    baseURL: process.env.DEV || process.env.PROD
})

export const getNotesApi = async () => {
    return await instance.get('/api/notes').then(res => res.data)
}

export const createNoteApi = async (note) => {
    return await instance.post('/api/notes', {...note}).then(res => res.data)
}