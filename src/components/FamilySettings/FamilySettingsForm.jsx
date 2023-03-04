import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FamilySettingsForm.module.scss";
import { Colors } from "../../constants/Colors";
import { ValidateButton } from "../Common/ValidateButton";
import { Button } from "../Common/Button";
import { TextField } from "../Common/TextField";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { setFamilies, setSelectFamily } from "../../store/slices/familiesSlice";

const FamilySettingsForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // get intial state
    const token = useSelector(state => state.user.token);
    const user = useSelector(state => state.user.user);
    const family = useSelector(state => state.families.selectFamily);

    // define local state
    const [name, setName] = useState(family.name);
    const [isError, setIsError] = useState(false);

    // on submit form
    const onSubmit = async event => {
        event.preventDefault();
        setIsError(false);

        // PATCH family name
        const responsePatchFamily = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
            body: JSON.stringify({name}),
        });

        // GET user fot get families with update
        const responseGetUser = await fetch(import.meta.env.VITE_API_ROOT + `/user/${user.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }
        });

        // treatment
        if (responsePatchFamily.ok && responseGetUser.ok) {
            // get data from responses
            const family = await responsePatchFamily.json();
            const { families } = await responseGetUser.json();

            // dispatch states
            dispatch(setFamilies(families));
            dispatch(setSelectFamily(family));

            // redirect
            navigate("/settings");
        } else {
            setIsError(true);
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit} className={styles.form}>
                <TextField label="Nom" value={name} onChange={setName} />
                <div className={styles.formButton}>
                    <ValidateButton text="Valider les modifications" />
                    <Button text="Annuler" color={Colors.Warning} href="/settings" />
                </div>
                {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
            </form>
        </div>
    )
}

export default FamilySettingsForm;