import LoginForm from "../../components/AuthorizationForm/loginForm";
import styles from "./loginPage.module.css";
import loginImage from "../../assets//login_back.png";
import FooterLog from "../../components/AuthorizationForm/footerLog.tsx";

const LoginPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img src={loginImage} alt="Login back" className={styles.loginImage} />
            </div>
        <div className={styles.right}>
            <div className={styles.formContainer}>
            <LoginForm />
            </div>
            <div className={styles.footer}>
            <FooterLog />
            </div>
        </div>
        </div>
    );
};

export default LoginPage;