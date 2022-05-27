import { axios } from "../axios/axios";

class ConsignmentService {
    #baseUrl = "consignment";

    async getAll() {
        return await axios.get(`${this.#baseUrl}`);
    }

    async getById(id) {
        return await axios.get(`${this.#baseUrl}/${id}`);
    }

    async create(consignment) {
        return await axios.post(`${this.#baseUrl}`, consignment);
    }

    async update(consignment) {
        return await axios.put(`${this.#baseUrl}`, consignment);
    }

    async remove(id) {
        return await axios.delete(`${this.#baseUrl}/${id}`);
    }
}

export default new ConsignmentService();