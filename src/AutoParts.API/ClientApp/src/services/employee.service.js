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

  async deleteAccount(id) {
    return await axios.delete(`${this.#baseUrl}/deleteAccount?employeeId=${id}`);
  }

  async update(employee) {
    return await axios.put(`${this.#baseUrl}`, employee);
  }

  async setSchedule(data) {
    return await axios.post(`${this.#baseUrl}/setSchedule`, data);
  }

  async createAccount(data) {
    return await axios.post(`${this.#baseUrl}/createAccount`, data);
  }
}

export default new EmployeeService();