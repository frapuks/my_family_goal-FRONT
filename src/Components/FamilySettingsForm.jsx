import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Material UI
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from "@mui/material";
// Slices
import { setFamilies, setSelectFamily } from "../Store/Slices/familiesSlice";

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
    const isParent = family?.isParent;

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
            const { families } = await responseGetUser.json();
            const family = await responsePatchFamily.json();
            const selectFamily = {
                id : family.id,
                name : family.name,
                isParent : true,
                credit : 0
            }

            // dispatch states
            dispatch(setFamilies(families));
            dispatch(setSelectFamily(selectFamily));

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

    return (
        <Box component="form" onSubmit={onSubmit}>
            <Stack spacing={1}>
                <TextField label="Nom de la famille" value={name} onChange={setName} />
                {isParent && <Button type="submit" variant="contained">Valider</Button>}
                <Button variant="outlined" onClick={() => {navigate("/settings");}}>Annuler</Button>
                {isParent && <Button variant="contained" color="error" onClick={handleClickOpen}>Supprimer</Button>}
                {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
            </Stack>
            <Dialog open={open}>
                <DialogTitle>ATTENTION</DialogTitle>
                <DialogContent>
                    <DialogContentText>Etes-vous sur de vouloir supprimer cette famille?</DialogContentText>
                    <DialogActions>
                        <Button onClick={cancelDeleteClick}>Annuler</Button>
                        <Button variant="contained" onClick={confirmdDeleteClick} color="error">Supprimer</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default FamilySettingsForm;