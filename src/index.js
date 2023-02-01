import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from './App'
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/authContext";
import { ThemeProvider } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
      <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs">
        <App />
  </ThemeProvider>
      </BrowserRouter>
    </AuthContextProvider>
  // </React.StrictMode>
);

reportWebVitals();
