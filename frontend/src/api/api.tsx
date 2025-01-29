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

$api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && error.response.data.message === 'Token has expired') {
            localStorage.removeItem('token'); // Удаляем токен
            window.location.href = '/login'; // Перенаправляем на логин
        }
        return Promise.reject(error);
    }
);



export const registerUser = async (userData: { username: string; email: string; fullName: string; password: string }) => {
    return await $api.post("/api/auth/register", userData);
};
export const loginUser = async (userData: { usernameOrEmail: string; password: string }) => {
    return await $api.post("/api/auth/login", userData);
};


export const getUserProfile = async () => {
    return await $api.get("/api/user/profile");
};

export const updateUserProfile = async (userData: { username: string; bio: string; avatar: File | null }) => {
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("bio", userData.bio);

    if (userData.avatar) {
        formData.append("avatar", userData.avatar);
    }

    return await $api.put("/api/user/profile", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
