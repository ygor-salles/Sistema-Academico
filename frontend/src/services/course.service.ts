import axios from 'axios';

const API_URL = 'http://localhost:3333';

export function fetchCourses() {
    return axios(`${API_URL}/courses`)
}