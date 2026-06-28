// API service layer for task endpoints.

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    const errors = error.response?.data?.errors || [];
    const err = new Error(message);
    err.errors = errors;
    err.status = error.response?.status;
    throw err;
  }
);

export async function fetchTasks(params = {}) {
  const { data, pagination } = await api.get('/tasks', { params });
  return { tasks: data, pagination };
}

export async function fetchTaskById(id) {
  const { data } = await api.get(`/tasks/${id}`);
  return data;
}

export async function createTask(payload) {
  const { data } = await api.post('/tasks', payload);
  return data;
}

export async function updateTask(id, payload) {
  const { data } = await api.put(`/tasks/${id}`, payload);
  return data;
}

export async function deleteTask(id) {
  return api.delete(`/tasks/${id}`);
}

export async function fetchStats() {
  const { data } = await api.get('/tasks/stats');
  return data;
}
