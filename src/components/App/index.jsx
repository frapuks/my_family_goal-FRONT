import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPage from "../../pages/LoginPage";


import NonExistentRoute from "./NonExistentRoute";
import SettingsPage from "../../pages/SettingsPage";
import SignUpPage from "../../pages/SignUpPage";
import UserSettingsPage from "../../pages/UserSettingsPage";
import FamilySettingsPage from "../../pages/FamilySettingsPage";
import DashboardPage from "../../pages/DashboardPage";


function App() {
    const token = useSelector(state => state.user.token);

    return (
        <>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/usersettings" element={<UserSettingsPage />} />
                <Route path="/familysettings" element={<FamilySettingsPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                
                <Route path="*" element={<NonExistentRoute />} />
            </Routes>

            {/* A utiliser une fois le token Ok: */}
            {/* {token && <NavBar />}                          */}
        </>
    );
}

export default App;
