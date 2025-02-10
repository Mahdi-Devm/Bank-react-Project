import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Bank from "./Bank.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./Store.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Bank />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
