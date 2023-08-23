import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Material UI
import SettingsIcon from '@mui/icons-material/Settings';
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// Styles
import styles from "./NavBar.module.scss";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { AccountCircle, FamilyRestroom, Favorite, LocationOn, Restore, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const [value, setValue] = useState(1);
    const navigate = useNavigate();
    // STATES
    const activePage = useSelector(state => state.navBar.activePage);
    const listFamilies = useSelector((state) => state.families.listFamilies);

    const onChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) navigate("/settings");
        if (newValue === 1) listFamilies && listFamilies[0] ? navigate("/dashboard") : navigate("/createfamily");
        if (newValue === 2) navigate("/usersettings");
    }

    return (
        // <nav className={styles.containerNavBar}>
        //     <ul>
        //         <li className={activePage === "settingsPage" ? styles.active : ""}>
        //             <Link to="/settings">
        //                 <SettingsIcon fontSize={"large"}/>
        //             </Link>
        //         </li>
        //         <li className={activePage === "dashBoardPage" ? styles.active : ""}>
        //             <Link to={listFamilies && listFamilies[0] ? "/dashboard" : "/createfamily"}>
        //                 <FamilyRestroomIcon fontSize={"large"}/>
        //             </Link>
        //         </li>
        //         <li className={activePage === "userSettingsPage" ? styles.active : ""}>
        //             <Link to={`/usersettings`}>
        //                 <AccountCircleIcon fontSize={"large"}/>
        //             </Link>
        //         </li>
        //     </ul>
        // </nav>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }} elevation={3}>
            <BottomNavigation value={value} onChange={onChange}>
                <BottomNavigationAction label="Réglages" icon={<Settings />} />
                <BottomNavigationAction label="Familles" icon={<FamilyRestroom />} />
                <BottomNavigationAction label="Compte" icon={<AccountCircle />} />
            </BottomNavigation>
        </Paper>
    );
}

export default NavBar;