import RegisterForm from "../../components/AuthorizationForm/registerForm";
import FooterReg from "../../components/AuthorizationForm/footerReg.tsx";
import styles from "./registerPage.module.css";


const RegisterPage = () => {

    return (
        <div className={styles.registerPage}>
            <div className={styles.formContainer}>
                <RegisterForm />
            </div>
            <div className={styles.footer}>
                <FooterReg />
            </div>
        </div>
    )
}

export default RegisterPage;