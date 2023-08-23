import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material UI
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
// Components
import { Btn } from "../Common/Button";
import { Colors } from "../../constants/Colors";
import { ValidateButton } from "../Common/ValidateButton";
// Slices
import { setToken, setUser } from "../../store/slices/userSlice";
// Styles
import styles from "./UserSettingsForm.module.scss";


const UserSettingsForm = () => {
    // UTILS
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // STATES
    const listFamilies = useSelector((state) => state.families.listFamilies);
    const token = useSelector(state => state.user.token);
    const user = useSelector(state => state.user.user);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isError, setIsError] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState();
    const [lastname, setLastName] = useState(user.lastname);
    const [firstname, setFirstName] = useState(user.firstname);
    const [pseudo, setPseudo] = useState(user.pseudo);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isChanged, setIsChanged] = useState(false);

    // USEEFFECT
    useEffect(() => {
        const canUpdate =
            lastname !== user.lastname ||
            firstname !== user.firstname ||
            pseudo !== user.pseudo ||
            email !== user.email ||
            (newPassword !== "" && newPassword === passwordConfirm);

        setIsChanged(canUpdate);
    }, [lastname, firstname, pseudo, email, password, newPassword, passwordConfirm]);

    // METHODS

    // Submit form
    const onSubmit = async e => {
        e.preventDefault();
        setIsConfirmPasswordValid(true);
        setIsError(false);

        if (newPassword && newPassword !== passwordConfirm) {
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
            {listFamilies && listFamilies[0] ? navigate("/dashboard") : navigate("/createfamily")};
        } else {
            setIsError(true);
        }
    };

    return (
        <Box component="form" onSubmit={onSubmit}>
            <Stack spacing={1}>
                <TextField label="Nom" value={lastname} onChange={setLastName} />
                <TextField label="Prénom" value={firstname} onChange={setFirstName} />
                <TextField label="Pseudo" value={pseudo} onChange={setPseudo} />
                <TextField label="Email" value={email} onChange={setEmail} type="email" />
                <TextField label="Mot de passe actuel" value={password} onChange={setPassword} type="password" />
                <TextField label="Nouveau mot de passe" value={newPassword} onChange={setNewPassword} type="password" />
                <TextField label="Confirmation du nouveau mot de passe " value={passwordConfirm} onChange={setPasswordConfirm} type="password" />
                <Button disabled={!isChanged} variant="contained">Valider les modifications</Button>
                
                {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
            </Stack>
        </Box>
    );
};

export default UserSettingsForm;