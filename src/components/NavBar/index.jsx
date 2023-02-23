import React from "react";

import './style.scss';

function NavBar () {
    return (
        <div className="container-navBar">
            <a href="/settings" className="button-navBar">SETTING</a>
            <a href="/dashboard" className="button-navBar">FAMILLE</a>
            <a href="/usersettings" className="button-navBar">PROFIL</a>
        </div>
    )
}

export default NavBar;