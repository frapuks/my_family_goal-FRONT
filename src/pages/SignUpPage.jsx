import React from "react";

import SignUpForm from "../components/SignUp/SignUpForm";
import styles from "./SignUpPage.module.scss";

import { Button } from "../components/Common/Button";
import { Colors } from "../constants/Colors";

import logo from "/logo.svg";

function SignUpPage() {
    return (
        <div className={styles.container}>
            <img src={logo} />

            <SignUpForm />
            <Button text="Login" href="/" color={Colors.Secondary} />
        </div>
    );
}

export default SignUpPage;
