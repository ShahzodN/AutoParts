class AuthService {
    #_token;
    #BASE_URL = "/api/account";

    set token(value) {
        this.#_token = value;
    }

    get token() {
        return this.#_token;
    }

    isAuthenticated() {
        return this.#_token ? true : false;
    }

    async signIn(form) {
        const response = await fetch(`${this.#BASE_URL}/signin`, {
            method: "post",
            redirect: "follow",
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" }
        });

        return response;
    }

    async signOut() {
        const response = await fetch(`${this.#BASE_URL}/signout`);
        return response;
    }
}

export default new AuthService();