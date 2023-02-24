import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = useSelector(state => state.user.token);

    return isTokenValid(token) ? <Outlet /> : <Navigate to="/" />;
};

/**
 * Permet de décoder une chaine utf8 encodée en base64
 * Récupéré de MDN: https://developer.mozilla.org/fr/docs/Glossary/Base64
 * @param {*} str chaine encodée en Base64
 * @returns chaîne décodée
 */
function base64ToUTF8String(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

function isTokenValid(token) {
    if (!token) {
        return false;
    }

    // decode le token pour avoir la date d'expiration
    // Un token JWT est composé de la manière suivante
    // header.payload.signature
    // chaque élément est encodé en base64
    // Ici notre date d'expiration se situe dans la payload sur le champ "exp"
    const payloadIndex = token.indexOf(".") + 1;
    const signatureIndex = token.lastIndexOf(".");
    const encodedTokenPayload = token.substring(payloadIndex, signatureIndex);

    const tokenPayload = JSON.parse(base64ToUTF8String(encodedTokenPayload));

    // On récupère la date d'expiration et on vérifie qu'elle n'est pas passée
    // Date POSIX = nombre de secondes depuis le 1er Janvier 1970
    const millisecondsPosix = tokenPayload.exp * 1000;

    return millisecondsPosix - Date.now() > 0;
}

export default ProtectedRoute;
