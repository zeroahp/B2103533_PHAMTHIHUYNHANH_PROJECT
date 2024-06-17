import createApiClient from "./api.service";
class ProductService {
    constructor(baseUrl = "/page-client/product") {
    this.client = createApiClient(baseUrl);
}
    async getAll(option = {}) {
        return (await this.client.get("/", option)).data;
    }
    async get(id) {
        return (await this.client.get(`/${id}`)).data;
    }
    async addToCart(productId, userId) {
        const payload = {
            productId: productId,
            userId: userId
        };
        return (await this.client.post("/add-to-cart", payload)).data;
    }

    async cartDetail() {
        return (await this.client.get("/cart-detail")).data;
    }
    
}
export default new ProductService();