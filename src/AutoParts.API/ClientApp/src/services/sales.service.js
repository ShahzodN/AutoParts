import { axios } from "../axios/axios";

class SalesService {
    #BASE_URL = "sale";

    async getSales(params) {
        return await axios.get(`${this.#BASE_URL}?${params}`);
    }

    async getSale(id) {
        return await axios.get(`${this.#BASE_URL}/${id}`);
    }
}

export default new SalesService();