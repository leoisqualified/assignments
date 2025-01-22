import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const login = (credentials) => API.post("/users/login", credentials);
export const register = (userData) => API.post("/users/register", userData);
export const getUser = (id) => API.get(`/users/${id}`);
export const getClassroomAssignments = (classroomId) =>
  API.get(`/assignments/${classroomId}`);
export const submitAssignment = (assignmentId, formData) =>
  API.post(`/assignments/${assignmentId}/submit`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getReports = (classroomId) => API.get(`/reports/${classroomId}`);

export default API;
