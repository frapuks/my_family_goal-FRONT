import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Material UI
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import ButtonMui from "@mui/material/Button";
// Components
import { Colors } from "../../constants/Colors";
import { ValidateButton } from "../Common/ValidateButton";
import { Btn } from "../Common/Button";
import { TextField } from "../Common/TextField";
// Slices
import { setFamilies, setSelectFamily } from "../../store/slices/familiesSlice";
// Styles
import styles from "./FamilySettingsForm.module.scss";

const FamilySettingsForm = () => {
    // UTILS
    const dispatch = useDispatch();
    const navigate = useNavigate();    

    // STATES
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const family = useSelector(state => state.families.selectFamily);
    const [name, setName] = useState(family?.name || "");
    const [isError, setIsError] = useState(false);
    const [open, setOpen] = useState(false);
    // VARIABLES
    const isParent = family.isParent;

    // METHODS

    // Open Modal
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Close modal
    const cancelDeleteClick = () => {
        setOpen(false);
    };

    // on submit form
    const onSubmit = async event => {
        event.preventDefault();
        setIsError(false);

        // API => PATCH family name
        const responsePatchFamily = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
            body: JSON.stringify({name}),
        });

        // API => GET user
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
    };

    // Confirm to delete
    const confirmdDeleteClick = async event => {
        event.preventDefault();
        setIsError(false);

        // API => DELETE family
        const isDelete = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        });

        // API => GET user
        const responseGetUser = await fetch(import.meta.env.VITE_API_ROOT + `/user/${user.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }
        });

        // treatment
        if (isDelete.ok && responseGetUser.ok) {
            // get data from responses
            const { families } = await responseGetUser.json();

            // dispatch states
            if (families) {
                dispatch(setFamilies(families));
                dispatch(setSelectFamily(families[0]));
            } else {
                dispatch(setFamilies([]));
                dispatch(setSelectFamily(null));
            };
            
            // Close modal & redirect
            setOpen(false);
            navigate("/settings");
        } else {
            setIsError(true);
        }
    };

    // CONTENT
    const modaleContent = (
        <>
        <DialogTitle id="alert-dialog-title">{"ATTENTION"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Etes-vous sure de vouloir supprimer cette famille?
            </DialogContentText>
            <DialogActions>
                <ButtonMui onClick={cancelDeleteClick}>Annuler</ButtonMui>
            </DialogActions>
                <ButtonMui onClick={confirmdDeleteClick} color={Colors.Error} autoFocus>Supprimer</ButtonMui>
        </DialogContent>
        </>
    );

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit} className={styles.form}>
                <TextField label="Nom" value={name} onChange={setName} />
                <div className={styles.formButton}>
                    {isParent && <ValidateButton text="Valider les modifications" />}
                    <Btn text="Annuler" color={Colors.Warning} href="/settings" />
                </div>
                <div className={styles.formButton}>
                    {isParent && <Btn text="Supprimer la famille" color={Colors.Error} onClick={handleClickOpen} />}
                    <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        {modaleContent}
                    </Dialog>
                </div>
                {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
            </form>
        </div>
    )
}

export default FamilySettingsForm;