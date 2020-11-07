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

export const deleteNoteApi = async (id) => {
    return await instance.delete(`api/notes/${id}`).then(res => res.data)
}

export const getSingleNoteApi = async (id) => {
    return await instance.get(`api/notes/${id}`).then(res => res.data)
}

export const updateNoteApi = async (id, {title, description}) => {
    return await instance.put(`api/notes/${id}`, {title, description}).then(res => res.data)
}