import React from "react";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme";
//import context
import { SnackbarProvider } from "./context/snackbarContext";
import { AuthProvider } from "./context/authContext";
import { LoadingProvider } from "./context/loadingContext";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <LoadingProvider>
        <SnackbarProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SnackbarProvider>
      </LoadingProvider>
    </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.register()

