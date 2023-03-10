import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import styles from "./NavBar.module.scss";

function NavBar() {
    const activePage = useSelector(state => state.navBar.activePage);
    const listFamilies = useSelector((state) => state.families.listFamilies);

    return (
        <nav className={styles.containerNavBar}>
            <ul>
                <li className={activePage === "settingsPage" ? styles.active : ""}>
                    <Link to="/settings">
                        <SettingsIcon fontSize={"large"}/>
                    </Link>
                </li>
                <li className={activePage === "dashBoardPage" ? styles.active : ""}>
                    <Link to={listFamilies && listFamilies[0] ? "/dashboard" : "/createfamily"}><FamilyRestroomIcon fontSize={"large"}/></Link>
                </li>
                <li className={activePage === "userSettingsPage" ? styles.active : ""}>
                    <Link to={`/usersettings`}>
                        <AccountCircleIcon fontSize={"large"}/>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
