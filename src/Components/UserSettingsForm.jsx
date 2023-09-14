import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material UI
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
// Slices
import { setToken, setUser } from "../store/slices/userSlice";
import { setTabValue } from "../store/slices/navBarSlice";


const UserSettingsForm = () => {
    // UTILS
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // STATES
    const listFamilies = useSelector((state) => state.families.listFamilies);
    const token = useSelector(state => state.user.token);
    const user = useSelector(state => state.user.user);
    const [isError, setIsError] = useState(false);

    // METHODS

    // Submit form
    const onSubmit = async event => {
        event.preventDefault();
        setIsConfirmPasswordValid(true);
        setIsError(false);
        const data = new FormData(event.currentTarget);
        const firstname = data.get("firstname");
        const lastname = data.get("lastname");
        const pseudo = data.get("pseudo");
        const email = data.get("email");
        const password = data.get("password");
        const newPassword = data.get("newPassword");
        const newPasswordConfirm = data.get("newPasswordConfirm");
        
        if (newPassword && newPassword !== newPasswordConfirm) {
            setIsConfirmPasswordValid(false);
            return;
        }

        const payload = {
            firstname,
            lastname,
            pseudo,
            email,
        };

        // API => PATCH user
        const response = await fetch(import.meta.env.VITE_API_ROOT + `/user/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
            body: JSON.stringify(newPassword ? { ...payload, password, newPassword } : payload),
        });

        // treatment
        if (response.ok) {
            // get data
            const { token, user } = await response.json();

            // reset states
            dispatch(setToken(token));
            dispatch(setUser(user));

            // redirect
            { listFamilies && listFamilies[0] ? navigate("/dashboard") : navigate("/createfamily") };
            dispatch(setTabValue(1));
        } else {
            setIsError(true);
        }
    };

    return (
        <Box component="form" onSubmit={onSubmit}>
            <Stack spacing={1}>
                <TextField label="Nom" name="lastname" defaultValue={user.lastname} required />
                <TextField label="Prénom" name="firstname" defaultValue={user.firstname} required />
                <TextField label="Pseudo" name="pseudo" defaultValue={user.pseudo} required />
                <TextField label="Email" type="email" name="email" defaultValue={user.email} required />
                <TextField label="Mot de passe actuel" type="password" name="password" />
                <TextField label="Nouveau mot de passe" type="password" name="newPassword" />
                <TextField label="Confirmation du nouveau mot de passe" type="password" name="newPasswordConfirm" />
                <Button type="submit" variant="contained">Valider les modifications</Button>

                {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
            </Stack>
        </Box>
    );
};

export default UserSettingsForm;