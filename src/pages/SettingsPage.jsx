import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SettingsPage.module.scss";
import { Link } from "react-router-dom";

import { setActivePage } from "../store/slices/navBarSlice";
import { setSelectFamily } from "../store/slices/familiesSlice";

function SettingsPage() {
  const families = useSelector((state) => state.families.listFamilies || []);
  const dispatch = useDispatch();

  // [dispatch] servira à modifier le state uniquement au changement de valeur, et non a chaque nouveau rendu d'une même page par exemple

  React.useEffect(() => {
    dispatch(setActivePage("settingsPage"));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link className={styles.link} to="/usersettings">
            PROFIL
          </Link>
        </li>

        {families.map((family) => (
          <li key={family.id} className={styles.li}>
            <Link
              className={styles.link}
              to="/familysettings"
              onClick={() => dispatch(setSelectFamily(family))}
            >
              Famille : {family.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className={styles.ulCreate}>
        <li className={styles.liCreate}>
          <Link className={styles.link} to="/namefamily">
            CREER UNE NOUVELLE FAMILLE
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default SettingsPage;
