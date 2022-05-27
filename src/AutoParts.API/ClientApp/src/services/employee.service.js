import { axios } from "../axios/axios";

class EmployeeService {
  #baseUrl = "employee";

  async getAll() {
    return await axios.get(`${this.#baseUrl}/all`);
  }

  async getById(id) {
    return await axios.get(`${this.#baseUrl}/${id}`);
  }

  async create(employee) {
    return await axios.post(`${this.#baseUrl}`, employee);
  }

  async deleteEmployee(id) {
    return await axios.delete(`${this.#baseUrl}/${id}`);
  }

  async update(employee) {
    return await axios.put(`${this.#baseUrl}`, employee);
  }

  async createAccount(data) {
    return await axios.post(`${this.#baseUrl}/create-account`, data);
  }
}

export default new EmployeeService();