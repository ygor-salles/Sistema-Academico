import axios from 'axios';

const API_URL = 'http://localhost:3333';

export function fetchHistorics() {
    return axios(`${API_URL}/historics`)
}