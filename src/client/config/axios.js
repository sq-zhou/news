import axios from 'axios';

const service = axios.create({
    timeout: 5000,
    withCredentials: true,
})

export default service