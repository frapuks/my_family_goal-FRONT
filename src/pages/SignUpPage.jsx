import React from "react";

import SignUpForm from "../components/SignUp/SignUpForm";
import styles from "./SignUpPage.module.scss";

function SignUpPage() {
    return (
        <div className={styles.container}>
            <SignUpForm />
        </div>
    );
}

export default SignUpPage;
