class ProductService {
    #baseUrl = 'api/products';
    products = [
        {
            id: 1,
            name: 'p1'
        },
        {
            id: 2,
            name: 'p2'
        },
        {
            id: 3,
            name: 'p3'
        },
        {
            id: 4,
            name: 'p3'
        },
        {
            id: 5,
            name: 'p3'
        },
        {
            id: 6,
            name: 'p3'
        },
        {
            id: 1,
            name: 'p1'
        },
        {
            id: 2,
            name: 'p2'
        },
        {
            id: 3,
            name: 'p3'
        },
        {
            id: 4,
            name: 'p3'
        },
        {
            id: 5,
            name: 'p3'
        },
        {
            id: 6,
            name: 'p3'
        }
    ]


    async getAll(name) {
        const response = await fetch(`${this.#baseUrl}`);

        return await response.json();
    }
}

export default new ProductService();