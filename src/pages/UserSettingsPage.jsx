import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Components
import DeleteButton from "../components/UserSettings/DeleteButton/DeleteButton";
import UserSettingsForm from "../components/UserSettings/UserSettingsForm";
import DeconnextionButton from "../components/UserSettings/DeconnexionButton";
// Slices
import { setActivePage } from "../store/slices/navBarSlice";
// Styles
import styles from "./UserSettingPage.module.scss";


function UserSettingsPage() {
    // UTILS
    const dispatch = useDispatch();

    // USEEFECT
    useEffect(() => {
        dispatch(setActivePage("userSettingsPage"));
    }, [dispatch]);


    return (
        <div className={styles.container}>
            <UserSettingsForm />
            <div className={styles.formButton}>
                <DeconnextionButton />
                <DeleteButton />
            </div>
        </div>
    );
}

export default UserSettingsPage;