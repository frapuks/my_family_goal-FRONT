import React from "react";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

import { TextField } from "../Common/TextField";
import { ValidateButton } from "../Common/ValidateButton";
import { Alert } from "@mui/material";

import { addFamily, setFamilies } from "../../store/slices/familiesSlice";

import styles from "./NameFamilyForm.module.scss";

const NameFamilyForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isError, setIsError] = useState(false);

    const token = useSelector(selectToken);

    const onSubmit = async event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get("name");

        setIsError(false);

        const response = await fetch(import.meta.env.VITE_API_ROOT + "/family", {
            method: "POST",
            headers: { "Content-Type": "application/json", authorization: `bearer ${token}` },
            body: JSON.stringify({
                name,
            }),
        });

        if (response.ok) {
            const { id, name } = await response.json();
            dispatch(addFamily({ id, name }));
            navigate("/dashboard");
        } else {
            setIsError(true);
        }
    };

    return (
        <form onSubmit={onSubmit} className={styles.container}>
            <TextField label="Nom de votre Famille" name="name" required />
            <ValidateButton text="Valider" />

            {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
        </form>
    );
};

export default NameFamilyForm;
