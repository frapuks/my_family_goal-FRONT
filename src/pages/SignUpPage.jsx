import React from "react";

import SignUpForm from "../components/SignUp/SignUpForm";
import styles from "./SignUpPage.module.scss";

import logo from "../assets/logo-fond-transparent-sans-police.svg";

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
