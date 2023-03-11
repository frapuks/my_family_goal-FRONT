import React from "react";
import { useSelector } from "react-redux";
// Material UI
import { AppBar, Toolbar } from "@mui/material";
import ButtonFamily from "../ButtonFamily/ButtonFamily"
// Styles
import styles from "./Header.module.scss";

function Header() {
  // STATES
  const listFamilies = useSelector((state) => state.families.listFamilies);

  return (
    <div className={styles.header}>
      {listFamilies && listFamilies[0] && (
        <AppBar className={styles.container}>
          <Toolbar className={styles.toolBar}>     
            <ButtonFamily className={styles.active}/>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}

export default Header;