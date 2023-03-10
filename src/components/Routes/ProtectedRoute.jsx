import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


function base64ToUTF8String(str) {
    return decodeURIComponent(escape(window.atob(str)));
};

function isTokenValid(token) {
    if (!token) return false;

    // GET payload
    const payloadIndex = token.indexOf(".") + 1;
    const signatureIndex = token.lastIndexOf(".");
    const encodedTokenPayload = token.substring(payloadIndex, signatureIndex);

    // Decode Payload
    const tokenPayload = JSON.parse(base64ToUTF8String(encodedTokenPayload));

    // GET expiration date from payload
    const millisecondsPosix = tokenPayload.exp * 1000;

    // Return if token valid or expired
    return millisecondsPosix - Date.now() > 0;
};

const ProtectedRoute = () => {
    const token = useSelector(state => state.user.token);
    return isTokenValid(token) ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;