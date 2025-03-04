
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// import theme from "./theme";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ThemeProvider theme={theme}> */}
        <ToastContainer />
        <Provider store={store}>
          <App />
        </Provider>
      {/* </ThemeProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);