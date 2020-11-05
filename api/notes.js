import axios from "axios";

const instance = axios.create({
    baseURL: process.env.DEV || process.env.PROD
})

export const getNotesApi = async () => {
    return await instance.get('/api/notes').then(res => res.data.data)
}