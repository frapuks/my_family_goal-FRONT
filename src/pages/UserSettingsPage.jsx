import React from "react";
import { useDispatch } from "react-redux";
import DeconnextionButton from "../components/UserSettings/DeconnexionButton";
import DeleteButton from "../components/UserSettings/DeleteButton";
import UserSettingsForm from "../components/UserSettings/UserSettingsForm";
import styles from "./UserSettingPage.module.scss";

// Import de nos components

//Import des reducers du store
import { setActivePage } from "../store/slices/navBarSlice";

function UserSettingsPage() {
    const dispatch = useDispatch();

    // [dispatch] servira à modifier le state uniquement au changement de valeur, et non a chaque nouveau rendu d'une même page par exemple

    React.useEffect(() => {
        dispatch(setActivePage("userSettingsPage"));
    }, [dispatch]);

    return (
        <>
            <UserSettingsForm />
            <div className={styles.formButton}>
                <DeconnextionButton />
                <DeleteButton />
            </div>
        </>
    );
}

export default UserSettingsPage;
