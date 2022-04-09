class CategoryService {
    constructor() {
        this.#baseUrl = 'api/category';
    }

    #baseUrl;

    async getAll() {
        const response = await fetch(this.#baseUrl, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();

        return result;
    }

    async getById(id) {
        const response = await fetch('', {
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

export default new CategoryService();