import axios from "axios";

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_DOMAIN_SERVICE ? process.env.REACT_APP_DOMAIN_SERVICE : "http://localhost:3098",
    timeout: 60000,
    headers: {'Content-Type': 'application/json'}
});

export default httpClient;