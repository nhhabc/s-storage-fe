import httpClient from "./http-client";

export default {
    checkUsername(username) {
        if (!username) return false;
        return httpClient.get('/check/username?u=' + username)
    },

    socialSignup(body) {
        return httpClient.post('/signup/social', body);
    },

    loginSocial(body) {
        return httpClient.post('/login/social', body);
    }
}