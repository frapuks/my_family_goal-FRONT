import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ButtonFamily from "../ButtonFamily/ButtonFamily";
import { useSelector } from "react-redux";

import logo from "../../assets/logo-fond-transparent-sans-police.svg";
import styles from "./Header.module.scss";

function Header() {

  const listFamilies = useSelector((state) => state.families.listFamilies);

  return (
    
    <div className={styles.header}>
      
      {listFamilies && listFamilies[0] ? (
        <AppBar className={styles.container}>
          <Toolbar className={styles.toolBar}>     
            <ButtonFamily className={styles.active}/>
          </Toolbar>
        </AppBar>
      ) : (
       <></>
      )}
    </div>
  );
}

export default Header;
