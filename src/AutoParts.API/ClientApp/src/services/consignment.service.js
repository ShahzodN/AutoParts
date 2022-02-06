class ConsignmentService {

    #baseUrl;

    constructor() {
        this.#baseUrl = '/api/consignment';
    }

    async getAll() {
        const response = await fetch(this.#baseUrl);

        const result = await response.json();

        return result;
    }

    async getById(id) {
        const response = await fetch(`${this.#baseUrl}/${id}`);

        const result = await response.json();

        return result;
    }

    async create(consignment) {
        const response = await fetch(this.#baseUrl, {
            method: 'post',
            body: JSON.stringify(consignment),
            headers: { "Content-Type": "application/json" }
        });

        return response;
    }

    async update(consignment) {
        const response = await fetch(this.#baseUrl, {
            method: 'put',
            body: JSON.stringify(consignment),
            headers: { "Content-Type": "application/json" }
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

export default new ConsignmentService();