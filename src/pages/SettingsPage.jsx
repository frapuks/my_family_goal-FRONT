import React from "react";
import { useDispatch } from 'react-redux';
import styles from "./SettingsPage.module.scss";
import { Link } from "react-router-dom";
//Import des reducers du store

import { setActivePage } from '../store/slices/navBarSlice';

function SettingsPage() {
  const dispatch = useDispatch();

    // [dispatch] servira à modifier le state uniquement au changement de valeur, et non a chaque nouveau rendu d'une même page par exemple

  React.useEffect(() => {
    dispatch(setActivePage('settingsPage'));
  }, [dispatch]);  

  return (
    <ul className={styles.container}>
  
        <li>
          <Link to="/usersettings">SETTING</Link>
        </li>
        <li className={styles.li}>
          <Link to="/familysettings">FAMILLE</Link>
        </li>
        <li className={styles.li}>
          <Link to="/familysettings">PROFIL</Link>
        </li>
      
    </ul>
  );
  }
export default SettingsPage;