import { useState } from "react";
import { TextField } from "../Common/TextField";
import { ValidateButton } from "../Common/ValidateButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../store/slices/userSlice";
import { Alert } from "@mui/material";

import styles from "./SignUpForm.module.scss";

const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [isError, setIsError] = useState(false);

    const onSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const lastname = data.get("lastname");
        const firstname = data.get("firstname");
        const pseudo = data.get("pseudo");
        const email = data.get("email");
        const password = data.get("password");

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
            const { token } = await response.json();

            dispatch(setToken(token));
            navigate("/dashboard");
        } else {
            setIsError(true);
        }
    };

    return (
        <form onSubmit={onSubmit} className={styles.container}>
            <TextField label="Nom" name="lastname" required />
            <TextField label="Prénom" name="firstname" required />
            <TextField label="Pseudo" name="pseudo" required />
            <TextField label="Email" name="email" required type="email" />
            <TextField label="Mot de passe" name="password" required type="password" />
            <TextField
                label="Confirmation du mot de passe"
                required
                value={passwordConfirm}
                onChange={setPasswordConfirm}
                type="password"
            />

            <ValidateButton text="S'inscrire" />
            {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
        </form>
    );
};

export default SignUpForm;
