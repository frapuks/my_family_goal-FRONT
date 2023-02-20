import React, { useState } from "react";
import { Button } from "../Common/Button";
import { ButtonType } from "../Common/ButtonType";
import { SettingsButton } from "../Common/SettingsButton";
import { TextField } from "../Common/TextField";
import { ValidateButton } from "../Common/ValidateButton";

function App() {
    const [bobValue, setBobValue] = useState();
    const [bobErrorText, setBobErrorText] = useState();

    const onSubmit = e => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        // Valider les données ici
        const value = data.get("bob");

        if (value !== "bob") {
            setBobErrorText("NEIN");
        } else {
            setBobErrorText();
        }

        // Une fois la validation terminée, si pas d'erreur effectuer les actions
        // comme envoyer le login/password au serveur pour validation
    };

    return (
        <>
            <SettingsButton onClick={() => console.log("je fais les settings!")} />
            <ValidateButton onClick={() => console.log("clickounette")} />
            <Button text="Se Connecter" onClick={() => console.log("connect")} type={ButtonType.Outlined} />

            <form onSubmit={onSubmit}>
                <TextField
                    name="bob"
                    required
                    label="Bobby"
                    value={bobValue}
                    onChange={setBobValue}
                    errorText={bobErrorText}
                />
            </form>
        </>
    );
}

export default App;
