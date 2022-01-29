import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.URL
});

export const api = {
  async getNotes({ page = 1 }) {
    return await instance.get(`/api/notes?page=${page}&size=${10}`).then((res) => res.data);
  },
  async getNote(id) {
    return await instance.get(`/api/notes/${id}`).then((res) => res.data);
  },
  async createNote(note) {
    return await instance.post('/api/notes', note).then((res) => res.data);
  },
  async deleteNote(id) {
    return await instance.delete(`/api/notes/${id}`).then((res) => res.data);
  },
  async updateNote(id, note) {
    return await instance.put(`/api/notes/${id}`, note).then((res) => res.data);
  }
};
