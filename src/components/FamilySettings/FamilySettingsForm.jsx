import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FamilySettingsForm.module.scss";
import { Colors } from "../../constants/Colors";
import { ValidateButton } from "../Common/ValidateButton";
import { Btn } from "../Common/Button";
import { TextField } from "../Common/TextField";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { setFamilies, setSelectFamily } from "../../store/slices/familiesSlice";
import ButtonMui from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const FamilySettingsForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();    

    // get intial state
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const family = useSelector(state => state.families.selectFamily);

    // define local state
    const [name, setName] = useState(family?.name || "");
    const [isError, setIsError] = useState(false);
    const [open, setOpen] = useState(false);

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

        // GET user for get families with update
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

    // Open Modal
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Close modal
    const cancelDeleteClick = () => {
        setOpen(false);
    };

    // Confirm to delete
    const confirmdDeleteClick = async event => {
        event.preventDefault();
        setIsError(false);

        // DELETE
        const isDelete = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        });

        // GET user for get families with update
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
            }
            
            // Close modal & redirect
            setOpen(false);
            navigate("/settings");
        } else {
            setIsError(true);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit} className={styles.form}>
                <TextField label="Nom" value={name} onChange={setName} />
                <div className={styles.formButton}>
                    <ValidateButton text="Valider les modifications" />
                    <Btn text="Annuler" color={Colors.Warning} href="/settings" />
                </div>
                <div className={styles.formButton}>
                    <Btn text="Supprimer la famille" color={Colors.Error} onClick={handleClickOpen} />
                    <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
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
                    </Dialog>
                </div>
                {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
            </form>
        </div>
    )
}

export default FamilySettingsForm;