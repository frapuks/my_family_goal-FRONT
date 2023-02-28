import React from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../store/slices/userSlice";

import styles from "./CreateFamilyPage.module.scss";

import logo from "/logo.svg";

function CreateFamily() {
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const checkToken = () => {
    if (token) {
      navigate("/namefamily");
    }
  }
  
  console.log(token);
  return (    
      <div className={styles.containerCreateFamily}>
        <img src={logo} />
        <h1>Merci pour votre inscription</h1>
        <section className={styles.textWelcomeParents}>
          <p>Bonjour les parents, il est temps de créer votre Famille et de choisir le nom que vous souhaitez lui donner.</p>
          <button onClick={checkToken}>Creer ma famille</button>
        </section>
        <section className={styles.textWelcomeChildrens}>
          <p>Bonjour les enfants, merci de nous rejoindre! Il n&apos;a plus qu&apos;a attendre l&apos;invitation à rejoindre votre famille.</p>
        </section>      
      </div>
  );
}

export default CreateFamily;
