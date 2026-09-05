import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/styles/globals.css";
import "prismjs/themes/prism-tomorrow.css";
import "./docs.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
