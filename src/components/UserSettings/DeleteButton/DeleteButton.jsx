import styles from "../UserSettingsForm.module.scss";
import { Btn } from "../../Common/Button";
import { Colors } from "../../../constants/Colors";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonMui from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { deleteToken, deleteUser, setToken, setUser } from "../../../store/slices/userSlice";

function DeleteButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    console.log(user);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const cancelDeleteClick = () => {
        console.log("j'annule");
        setOpen(false);
    };

    const confirmdDeleteClick = async () => {
        const response = await fetch(import.meta.env.VITE_API_ROOT + `/user/${user.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            dispatch(deleteUser());
            dispatch(deleteToken());
            console.log("je delete");
            navigate("/");
        }

        setOpen(false);
    };

    return (
        <div className={styles.formButton}>
            <Btn text="Supprimer le compte" color={Colors.Warning} onClick={handleClickOpen} />
            <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"ATTENTION"}</DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Etes-vous sure de vouloir supprimer ce compte?
                    </DialogContentText>
                    <DialogActions>
                        <ButtonMui onClick={cancelDeleteClick}>Annuler</ButtonMui>

                        <ButtonMui onClick={confirmdDeleteClick} autoFocus>
                            confirmer
                        </ButtonMui>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}
export default DeleteButton;
