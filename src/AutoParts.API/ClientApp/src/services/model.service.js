class ModelService {
    constructor() {
        this.#baseUrl = 'api/models';
    }

    #baseUrl;

    async getAllManufactors() {
        const response = await fetch(`${this.#baseUrl}/manufactors`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();

        return result;
    }

    async createManufactor(manufactor) {
        const response = await fetch(`${this.#baseUrl}/manufactor`, {
            method: 'post',
            body: JSON.stringify(manufactor),
            headers: { 'Content-Type': 'application/json' }
        });

        return response;
    }

    async deleteManufactor(id) {
        const response = await fetch(`${this.#baseUrl}/manufactor/${id}`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' }
        });

        return response;
    }

    async getAll(manufactor) {
        const response = await fetch(`${this.#baseUrl}?manufactor=${manufactor}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();

        return result;
    }

    async getById(id) {
        const response = await fetch(`${this.#baseUrl}/${id}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        });

        return response;
    }

    async create(model) {
        const response = await fetch(this.#baseUrl, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(model)
        })

        return response;
    }

    async update(model) {
        const response = await fetch(this.#baseUrl, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(model)
        });

        return response;
    }

    async removeSpecificModel(id) {
        const response = await fetch(`${this.#baseUrl}/${id}`, {
            method: 'delete'
        });

        return response;
    }

    async removeAllModels(modelName) {
        const response = await fetch(`${this.#baseUrl}/all/${modelName}`, {
            method: 'delete'
        });

        return response;
    }

    async getBodyTypes() {
        const response = await fetch(`${this.#baseUrl}/bodyTypes`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();

        return result;
    }
}

export default new ModelService();