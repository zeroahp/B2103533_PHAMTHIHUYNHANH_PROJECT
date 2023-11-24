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
    
}
export default new ProductService();