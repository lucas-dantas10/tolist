import axios from 'axios';

export function login({commit}, user) {
    return axios.post('http://localhost:8080/api/login', user);
}

