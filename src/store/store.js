import { configureStore } from "@reduxjs/toolkit";
// Slices
import userSlice from "./slices/userSlice";
import navBarSlice from "./slices/navBarSlice";
import familiesSlice from "./slices/familiesSlice";
import membersSlice from "./slices/membersSlice";
import tasksSlice from "./slices/tasksSlice";
import rewardsSlice from "./slices/rewardsSlice";

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