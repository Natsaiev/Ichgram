import axios from "axios";

const baseURL = "http://localhost:3000";

export const $api = axios.create({
    baseURL,
});


$api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});


export const registerUser = async (userData: { username: string; email: string; fullName: string; password: string }) => {
    return await $api.post("/api/auth/register", userData);
};
export const loginUser = async (userData: { usernameOrEmail: string; password: string }) => {
    return await $api.post("/api/auth/login", userData);
};