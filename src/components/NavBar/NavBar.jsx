import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./NavBar.module.scss";

function NavBar() {
    const activePage = useSelector(state => state.navBar.activePage);

    return (
        <nav className={styles.containerNavBar}>
            <ul>
                <li className={activePage === "settingsPage" ? styles.active : ""}>
                    <Link to="/settings">SETTING</Link>
                </li>
                <li className={activePage === "dashBoardPage" ? styles.active : ""}>
                    <Link to="/dashboard">FAMILLE</Link>
                </li>
                <li className={activePage === "userSettingsPage" ? styles.active : ""}>
                    <Link to={`/usersettings`}>PROFIL</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
