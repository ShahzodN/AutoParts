import axios from "axios";

const ax = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

ax.interceptors.request.use(request => {
    const user = JSON.parse(localStorage.getItem("credentials"));

    if (user)
        request.headers["Authorization"] = `Bearer ${user.accessToken}`;

    return request;
});

ax.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401 && window.location.pathname !== "/signin") {
        window.location.pathname = "/signin";
    }

    return Promise.reject(error);
});

export { ax as axios };