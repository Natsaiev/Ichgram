import { useState } from "react";
import logo from "../../assets/logo/logo.svg";
import styles from "./RegisterForm.module.css";
import { registerUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        fullName: "",
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await registerUser(formData);
            alert(`Registration successful for ${formData.username}!`);
            navigate("/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.logoReg}>
                <img src={logo} alt="ICHGRAM" />
            </div>
            <h3 className={styles.logoH3}>Sign up to see photos and videos from your friends.</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.inputReg}
                />
                <input
                    type="text"
                    placeholder="Full name"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className={styles.inputReg}
                />
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className={styles.inputReg}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.inputReg}
                />
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.button}>Sign up</button>
            </form>
        </div>
    );
};

export default RegisterForm;