import React from "react";
import { useDispatch } from "react-redux";
import styles from "./SettingsPage.module.scss";
import { Link } from "react-router-dom";
import logo_setting from "/logo_setting.svg";
import { setActivePage } from "../store/slices/navBarSlice";

function SettingsPage() {
    const dispatch = useDispatch();

    // [dispatch] servira à modifier le state uniquement au changement de valeur, et non a chaque nouveau rendu d'une même page par exemple

    React.useEffect(() => {
        dispatch(setActivePage("settingsPage"));
    }, [dispatch]);

    return (
        <>
            <img className="LogoSetting" src={logo_setting} />

            <ul className={styles.container}>
                <li className={styles.li}>
                    <Link className={styles.link} to="/usersettings">
                        PROFIL
                    </Link>
                </li>

                <li className={styles.li}>
                    <Link className={styles.link} to="/familysettings">
                        FAMILLE 1
                    </Link>
                </li>

                <li className={styles.li}>
                    <Link className={styles.link} to="/familysettings">
                        FAMILLE 2
                    </Link>
                </li>
            </ul>
        </>
    );
}
export default SettingsPage;
