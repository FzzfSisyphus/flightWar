import API from "./API";

class accountAPI {
    static login(username, password) {
        return API().post('/login', {
            userName: username,
            password: password
        })
    }

    static signup(userName, password) {
        return API().post('/signup', {
                userName: userName,
                password: password
        })
    }
}

export default accountAPI