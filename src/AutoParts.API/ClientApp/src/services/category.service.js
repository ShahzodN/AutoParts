class CategoryService {
    constructor() {
        this.#baseUrl = 'api/category';
    }

    #baseUrl;

    getAll() {
        return [
            {
                name: 'cat1'
            },
            {
                name: 'cat2'
            },
            {
                name: 'cat3'
            },
            {
                name: 'cat4'
            },
            {
                name: 'cat5'
            },
            {
                name: 'cat6'
            },
            {
                name: 'cat7'
            },
            {
                name: 'cat8'
            },
            {
                name: 'cat9'
            },
            {
                name: 'cat10'
            },
        ]
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
            headers: { 'Content-Type': 'application/type' },
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