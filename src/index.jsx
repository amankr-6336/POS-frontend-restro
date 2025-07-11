import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./redux/Store";
import { GoogleOAuthProvider } from "@react-oauth/google";




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <GoogleOAuthProvider clientId="78753556384-46rduq832370tio7u4vchbursurm3cqr.apps.googleusercontent.com">
        <Provider store={Store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
