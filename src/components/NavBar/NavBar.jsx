import React from "react";

import styles from "./NavBar.module.scss";

function NavBar() {
  return (
    <div className={styles.containerNavBar}>
      <a href="/settings" className={styles.buttonNavBar}>
        SETTING
      </a>
      <a href="/dashboard" className={styles.buttonNavBar}>
        FAMILLE
      </a>
      <a href="/usersettings" className={styles.buttonNavBar}>
        PROFIL
      </a>
    </div>
  );
}

export default NavBar;
