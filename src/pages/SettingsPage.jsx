import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SettingsPage.module.scss";
import { Link } from "react-router-dom";
import logo_setting from "/logo_setting.svg";
import { setActivePage } from "../store/slices/navBarSlice";

function SettingsPage() {
    const families = useSelector(state => state.families.listFamilies);
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

                {
                    families.map((family) => (
                        <li className={styles.li}>
                            <Link className={styles.link} to="/familysettings">Famille : {family.name}</Link>
                        </li>
                    ))
                }

                <li className={styles.li}>
                    <Link className={styles.link} to="/namefamily">
                        CREER UNE NOUVELLE FAMILLE
                    </Link>
                </li>
            </ul>
        </>
    );
}
export default SettingsPage;
