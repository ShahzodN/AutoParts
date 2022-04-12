class CarService {
    constructor() {
        this.#baseUrl = 'api/cars';
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

    async getAll() {
        const response = await fetch(this.#baseUrl, {
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

    async create(category) {
        const response = await fetch(this.#baseUrl, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        })

        return response;
    }

    async update(category) {
        const response = await fetch(this.#baseUrl, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        });

        return response;
    }

    async remove(id) {
        const response = await fetch(`${this.#baseUrl}/${id}`, {
            method: 'delete'
        });

        return response;
    }
}

export default new CarService();