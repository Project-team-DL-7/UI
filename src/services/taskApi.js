import axios from "axios";
const API_URL = "http://localhost:8000";

export function getTask(id) {
  return axios.get(`${API_URL}/task/${id}`).then((res) => res.data);
}

export function createTask(task) {
  return axios.post(`${API_URL}/task`, task).then((res) => res.data);
}

export function deleteTask(id) {
  return axios.delete(`${API_URL}/task/${id}`).then((res) => res.data);
}
