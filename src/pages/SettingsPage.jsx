import React from "react";
import { useDispatch } from 'react-redux';
import styles from "./SettingsPage.module.scss";

//Import des reducers du store

import { setActivePage } from '../store/slices/navBarSlice';

function SettingsPage() {
  const dispatch = useDispatch();

    // [dispatch] servira à modifier le state uniquement au changement de valeur, et non a chaque nouveau rendu d'une même page par exemple

  React.useEffect(() => {
    dispatch(setActivePage('settingsPage'));
  }, [dispatch]);  

  const handleModifyProfile = () => {
    window.location.href = '/usersettings';
  };

  const handleModifyFamily = () => {
    window.location.href = '/familysettings';
  }
  return (
    <div className={styles.container}>
      <button onClick={handleModifyProfile}>Modifier mon profil</button>
      <button onClick={handleModifyFamily}>Famille</button>
      <button onClick={handleModifyFamily}>Famille 2</button>
      <button onClick={handleModifyFamily}>Famille 3</button>
      
    </div>

  );
};

export default SettingsPage;