import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");

    if (token) {
        // Декодируем JWT токен, чтобы получить информацию о времени истечения (например, 'exp')
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Декодируем payload из JWT токена
        const expirationTime = decodedToken.exp * 1000; // Преобразуем время из секунд в миллисекунды
        const currentTime = Date.now();

        // Проверяем, не истек ли токен
        if (currentTime > expirationTime) {
            // Если токен истек, удаляем его из localStorage и перенаправляем на страницу логина
            localStorage.removeItem("token");
            return <Navigate to="/login" replace />;
        }
    }

    // Если токен есть и он не истек, то рендерим дочерние компоненты
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;