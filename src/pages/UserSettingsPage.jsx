import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Components
import DeleteButton from "../components/UserSettings/DeleteButton/DeleteButton";
import UserSettingsForm from "../components/UserSettings/UserSettingsForm";
import DeconnextionButton from "../components/UserSettings/DeconnexionButton";
// Slices
import { setActivePage } from "../store/slices/navBarSlice";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from "@mui/material";
import logo from "../assets/logo-fond-transparent-sans-police.svg";
import { deleteToken } from "../store/slices/userSlice";
import { resetFamily } from "../store/slices/familiesSlice";


function UserSettingsPage() {
    // UTILS
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const [open, setOpen] = useState(false);

    // USEEFECT
    useEffect(() => {
        dispatch(setActivePage("userSettingsPage"));
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(deleteToken());
        dispatch(resetFamily());
        navigate("/");
    }

    const handleDeleteAccount = () => {
        setOpen(true);
    };
    
    const handleCancel = () => {
        setOpen(false);
    };
    
    const handleConfirmDelete = async () => {
        const response = await fetch(import.meta.env.VITE_API_ROOT + `/user/${user.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            dispatch(deleteUser());
            dispatch(deleteToken());
            navigate("/");
        }

        setOpen(false);
    };


    return (
        <Container>
            <Stack spacing={1}>
                <Box component="img" src={logo} alt="logo The family Goal" sx={{maxWidth:"50%", margin:"auto"}}/>
                <UserSettingsForm />
                <Button variant="outlined" onClick={handleLogout} color="warning">Déconnexion</Button>
                <Button variant="contained" onClick={handleDeleteAccount} color="error">Supprimer le compte</Button>
                <Dialog open={open}>
                    <DialogTitle id="alert-dialog-title">{"ATTENTION"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Etes-vous sur de vouloir supprimer ce compte?
                        </DialogContentText>
                        <DialogActions>
                            <Button onClick={handleCancel}>Annuler</Button>
                            <Button variant="contained" onClick={handleConfirmDelete} color="error">Supprimer</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </Stack>
        </Container>
    );
}

export default UserSettingsPage;