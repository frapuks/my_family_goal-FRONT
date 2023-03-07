import React from "react";

import NameFamilyForm from "../components/NameFamily/NameFamilyForm";

import styles from "./NameFamilyPage.module.scss";

import logo from "../assets/logo-fond-transparent-sans-police.svg";

function NameFamilyPage() {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} />
      <form className={styles.form}>
      <NameFamilyForm />
      </form>
    </div>
  );
}

export default NameFamilyPage;
