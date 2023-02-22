import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Login } from "../Login/Login";
import NavBar from "../NavBar";
import NonExistentRoute from "./NonExistentRoute";

function App() {
    const token = useSelector(state => state.user.token);

    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="*" element={<NonExistentRoute />} />
            </Routes>
            {token && <NavBar />}
        </>
    );
}

export default App;
