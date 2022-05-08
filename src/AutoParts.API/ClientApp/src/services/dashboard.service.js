class Dashboard {
    #BASE_URL = "api/dashboard";

    async getSecret() {
        const response = await fetch(`${this.#BASE_URL}`, {
            method: "get",
            redirect: "follow"
        });

        if (response.status === 401) {
            console.log("redirecting");
            window.location.replace("/signin");
        }

        return response;
    }
}

export default new Dashboard();