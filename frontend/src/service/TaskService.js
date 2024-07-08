import axios from 'axios';

const API_URL = '/tasks';

export default {
  getTasks() {
    return axios.get(API_URL);
  },
  updateTaskStatus(id, status) {
    return axios.put(`${API_URL}/status/${id}`, { status });
  },
  deleteTask(id) {
    return axios.delete(`${API_URL}/${id}`);
  },
  updateTask(id, title) {
    return axios.put(`${API_URL}/${id}`, { title });
  },
  createTask(title) {
    return axios.post(API_URL, { title });
  }
};