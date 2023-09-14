import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// Material UI
import { ThemeProvider } from "@mui/material";
// Components
import App from "./App/App";
// Slices
import { store } from "./Store/store";
// Styles
import { theme } from "./Styles/theming";


import "./Styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <App />
                </Provider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);