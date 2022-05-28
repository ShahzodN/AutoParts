import { axios } from "../axios/axios";

class SaleService {
    #BASE_URL = "sale";

    async baseFetch(url, options) {
        const user = localStorage.getItem("user");
        if (user)
            options.headers = { ...options.headers, Authorization: "Bearer " + JSON.parse(user).accessToken };
        return await fetch(url, options);
    }

    async getProducts() {

    }

    async getProduct(ean) {
        return await axios.get(`${this.#BASE_URL}?ean=2000001000014`);
    }

    async create(data) {
        return await axios.post(`${this.#BASE_URL}`, data);
    }
}

export default new SaleService();