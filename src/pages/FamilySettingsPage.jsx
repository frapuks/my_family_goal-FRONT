import React from "react";
import { useDispatch } from 'react-redux';
import FamilySettingsForm from "../components/FamilySettings/FamilySettingsForm";

import styles from "./FamilySettingsPage.module.scss";


//Import des reducers du store
import { setActivePage } from '../store/slices/navBarSlice';

function FamilySettingsPage() {
  const dispatch = useDispatch();

    // [dispatch] servira à modifier le state uniquement au changement de valeur, et non a chaque nouveau rendu d'une même page par exemple

  React.useEffect(() => {
    dispatch(setActivePage('settingsPage'));
  }, [dispatch]);

  return(
    <div className={styles.container}>
      <FamilySettingsForm />
    </div>
  );
}

export default FamilySettingsPage;
