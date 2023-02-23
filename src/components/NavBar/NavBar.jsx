import React from "react";
import { useSelector } from 'react-redux';

import styles from "./NavBar.module.scss";

function NavBar() {
  const activePage = useSelector(state => state.navBar.activePage);
  console.log(activePage);

  return (
    <nav className={styles.containerNavBar}>
      <ul>
        <li className={activePage === 'settingsPage' ? styles.active : ''}>
          <a href="/settings">SETTING</a>
        </li>
        <li className={activePage === 'dashBoardPage' ? styles.active : ''}>
          <a href="/dashboard">FAMILLE</a>
        </li>
        <li className={activePage === 'userSettingsPage' ? styles.active : ''}>
          <a href="/usersettings">PROFIL</a>
        </li>
         {/* regrouper les pages settings famille egalement sur le même bouton */}
      </ul>
    </nav>
  );
}

export default NavBar;


// return (
//   <div className={styles.containerNavBar}>
//     <a href="/settings"
//     className=
//       {styles.buttonNavBar}
//       {activePage === 'home' ? 'active' : ''}>
//        SETTING
//     </a>
//     <a href="/dashboard" className={styles.buttonNavBar}>
//       FAMILLE
//     </a>
//     <a href="/usersettings" className={styles.buttonNavBar}>
//       PROFIL
//     </a>
//   </div>
// );