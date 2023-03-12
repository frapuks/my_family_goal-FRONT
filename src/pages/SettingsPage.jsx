import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Slices
import { setActivePage } from "../store/slices/navBarSlice";
import { setSelectFamily } from "../store/slices/familiesSlice";
// Styles
import styles from "./SettingsPage.module.scss";


function SettingsPage() {
  // UTILS
  const dispatch = useDispatch();
  // STATES
  const families = useSelector((state) => state.families.listFamilies || []);

  // USEEFFECT
  useEffect(() => {
    dispatch(setActivePage("settingsPage"));
  }, [dispatch]);


  return (
    <div className={styles.container}>

      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link className={styles.link} to="/usersettings">PROFIL</Link>
        </li>
      </ul>
      
      {families[0] && <ul className={styles.ul}>
        {families.map((family) => (
          <li key={family.id} className={styles.li}>
            <Link className={styles.link} to="/familysettings" onClick={() => dispatch(setSelectFamily(family))}>
              Famille : {family.name}
            </Link>
          </li>
        ))}
      </ul> }

      <ul className={styles.ul}>
        <li className={styles.liCreate}>
          <Link className={styles.link} to="/namefamily">CREER UNE NOUVELLE FAMILLE</Link>
        </li>
      </ul>

    </div>
  );
}
export default SettingsPage;