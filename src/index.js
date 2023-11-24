import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/context";
import { StyledEngineProvider } from '@mui/material/styles';

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </ContextProvider>
);