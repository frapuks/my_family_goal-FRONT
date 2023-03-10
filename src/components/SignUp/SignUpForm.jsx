import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Material UI
import { Alert } from "@mui/material";
// Components
import { Btn } from "../../components/Common/Button";
import { Colors } from "../../constants/Colors";
import { TextField } from "../Common/TextField";
import { ValidateButton } from "../Common/ValidateButton";
// Slices
import { setToken, setUser } from "../../store/slices/userSlice";
// Styles
import styles from "./SignUpForm.module.scss";


const SignUpForm = () => {
    // UTILS
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // STATES
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isError, setIsError] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState();
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // METHODS

    // Submit Sign up form
    const onSubmit = async e => {
        e.preventDefault();
        setIsError(false);
        setIsConfirmPasswordValid(true);

        // Check confirm password
        if (password !== passwordConfirm) {
            setIsConfirmPasswordValid(false);
            return;
        };

        // API => POST signup
        const response = await fetch(import.meta.env.VITE_API_ROOT + "/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({lastname, firstname, pseudo, email, password}),
        });

        // treatment
        if (response.ok) {
            // get data
            const { token, user } = await response.json();

            // dispatch states
            dispatch(setToken(token));
            dispatch(setUser(user));

            // redirect
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
            <Btn text="Login" href="/" color={Colors.Secondary} />
            {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
        </form>
    );
};

export default SignUpForm;