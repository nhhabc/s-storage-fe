class UserService {
    listeners = [];
    user = null;

    constructor() {
        const token = localStorage.getItem("token");
        if (token) {
            this.user = {
                token: token
            }
        }
    }

    get() {
        return this.user;
    }

    set(newUser) {
        if (this.user === newUser) return;
        this.user = newUser;
        this.listeners.forEach((l) => l(this.user));
    }

    login(token) {
        const loginUser = {
            token: token
        }
        localStorage.setItem('token', token)
        this.set(loginUser);
    }

    logout() {
        this.set(null);
        localStorage.removeItem('token')
    }

    isAuthenticated() {
        return !!this.user;
    }

    subscribe(listenerFunc) {
        this.listeners.push(listenerFunc);
        return () => this.unsubscribe(listenerFunc); // will be used inside React.useEffect
    }

    unsubscribe(listenerFunc) {
        this.listeners = this.listeners.filter((l) => l !== listenerFunc);
    }
}

export default new UserService();