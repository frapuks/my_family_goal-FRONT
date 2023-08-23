import React from "react";
// Components
import NameFamilyForm from "../components/NameFamily/NameFamilyForm";
import logo from "../assets/logo-fond-transparent-sans-police.svg";
// Styles
import styles from "./NameFamilyPage.module.scss";


function NameFamilyPage() {
  return (
    <div>
      <img src={logo} />
      <div>
        <NameFamilyForm />
      </div>
    </div>
  );
}

export default NameFamilyPage;