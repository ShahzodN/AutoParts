import { axios } from "../axios/axios";

class ProductService {
    #baseUrl = 'products';

    // get
    async getProductById(id) {
        return await axios.get(`${this.#baseUrl}/${id}`);
    }

    async getPreliminaryData() {
        return await axios.get(`${this.#baseUrl}/preliminary`);
    }

    async getAll() {
        return await axios.get(`${this.#baseUrl}`);
    }

    async getSuggestions(productName) {
        return await axios.get(`${this.#baseUrl}/suggestion?value=${productName}`);
    }

    async getFilteredProducts(params) {
        return await axios.get(`${this.#baseUrl}/filter${params}`);
    }

    // post
    async create(product) {
        return await axios.post(`${this.#baseUrl}`, product);
    }

    // update
    async update(product) {
        return await axios.put(`${this.#baseUrl}`, product);
    }

    // delete
    async delete(id) {
        return await axios.delete(`${this.#baseUrl}/${id}`);
    }
}

export default new ProductService();