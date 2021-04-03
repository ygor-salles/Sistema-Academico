import axios from 'axios';

const API_URL = 'http://localhost:3333';

export function fetchUsers() {
    return axios(`${API_URL}/users`)
}