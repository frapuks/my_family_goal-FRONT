import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Material UI
import { Alert } from "@mui/material";
// Components
import logo from "../assets/logo-fond-transparent-sans-police.svg";
import { Btn } from "../components/Common/Button";
import { Colors } from "../constants/Colors";
import { TextField } from "../components/Common/TextField";
import { ValidateButton } from "../components/Common/ValidateButton";
// Slices
import { setFamilies } from "../store/slices/familiesSlice";
import { setToken, setUser } from "../store/slices/userSlice";
// Styles
import styles from "./LoginPage.module.scss";


function LoginPage() {
    // UTILS
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // STATES
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isError, setIsError] = useState(false);

    // METHODS

    // Submit form to login
    const onSubmit = async e => {
        e.preventDefault();
        setIsLoggingIn(true);
        setIsError(false);

        // get data from login form
        const data = new FormData(e.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        // API => POST login
        const response = await fetch(import.meta.env.VITE_API_ROOT + "/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password,}),
        });

        // treatment
        if (response.ok) {
            // get data from response
            const { token, user } = await response.json();
            const { families, ...userData } = user;

            // dispatch states
            dispatch(setToken(token));
            dispatch(setUser(userData));
            dispatch(setFamilies(families));

            // redirect if user has family
            families === null ? navigate("/createfamily") : navigate("/dashboard");
        } else {
            setIsError(true);
        }

        setIsLoggingIn(false);
    };


    return (
        <div className={styles.container}>
            <div className={styles.containerLogo}>
                <img className={styles.logo} src={logo} alt="logo The family Goal" />
                <h1 className={styles.titre}>My Family Goal</h1>
            </div>

            <div className={styles.actionContainer}>
                <form onSubmit={onSubmit} className={styles.form}>
                    {isError && <Alert severity="warning">Email ou mot de passe invalide</Alert>}

                    <TextField name="email" label="Email" type="email" required disabled={isLoggingIn} />
                    <TextField name="password" label="Mot de passe" type="password" required disabled={isLoggingIn} />
                    <ValidateButton disabled={isLoggingIn} />
                    <Btn text="S'inscrire" href="/signup" color={Colors.Secondary} />
                </form>
            </div>
        </div>
    );
}

export default LoginPage;