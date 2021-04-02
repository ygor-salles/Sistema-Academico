import axios from 'axios';

const API_URL = 'http://localhost:3333';

export function fetchDisciplines() {
    return axios(`${API_URL}/disciplines`)
}