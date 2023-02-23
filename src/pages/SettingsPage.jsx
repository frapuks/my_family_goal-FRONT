import React from "react";

import NavBar from "../components/NavBar/NavBar";

//Je veux creer un composant Option du profil qui va etre un bouton qui va rediriger vers la page de modification du profil

function SettingsPage() {

  const handleModifyProfile = () => {
    window.location.href = '/UserSettingsPage';
  };

  const handleModifyFamily = () => {
    window.location.href = '/FamilySettingsPage';
  }
  return (
    <div>
      <button onClick={handleModifyProfile}>Modifier mon profil</button>
      <button onClick={handleModifyFamily}>Famille1</button>
      <button>Famille2</button>
    </div>

  );
};

export default SettingsPage;