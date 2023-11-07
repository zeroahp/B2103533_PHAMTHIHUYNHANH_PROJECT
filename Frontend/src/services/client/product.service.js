import createApiClient from "./api.service";
class ContactService {
    constructor(baseUrl = "/api/products") {
    this.client = createApiClient(baseUrl);
}
    async getAll() {
        return (await this.client.get("/")).data;
    }
}
export default new ContactService();