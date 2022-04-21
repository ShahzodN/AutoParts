class ProductService {
    #baseUrl = 'api/products';

    async getPreliminaryData() {
        const response = await fetch(`${this.#baseUrl}/preliminary`, {
            method: 'get',
        });

        const result = await response.json();

        return result;
    }

    async getAll(name) {
        const response = await fetch(`${this.#baseUrl}`);

        return await response.json();
    }

    async create(product) {
        const response = await fetch(`${this.#baseUrl}`, {
            method: 'post',
            body: JSON.stringify(product),
            headers: { 'Content-Type': 'application/json' }
        })

        return response;
    }
}

export default new ProductService();