import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Material UI
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from "@mui/material";
// Components
import { UserSettingsForm } from "../Components";
import logo from "../assets/logo-fond-transparent-sans-police.svg";
// Slices
import { setActivePage } from "../Store/Slices/navBarSlice";
import { deleteToken } from "../Store/Slices/userSlice";
import { resetFamily } from "../Store/Slices/familiesSlice";


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
                <Box component="img" src={logo} alt="logo The family Goal" sx={{ maxWidth: "50%", margin: "auto" }} />
                <UserSettingsForm />
                <Button variant="outlined" onClick={handleLogout} color="warning">Déconnexion</Button>
                <Button variant="contained" onClick={handleDeleteAccount} color="error">Supprimer le compte</Button>
            </Stack>
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
        </Container>
    );
}

export default UserSettingsPage;