import React from "react";

import NameFamilyForm from "../components/NameFamily/NameFamilyForm";

import styles from "./NameFamilyPage.module.scss";

import logo from "/logo.svg";

function NameFamilyPage() {
  return (
    <div className={styles.container}>
      <img src={logo} />
      <NameFamilyForm />
    </div>
  );
}

export default NameFamilyPage;
