import axios from "axios";

const api = axios.create({
    baseURL: "https://smartcart-ok9m.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;