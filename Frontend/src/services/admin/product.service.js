import createApiAdmin from "./api.service";
class ContactService {
    constructor(baseUrl = "/api/admins") {
        this.api = createApiAdmin(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }

    async create(data) {
        return (await this.api.post("/create", data)).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }  
    async update(id, data) {
        return (await this.api.put(`/update/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.put(`/${id}`)).data;
    }
    async changeStatus(id) {
        return (await this.api.patch(`/change-status/${id}`)).data;
    }
   
}
export default new ContactService();