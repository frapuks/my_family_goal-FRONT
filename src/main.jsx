import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";

import App from "./components/App";
import { store } from "./store/store";
import { theme } from "./styles/theming";

import "./styles/index.scss";

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
