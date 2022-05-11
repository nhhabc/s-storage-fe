import axios from "axios";

const httpClient = axios.create({
    baseURL: "http://localhost:3098",
    timeout: 60000,
    headers: {'Content-Type': 'application/json'}
});

export default httpClient;