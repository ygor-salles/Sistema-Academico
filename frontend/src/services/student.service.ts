import axios from 'axios';

const API_URL = 'http://localhost:3333';

export function fetchStudents() {
    return axios(`${API_URL}/students`)
}