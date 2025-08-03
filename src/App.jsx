// src/App.jsx
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RouterProvider } from "react-router-dom";
import routers from "./routers/Router"; 
import {ResponsiveProvider} from './context/ResponsiveProvider';

function App() {
  return (
    <GoogleOAuthProvider clientId="73302629352-i6aqeke1r6boels9q51mfp4be2ga1agu.apps.googleusercontent.com">
      <ResponsiveProvider>
        <RouterProvider router={routers} />
      </ResponsiveProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
