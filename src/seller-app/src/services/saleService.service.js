class SaleService {
    #BASE_URL = "http://localhost:5000/api/sale";

    async baseFetch(url, options) {
        const user = localStorage.getItem("user");
        if (user)
            options.headers = { ...options.headers, Authorization: "Bearer " + JSON.parse(user).accessToken };
        return await fetch(url, options);
    }

    async getProducts() {

    }

    async getProduct(ean) {

        const options = {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            }
        };

        const response = await this.baseFetch(`${this.#BASE_URL}?ean=${"2000001000014"}`, options);

        return response;
    }
}

export default new SaleService();