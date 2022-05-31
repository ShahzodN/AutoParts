import { axios } from "../axios/axios";

class AuthService {
    #BASE_URL = "account";

    async signIn(form) {
        return await axios.post(`${this.#BASE_URL}/signin`, form);
    }

    signOut() {
        localStorage.removeItem("credentials");
    }
}

export default new AuthService();