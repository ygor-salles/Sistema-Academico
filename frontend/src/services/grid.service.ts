import axios from 'axios';

const API_URL = 'http://localhost:3333';

export function fetchGrids() {
    return axios(`${API_URL}/grids`)
}