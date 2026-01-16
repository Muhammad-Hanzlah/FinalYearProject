import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ShopContextProvider from "./Context/ShopContext.jsx";
// 1. Import the Provider
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 2. Wrap the app and paste your Client ID here */}
    <GoogleOAuthProvider clientId="488620350004-jj0nvvjprk6pat9co1qgf2lmknmroiku.apps.googleusercontent.com">
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
