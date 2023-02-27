import React from "react";

import styles from "./CreateFamilyPage.module.scss";

import logo from "/logo.svg";

function CreateFamily() {
  return (      
      <div className={styles.containerCreateFamily}>
        <img src={logo} />
        <h1>Merci pour votre inscription</h1>
        <section className={styles.textWelcomeParents}>
          <p>Bonjour les parents, il est temps de créer votre Famille et de choisir le nom que vous souhaitez lui donner.</p>
          <a href="/namefamily">Creer ma famille</a>
        </section>
        <section className={styles.textWelcomeChildrens}>
          <p>Bonjour les enfants, merci de nous rejoindre! Il n'a plus qu'a attendre l'invitation à rejoindre votre famille.</p>
        </section>      
      </div>
  );
}

export default CreateFamily;
