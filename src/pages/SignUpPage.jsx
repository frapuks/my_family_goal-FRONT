import React from "react";
// Components
import SignUpForm from "../components/SignUp/SignUpForm";
import logo from "../assets/logo-fond-transparent-sans-police.svg";
// Styles
import styles from "./SignUpPage.module.scss";


function SignUpPage() {
    return (
        <div className={styles.container}>
            <div className={styles.containerLogo}>
                <img className={styles.logo} src={logo} />                
            </div>
            <div className={styles.actionContainer}>
                <SignUpForm />                
            </div>
        </div>
    );
}

export default SignUpPage;