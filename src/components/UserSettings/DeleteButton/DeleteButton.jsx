import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Material UI
import ButtonMui from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
// Components
import { Btn } from "../../Common/Button";
import { Colors } from "../../../constants/Colors";
// Slices
import { deleteToken, deleteUser } from "../../../store/slices/userSlice";
// Styles
import styles from "../UserSettingsForm.module.scss";


function DeleteButton() {
    // UTILS
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // STATES
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const [open, setOpen] = useState(false);

    // METHODS

    // Open modale
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Close modale
    const cancelDeleteClick = () => {
        setOpen(false);
    };

    // Delete account
    const confirmdDeleteClick = async () => {
        // API => DELETE account
        const response = await fetch(import.meta.env.VITE_API_ROOT + `/user/${user.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        });

        // treatment
        if (response.ok) {
            // reset states
            dispatch(deleteUser());
            dispatch(deleteToken());
            
            // redirect
            navigate("/");
        }

        // Close modale
        setOpen(false);
    };

    return (
        <div className={styles.formButton}>
            <Btn text="Supprimer le compte" color={Colors.Error} onClick={handleClickOpen} />
            <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"ATTENTION"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Etes-vous sur de vouloir supprimer ce compte?
                    </DialogContentText>
                    <DialogActions>
                        <ButtonMui onClick={cancelDeleteClick}>Annuler</ButtonMui>
                        <ButtonMui onClick={confirmdDeleteClick} autoFocus> confirmer</ButtonMui>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default DeleteButton;