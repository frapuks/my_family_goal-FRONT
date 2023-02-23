import { createSlice } from '@reduxjs/toolkit';

// création d'un nouveau slice qui recoit un name et un state initiale, activePage servira a definir quelle page est affiché pour mettre en surbrillance le bouton correspondant grâce à une class CSS "isActive".

const navBarSlice = createSlice({
  name: 'navBar',
  initialState: {
    activePage: null,
  },

// reducer contient les méthodes pour agir sur notre initialState -> activePage. setActivePage recevra le state actuel + action.payload qui lui sera créer lors du dispatch et contiendra la page active.

  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
});

// export de la function permettant la mise à jour de notre initialeState: activePage

export const { setActivePage } = navBarSlice.actions;

// export du reducer vers notre store

export default navBarSlice.reducer;