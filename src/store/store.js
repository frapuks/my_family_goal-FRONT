import { configureStore } from "@reduxjs/toolkit";

// Import des différentes Slices de nos components

import userSlice from "./slices/userSlice";
import navBarSlice from "./slices/navBarSlice";
import familiesSlice from "./slices/familiesSlice";
import membersSlice from "./slices/membersSlice";
import tasksSlice from "./slices/tasksSlice";
import rewardsSlice from "./slices/rewardsSlice";

// Export de notre store pour pouvoir utiliser les différentes méthodes de chaque Slice dans notre projet

export const store = configureStore({
    reducer: {
        user: userSlice,
        navBar: navBarSlice,
        families: familiesSlice,
        rewards: rewardsSlice,
        tasks: tasksSlice,
        members: membersSlice
    },
});
