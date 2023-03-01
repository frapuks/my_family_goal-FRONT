import { configureStore } from "@reduxjs/toolkit";

// Import des différentes Slices de nos components

import userSlice from "./slices/userSlice";
import navBarSlice from "./slices/navBarSlice";
import familiesSlice from "./slices/familiesSlice";

// Export de notre store pour pouvoir utiliser les différentes méthodes de chaque Slice dans notre projet

export const store = configureStore({
    reducer: {
        user: userSlice,
        navBar: navBarSlice,
        families: familiesSlice,
    },
});
