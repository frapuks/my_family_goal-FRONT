import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Material UI
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
// Slices
import { setToken, setUser } from "../store/slices/userSlice";


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
                <TextField label="Nom" value={lastname} onChange={setLastname} required />
                <TextField label="Prénom" value={firstname} onChange={setFirstname} required />
                <TextField label="Pseudo" value={pseudo} onChange={setPseudo} required />
                <TextField label="Email" value={email} onChange={setEmail} required type="email" />
                <TextField label="Mot de passe" value={password} onChange={setPassword} required type="password" />
                <TextField label="Confirmation du mot de passe" required value={passwordConfirm} onChange={setPasswordConfirm} type="password" />

                <Button type="submit" variant="contained">S'inscrire</Button>
                <Button text="Login" href="/">Retour</Button>
                {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
            </Stack>
        </Box>
    );
};

export default SignUpForm;