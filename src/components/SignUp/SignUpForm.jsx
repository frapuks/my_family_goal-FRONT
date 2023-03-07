import React from "react";

import { useState } from "react";
import { TextField } from "../Common/TextField";
import { ValidateButton } from "../Common/ValidateButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../store/slices/userSlice";
import { Alert } from "@mui/material";

import styles from "./SignUpForm.module.scss";

const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isError, setIsError] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState();

    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async e => {
        e.preventDefault();

        setIsConfirmPasswordValid(true);

        if (password !== passwordConfirm) {
            setIsConfirmPasswordValid(false);

            return;
        }

        setIsError(false);

        // console.log("c'est ma data", lastname, firstname);
        const response = await fetch(import.meta.env.VITE_API_ROOT + "/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                lastname,
                firstname,
                pseudo,
                email,
                password,
            }),
        });

        if (response.ok) {
            const { token, user } = await response.json();

            dispatch(setToken(token));

            dispatch(setUser(user));

            navigate("/createfamily");
        } else {
            setIsError(true);
        }
    };

    return (
        <form onSubmit={onSubmit} className={styles.container}>
            <TextField label="Nom" value={lastname} onChange={setLastname} required />
            <TextField label="Prénom" value={firstname} onChange={setFirstname} required />
            <TextField label="Pseudo" value={pseudo} onChange={setPseudo} required />
            <TextField label="Email" value={email} onChange={setEmail} required type="email" />
            <TextField label="Mot de passe" value={password} onChange={setPassword} required type="password" />
            <TextField
                label="Confirmation du mot de passe"
                required
                value={passwordConfirm}
                onChange={setPasswordConfirm}
                type="password"
                errorText={isConfirmPasswordValid === false ? "Ne correspond pas au mot de passe entré" : undefined}
            />

            <ValidateButton text="S'inscrire" />
            {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
        </form>
    );
};

export default SignUpForm;
