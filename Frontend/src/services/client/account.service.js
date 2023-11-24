import AccountApi from "./api.service";


class AccountService {
    constructor(baseUrl = "/account") {
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

    async getuser() {
        const option = {
            credentials: 'include',
        }
        return (await this.account.get("/user", option)).data;
    }

    async logout(data) {
        const option = {
            credentials: 'include',
        }
        return (await this.account.post("/logout", data, option)).data;
    }

}
export default new AccountService();