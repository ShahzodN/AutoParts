import { axios } from "../axios/axios";

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

    async signIn(data) {
        return await axios.post("/account/signin", data);
    }

    signOut() {
        localStorage.removeItem("credentials");
    }
}

export default new AuthService();