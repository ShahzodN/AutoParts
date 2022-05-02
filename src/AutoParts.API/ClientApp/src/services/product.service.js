class ProductService {
    #baseUrl = 'api/products';

    async getProductById(id) {
        const response = await fetch(`${this.#baseUrl}/${id}`, {
            method: 'get',
        });

        const result = await response.json();

        return result;
    }

    async getPreliminaryData() {
        const response = await fetch(`${this.#baseUrl}/preliminary`, {
            method: 'get',
        });

        const result = await response.json();

        return result;
    }

    async getAll(name) {
        const response = await fetch(`${this.#baseUrl}`, {
            headers: { "Content-Type": "application/json" }
        });

        return await response.json();
    }

    async getFilteredProducts(params) {
        const response = await fetch(`${this.#baseUrl}/filter${params}`, {
            method: "get"
        });

        return await response.json();
    }

    // post
    async create(product) {
        const response = await fetch(`${this.#baseUrl}`, {
            method: "post",
            body: JSON.stringify(product),
            headers: { 'Content-Type': 'application/json' }
        })

        return response;
    }

    // update
    async update(product) {
        const response = await fetch(`${this.#baseUrl}`, {
            method: "put",
            body: JSON.stringify(product),
            headers: { 'Content-Type': 'application/json' }
        })

        return response;
    }

    // delete
    async delete(id) {
        const response = await fetch(`${this.#baseUrl}/${id}`, {
            method: "delete",
        });

        return response;
    }
}

export default new ProductService();