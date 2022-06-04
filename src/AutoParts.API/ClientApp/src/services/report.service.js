import { axios } from "../axios/axios";

class ReportsService {
    #BASE_URL = 'reports';

    async getSalesReport(date) {
        return await axios.get(`${this.#BASE_URL}/sales?date=${date}`);
    }

    async getBalanceReport(date) {
        return await axios.get(`${this.#BASE_URL}/balance?date=${date}`);
    }
}

export default new ReportsService();