import React from "react";

import './style.scss';

function NavBar () {
    return (
        <div className="container-navBar">
            <a href="/setting" className="button-navBar">SETTING</a>
            <a href="/dashboard" className="button-navBar">FAMILLE</a>
            <a href="/setting/user" className="button-navBar">PROFIL</a>
        </div>
    )
}

export default NavBar;