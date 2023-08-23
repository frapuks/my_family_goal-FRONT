import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Material UI
import { Alert, Box, Button, Stack } from "@mui/material";
// Components
import { TextField } from "../Common/TextField";
import { ValidateButton } from "../Common/ValidateButton";
// Slices
import { addFamily } from "../../store/slices/familiesSlice";
import { selectToken } from "../../store/slices/userSlice";
// Styles
import styles from "./NameFamilyForm.module.scss";


const NameFamilyForm = () => {
    // UTILS
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // STATES
    const [isError, setIsError] = useState(false);
    const token = useSelector(selectToken);

    // METHODS

    // Submit form
    const onSubmit = async event => {
        event.preventDefault();
        setIsError(false);
        const data = new FormData(event.currentTarget);
        const name = data.get("name");
        
        // API => POST create family
        const response = await fetch(import.meta.env.VITE_API_ROOT + "/family", {
            method: "POST",
            headers: { "Content-Type": "application/json", authorization: `bearer ${token}` },
            body: JSON.stringify({name}),
        });

        // treatment
        if (response.ok) {
            // get data
            const { id, name } = await response.json();
            
            // dispatch states
            dispatch(addFamily({ id, name, isParent : true, credit : 0 }));

            // redirect
            navigate("/dashboard");
        } else {
            setIsError(true);
        }
    };

    return (
        <Box component="form" onSubmit={onSubmit}>
            <Stack spacing={1}>
                <TextField label="Nom de votre Famille" name="name" required />
                <Button variant="contained">Valider</Button>
                {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
            </Stack>
        </Box>
    );
};

export default NameFamilyForm;