import { configureStore } from "@reduxjs/toolkit";
// Slices
import userSlice from "./Slices/userSlice";
import navBarSlice from "./Slices/navBarSlice";
import familiesSlice from "./Slices/familiesSlice";
import membersSlice from "./Slices/membersSlice";
import tasksSlice from "./Slices/tasksSlice";
import rewardsSlice from "./Slices/rewardsSlice";

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