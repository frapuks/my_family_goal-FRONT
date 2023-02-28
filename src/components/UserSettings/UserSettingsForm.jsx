import { useState } from "react";
import { TextField } from "../Common/TextField";
import { ValidateButton } from "../Common/ValidateButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../store/slices/userSlice";
import { Alert } from "@mui/material";
import { Button } from "../Common/Button";
import { Colors } from "../../constants/Colors";
import styles from "./UserSettingsForm.module.scss";

const UserSettingsForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [isError, setIsError] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState();

    const token = useSelector(state => state.user.token);
    const user = useSelector(state => state.user.user);

    console.log("mon token", token);
    console.log("mon user", user);

    const onSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const lastname = data.get("lastname");
        const firstname = data.get("firstname");
        const pseudo = data.get("pseudo");
        const email = data.get("email");
        const password = data.get("password");

        setIsConfirmPasswordValid(true);

        if (password !== passwordConfirm) {
            setIsConfirmPasswordValid(false);

            return;
        }

        setIsError(false);

        // console.log("c'est ma data", lastname, firstname);
        const response = await fetch(import.meta.env.VITE_API_ROOT + "/signup", {
            method: "PATCH",
            headers: { "Content-Type": "application/json", authorization: `bearer ${token}` },
            body: JSON.stringify({
                firstname,
                lastname,
                pseudo,
                email,
                password,
            }),
        });

        if (response.ok) {
            const { token } = await response.json();
            console.log("votre formulaire a été modifié");
            dispatch(setToken(token));

            navigate("/dashboard");
        } else {
            setIsError(true);
        }
    };

    return (
        <form onSubmit={onSubmit} className={styles.container}>
            <TextField label="Nom" name="lastname" placeholder={user.lastname} required />
            <TextField label="Prénom" name="firstname" required />
            <TextField label="Pseudo" name="pseudo" required />
            <TextField label="Email" name="email" required type="email" />
            <TextField label="Mot de passe actuel" name="password" required type="password" />
            <TextField label="Nouveau mot de passe" name="password" required type="password" />
            <TextField
                label="Confirmation du nouveau mot de passe"
                required
                value={passwordConfirm}
                onChange={setPasswordConfirm}
                type="password"
                errorText={isConfirmPasswordValid === false ? "Ne correspond pas au mot de passe entré" : undefined}
            />
            <div className={styles.formButton}>
                <ValidateButton text="Valider les modifications" />
                <Button text="Annuler" color={Colors.Warning} />
            </div>
            {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
            <div className={styles.formButton}>
                <Button text="Déconnexion" color={Colors.Success} href="/" />
                <Button text="Supprimer le compte" color={Colors.Warning} />
            </div>
        </form>
    );
};
export default UserSettingsForm;
