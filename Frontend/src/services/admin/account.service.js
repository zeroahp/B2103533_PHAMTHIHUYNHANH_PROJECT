import AccountApi from "./api.service";


class AccountService {
    constructor(baseUrl = "/account-admin") {
        this.account = AccountApi(baseUrl);
    }
    
    async register(data) {
        return (await this.account.post("/register", data)).data;
    }

    async login(data) {
        const option = {
            credentials: 'include',
            body: JSON.stringify(data)
        }
        return (await this.account.post("/login", data, option)).data;
    }

    async welcom() {
        const option = {
            credentials: 'include',
        }
        return (await this.account.get("/welcome", option)).data;
    }

    async accountmanagement() {
        const option = {
            credentials: 'include',
        }
        return (await this.account.get("/account-management", option)).data;
    }
    

}
export default new AccountService();