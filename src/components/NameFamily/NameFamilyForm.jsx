import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField } from "../Common/TextField";
import { ValidateButton } from "../Common/ValidateButton";
import { Alert } from "@mui/material";

import styles from "./NameFamilyForm.scss";

const NameFamilyForm = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);

    const onSubmit = async event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get("name");

    setIsError(false);

    const response = await fetch(import.meta.env.VITE_API_ROOT + "/family", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
        }),
    });

    if (response.ok) {
        navigate("/dashboard");
    } else {
        setIsError(true);
    }

    }
    return (
        <form onSubmit={onSubmit} className={styles.container}>
            <TextField label="Nom de votre Famille" name="name" required />
            <ValidateButton text="Valider" />

            {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
        </form>
    )
}

export default NameFamilyForm;