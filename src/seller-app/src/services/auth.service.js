class AuthService {
    #BASE_URL = "http://localhost:5000/api/account";

    async baseFetch(url, options) {
        const response = await fetch(`${this.#BASE_URL}${url}`, options);
        return response;
    }

    async signIn(form) {
        const options = {
            method: "post",
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" }
        };

        const response = await this.baseFetch("/signin", options);
        const json = await response.json();
        console.log(json);

        if (response.ok)
            localStorage.setItem("user", JSON.stringify(json));
        else
            return json;

        return { status: "ok" };
    }

    async signOut() {
        const response = await fetch(`${this.#BASE_URL}/signout`);
        return response;
    }
}

export default new AuthService();