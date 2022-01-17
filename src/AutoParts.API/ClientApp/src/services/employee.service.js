
class EmployeeService {
  async getAll() {
    const response = await fetch("/api/employee/all", {
      method: "get",
      headers: { "Content-Type": "application/json" }
    });

    return await response.json();
  }

  async getById(id) {
    const response = await fetch(`/api/employee/${id}`, {
      method: "get",
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json();
    return result;
  }

  async create(employee) {
    const response = await fetch("/api/employee", {
      method: "post",
      body: JSON.stringify(employee),
      headers: { "Content-Type": "application/json" }
    })

    return response;
  }

  async deleteEmployee(id) {
    const response = await fetch(`/api/employee/${id}`, {
      method: "delete",
    });

    return response;
  }

  async update(employee) {
    console.log("employee " + JSON.stringify(employee))
    const response = await fetch("/api/employee", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee)
    });

    return response;
  }

  async createAccount(data) {
    const response = await fetch("/api/employee/create-account", {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    return response;
  }
}

export default new EmployeeService();