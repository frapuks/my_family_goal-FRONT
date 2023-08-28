import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Material UI
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { AccountCircle, FamilyRestroom, Settings } from "@mui/icons-material";

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