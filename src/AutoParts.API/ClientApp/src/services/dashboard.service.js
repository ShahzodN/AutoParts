import { axios } from "../axios/axios";

class Dashboard {
    async getSecret() {
        return await axios.get("dashboard");
    }
}

export default new Dashboard();