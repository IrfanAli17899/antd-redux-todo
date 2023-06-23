import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'http://localhost:4000'
});

export function setAxiosToken(token:string) {
    localStorage.setItem('token', token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export default axios;