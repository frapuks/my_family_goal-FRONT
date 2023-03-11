import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
// Components
import FamilySettingsForm from "../components/FamilySettings/FamilySettingsForm";
// Slices
import { setActivePage } from '../store/slices/navBarSlice';
// Styles
import styles from "./FamilySettingsPage.module.scss";


function FamilySettingsPage() {
    // UTILS
  const dispatch = useDispatch();

  // USEEFFECT
  useEffect(() => {
    dispatch(setActivePage('settingsPage'));
  }, [dispatch]);


  return(
    <div className={styles.container}>
      <FamilySettingsForm />
    </div>
  );
}

export default FamilySettingsPage;