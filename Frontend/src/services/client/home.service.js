import createApiClient from "./api.service";
class HomeService {
    constructor(baseUrl = "/page-client") {
    this.client = createApiClient(baseUrl);
}
    async getAll() {
        return (await this.client.get('/')).data;
    }
}
export default new HomeService();