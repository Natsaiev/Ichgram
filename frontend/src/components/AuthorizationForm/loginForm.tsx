import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { $api } from "../../api/api";
import styles from "./LoginForm.module.css";
import logo from "../../assets/logo/logo.svg";
import OrDivider from "../../customItems/OrDivider.tsx";

const LoginForm = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        usernameOrEmail: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await $api.post("/api/auth/login", userData);
            localStorage.setItem("token", response.data.token);
            navigate("/"); // Перенаправление на главную страницу
        } catch (error: any) {
            setError(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.logoLog}>
                <img
                    src={logo}
                    alt="ICHGRAM"/>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="usernameOrEmail"
                    placeholder="Username or email"
                    value={userData.usernameOrEmail}
                    onChange={handleChange}
                    className={styles.inputLog}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleChange}
                    className={styles.inputLog}
                    required
                />
                {error && <p style={{color: "red"}}>{error}</p>}
                <button type="submit" className={styles.button}>Log in</button>
            </form>
            <OrDivider />
            <div  className={styles.forgotPassword}>
                <a href={"forgotPassword"}>Forgot password?</a>
            </div>
        </div>
    );
};

export default LoginForm;