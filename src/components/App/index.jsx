import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// import de nos components

import LoginPage from "../../pages/LoginPage";
import NavBar from "../NavBar/NavBar";

import NonExistentRoute from "./NonExistentRoute";
import SettingsPage from "../../pages/SettingsPage";
import SignUpPage from "../../pages/SignUpPage";
import UserSettingsPage from "../../pages/UserSettingsPage";
import FamilySettingsPage from "../../pages/FamilySettingsPage";
import DashboardPage from "../../pages/DashboardPage";
import Header from "../Header/Header";


function App() {
    const token = useSelector(state => state.user.token);

    return (
        <>
            {token &&<Header/>}
            
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/usersettings" element={<UserSettingsPage />} />
                <Route path="/familysettings" element={<FamilySettingsPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                
                <Route path="*" element={<NonExistentRoute />} />
            </Routes>

            
            {token && <NavBar/>}
        </>
    );
}

export default App;
