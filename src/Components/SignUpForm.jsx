import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Material UI
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
// Slices
import { setToken, setUser } from "../Store/Slices/userSlice";


const SignUpForm = () => {
    // UTILS
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // STATES
    const [isError, setIsError] = useState(false);
    const [isErrorConfirmPassword, setIsErrorConfirmPassword] = useState(false);

    // METHODS

    // Submit Sign up form
    const onSubmit = async e => {
        e.preventDefault();
        setIsError(false);
        setIsErrorConfirmPassword(false);

        const data = new FormData(e.currentTarget);
        const firstname = data.get("firstname");
        const lastname = data.get("lastname");
        const pseudo = data.get("pseudo");
        const email = data.get("email");
        const password = data.get("password");
        const passwordConfirm = data.get("passwordConfirm");

        // Check confirm password
        if (password !== passwordConfirm) {
            setIsErrorConfirmPassword(true);
            return;
        };

        // API => POST signup
        const response = await fetch(import.meta.env.VITE_API_ROOT + "/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lastname, firstname, pseudo, email, password }),
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
        <Box component="form" onSubmit={onSubmit} >
            <Stack spacing={1}>
                <TextField name="lastname" label="Nom" required />
                <TextField name="firstname" label="Prénom" required />
                <TextField name="pseudo" label="Pseudo" required />
                <TextField name="email" label="Email" required type="email" />
                <TextField name="password" label="Mot de passe" required type="password" />
                <TextField name="passwordConfirm" label="Confirmation du mot de passe" required type="password" />

                <Button type="submit" variant="contained">S'inscrire</Button>
                <Button href="/">Retour</Button>
                {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
                {isErrorConfirmPassword && <Alert severity="warning">Confirmaton du mot de passe incorrecte</Alert>}
            </Stack>
        </Box>
    );
};

export default SignUpForm;