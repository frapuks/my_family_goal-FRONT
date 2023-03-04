import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ButtonFamily from "../ButtonFamily/ButtonFamily";
import { useSelector } from "react-redux";

import styles from "./Header.module.scss";

function Header() {

  const listFamilies = useSelector((state) => state.families.listFamilies);

  return (
    <>
      {listFamilies && listFamilies[0] ? (
        <AppBar className={styles.container}>
          <Toolbar className={styles.toolBar}>            
            <ButtonFamily className={styles.button}/>
          </Toolbar>
        </AppBar>
      ) : (
       <></>
      )}
    </>
  );
}

export default Header;
