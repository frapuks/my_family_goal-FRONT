import PropTypes from "prop-types";
import { useState } from "react";
import { TextField } from "../Common/TextField";
import { ValidateButton } from "../Common/ValidateButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../store/slices/userSlice";

import { Alert } from "@mui/material";
import { Btn } from "../Common/Button";

import { Colors } from "../../constants/Colors";
import styles from "./UserSettingsForm.module.scss";

import { useEffect } from "react";


const UserSettingsForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isError, setIsError] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState();

    const token = useSelector(state => state.user.token);
    const user = useSelector(state => state.user.user);

    const [lastname, setLastName] = useState(user.lastname);
    const [firstname, setFirstName] = useState(user.firstname);
    const [pseudo, setPseudo] = useState(user.pseudo);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const canUpdate =
            lastname !== user.lastname ||
            firstname !== user.firstname ||
            pseudo !== user.pseudo ||
            email !== user.email ||
            (newPassword !== "" && newPassword === passwordConfirm);

        setIsChanged(canUpdate);
    }, [lastname, firstname, pseudo, email, password, newPassword, passwordConfirm]);

    const onSubmit = async e => {
        e.preventDefault();

        setIsConfirmPasswordValid(true);

        if (newPassword && newPassword !== passwordConfirm) {
            setIsConfirmPasswordValid(false);
            return;
        }

        setIsError(false);

        const payload = {
            firstname,
            lastname,
            pseudo,
            email,
        };

        const response = await fetch(import.meta.env.VITE_API_ROOT + `/user/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
            body: JSON.stringify(newPassword ? { ...payload, password, newPassword } : payload),
        });

        if (response.ok) {
            const { token, user } = await response.json();
            console.log("votre formulaire a été modifié");

            dispatch(setToken(token));
            dispatch(setUser(user));
            console.log("mon nouveau token", token);
            console.log("mon nouveau user", user);
            navigate("/dashboard");
        } else {
            setIsError(true);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit} className={styles.form}>
                <TextField label="Nom" value={lastname} onChange={setLastName} />
                <TextField label="Prénom" value={firstname} onChange={setFirstName} />
                <TextField label="Pseudo" value={pseudo} onChange={setPseudo} />
                <TextField label="Email" value={email} onChange={setEmail} type="email" />
                <TextField label="Mot de passe actuel" value={password} onChange={setPassword} type="password" />
                <TextField label="Nouveau mot de passe" value={newPassword} onChange={setNewPassword} type="password" />
                <TextField
                    label="Confirmation du nouveau mot de passe "
                    value={passwordConfirm}
                    onChange={setPasswordConfirm}
                    type="password"
                    errorText={isConfirmPasswordValid === false ? "Ne correspond pas au mot de passe entré" : undefined}
                />
                <div className={styles.formButton}>

                    <ValidateButton disabled={!isChanged} text="Valider les modifications" />

                  

                
                    <Btn text="Annuler" color={Colors.Warning} href="/dashboard" />

                </div>
                {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
            </form>
        </div>
    );
};

export default UserSettingsForm;
