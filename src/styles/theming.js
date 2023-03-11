import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        warning: {
            main: "#f78888",
        },
        secondary: {
            main: "#5da2d5",
            contrastText: "#F3D250",
        },
        primary: {
            main: "#F3D250",
            contrastText: "#5da2d5",
        },
        success: {
            main: "#90CCF4",
        },
    },
});