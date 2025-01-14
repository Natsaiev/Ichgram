import React, { useState } from "react";
import logo from "../../assets/logo/logo.svg";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        fullName: "",
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            // Добавление дополнительных полей
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data:", formData);
        alert(`Registration successful for ${formData.username}!`);
        // Отправка данных на сервер
    };

    return (
        <div className={styles.container}>
            <div className={styles.logoReg}>
                <img
                    src={logo}
                    alt="ICHGRAM"/>
            </div>
            <h3 className={styles.logoH3}>Sign up to see photos and videos
                from your friends.</h3>
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
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={styles.inputReg}
                />
                <div className={styles.agreement}>
                    <p>People who use our service may have uploaded
                        your contact information to Instagram.
                        <a href="#">Learn more</a>
                    </p>
                    <p>
                        By signing up, you agree to our
                        <a href="#">Terms</a>,
                        <a href="#">Privacy Policy</a>
                        and
                        <a href="#">Cookies Policy</a>.
                    </p>
                </div>
                <button type="submit" className={styles.button}>Sign up</button>
            </form>

        </div>
    );
}

export default RegisterForm;