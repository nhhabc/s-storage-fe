import axios from "axios";
import UserService from "../services/UserService";

const DOMAIN = process.env.REACT_APP_DOMAIN_SERVICE ? process.env.REACT_APP_DOMAIN_SERVICE : "http://localhost:3098/api";


let createRequest = (baseURL) => {

    let timeout = 1000 * 60 * 5;
    const request = axios.create({
        baseURL: baseURL,
        timeout: timeout,

    });

    request.interceptors.response.use(response => {
        return response.data;
    }, error => {

        /**
         * perform redirect to login page when server response with status 401 ( un authorization )
         *
         */
        if (error && error.response && (error.response.status === 401 || error.response.status === 403)) {
            UserService.logout();
            // navigate("/login", {replace: true});
        }
        return Promise.reject(error);
    });

    request.interceptors.request.use(function (config) {

        /**
         * add Authorization header to request if user authenticated, run before sent request
         */
        if (UserService.isAuthenticated()) {
            const accessToken = UserService.get().token;
            config.headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        } else {
            config.headers = {
                'Content-Type': 'application/json',
            }
        }
        return config;

    }, function (error) {
        return Promise.reject(error);
    });

    return request;
};


export default createRequest(DOMAIN);