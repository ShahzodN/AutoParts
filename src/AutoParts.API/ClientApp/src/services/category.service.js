import { axios } from "../axios/axios";

class CategoryService {
    #baseUrl = "category";

    async getAll() {
        return await axios.get(`${this.#baseUrl}`);
    }

    async getById(id) {
        return await axios.get(`${this.#baseUrl}/${id}`);
    }

    async create(category) {
        return await axios.post(`${this.#baseUrl}`, category);
    }

    async update(category) {
        return await axios.put(`${this.#baseUrl}`, category);
    }

    async remove(id) {
        return await axios.delete(`${this.#baseUrl}/${id}`);
    }
}

export default new CategoryService();