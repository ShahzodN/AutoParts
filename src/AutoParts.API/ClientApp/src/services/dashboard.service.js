import { axios } from "../axios/axios";

class Dashboard {
    #BASE_URL = "dashboard";

    async getStatistics() {
        return await axios.get(`${this.#BASE_URL}`);
    }
}

export default new Dashboard();