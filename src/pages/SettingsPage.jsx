import React from "react";


//Je veux creer un composant Option du profil qui va etre un bouton qui va rediriger vers la page de modification du profil

function SettingsPage() {

  const handleModifyProfile = () => {
    window.location.href = '/UserSettingsPage';
  };

  const handleModifyFamily = () => {
    window.location.href = '/FamilySettingsPage';
  }
  return (
    <>
    <NavBar />
    <div>
      <button onClick={handleModifyProfile}>Modifier mon profil</button>
      <button onClick={handleModifyFamily}>Famille</button>
      <button>Famille2</button>
    </div></>

  );
};

export default SettingsPage;