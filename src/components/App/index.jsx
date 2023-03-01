import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// import de nos components

import LoginPage from "../../pages/LoginPage";
import NavBar from "../NavBar/NavBar";

import ProtectedRoute from "../Routes/ProtectedRoute";

import NonExistentRoute from "./NonExistentRoute";
import SettingsPage from "../../pages/SettingsPage";
import SignUpPage from "../../pages/SignUpPage";
import CreateFamilyPage from "../../pages/CreateFamilyPage";
import NameFamilyPage from "../../pages/NameFamilyPage";
import UserSettingsPage from "../../pages/UserSettingsPage";
import FamilySettingsPage from "../../pages/FamilySettingsPage";
import DashboardPage from "../../pages/DashboardPage";
import Header from "../Header/Header";

function App() {
    const token = useSelector(state => state.user.token);

    return (
        <>
            {token && <Header />}

            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/settings" element={<ProtectedRoute />}>
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
                <Route path="/signup" element={<SignUpPage />} />

                <Route path="/usersettings" element={<ProtectedRoute />}>
                    <Route path="/usersettings" element={<UserSettingsPage />} />
                </Route>

                <Route path="/createfamily" element={<ProtectedRoute />}>
                    <Route path="/createfamily" element={<CreateFamilyPage />} />
                </Route>

                <Route path="/namefamily" element={<ProtectedRoute />}>
                    <Route path="/namefamily" element={<NameFamilyPage />} />
                </Route>

                <Route path="/familysettings" element={<ProtectedRoute />}>
                    <Route path="/familysettings" element={<FamilySettingsPage />} />
                </Route>

                <Route path="/dashboard" element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Route>

                <Route path="*" element={<NonExistentRoute />} />
            </Routes>

            {token && <NavBar />}
        </>
    );
}

export default App;
