import httpClient from "./http-client";

export default {
    getUser(){
        return httpClient.get('/user')
    },

    checkUsername(username) {
        if (!username) return false;
        return httpClient.get('/check/username?u=' + username)
    },

    socialSignup(body) {
        return httpClient.post('/signup/social', body);
    },

    loginSocial(body) {
        return httpClient.post('/login/social', body);
    },

    userLogin(user, pass) {
        return httpClient.post('/login', {
            username: user,
            password: pass
        })
    },

    userSignup (user, pass) {
        return httpClient.post('/signup', {
            username: user,
            password: pass
        })
    },

    getAllUser () {
        return httpClient.get('/all-user')
    },

    updateUserInfo (userId, data) {
        return httpClient.put('/user/' + userId, {
            data
        })
    },

    updateUserPassword (data) {
        return httpClient.put('/updatePassword', {
            data
        })
    },

    deleteAccount(password) {
        return httpClient.delete('/deleteAccount?password=' + password)
    }
}

