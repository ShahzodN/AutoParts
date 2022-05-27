import { axios } from "../axios/axios";

class ModelService {
    #baseUrl = "models";

    async getAllManufactors() {
        return await axios.get(`${this.#baseUrl}/manufactors`);
    }

    async createManufactor(manufactor) {
        return await axios.post(`${this.#baseUrl}/manufactor`, manufactor);
    }

    async deleteManufactor(id) {
        return await axios.delete(`${this.#baseUrl}/manufactor/${id}`);
    }

    async getAll(manufactor) {
        return await axios.get(`${this.#baseUrl}?manufactor=${manufactor}`);
    }

    async getById(id) {
        return await axios.get(`${this.#baseUrl}/${id}`);
    }

    async create(model) {
        return await axios.post(`${this.#baseUrl}`, model);
    }

    async update(model) {
        return await axios.put(`${this.#baseUrl}`, model);
    }

    async removeSpecificModel(id) {
        return await axios.delete(`${this.#baseUrl}/${id}`);
    }

    async removeAllModels(modelName) {
        return await axios.delete(`${this.#baseUrl}/all/${modelName}`);
    }

    async getBodyTypes() {
        return await axios.get(`${this.#baseUrl}/bodyTypes`);
    }

    async getModelsWithYearsOfIssue(manufactorId) {
        return await axios.get(`${this.#baseUrl}/withYears/${manufactorId}`);
    }

    async getModelsName(name) {
        return await axios.get(`${this.#baseUrl}/names/${name}`);
    }
}

export default new ModelService();