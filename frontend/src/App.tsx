import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import RegisterPage from './pages/registerPage/registerPage';
import LoginPage from "./pages/loginPage/loginPage";
import ProfilePage from "./pages/profilePage/profilePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import Layout from "./components/Layout/Layout.tsx";
import HomePage from "./pages/HomePage/HomePage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                {/* Защищенные маршруты */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="edit-profile" element={<EditProfilePage />} />
                    </Route>
                </Route>


                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
}

export default App;
