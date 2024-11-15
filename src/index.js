import React from "react";
import ReactDOM from "react-dom/client";
import "./style/global.css";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import {persistStore} from "redux-persist"
const root = ReactDOM.createRoot(document.getElementById("root"));


let persistor = persistStore(store)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <NextUIProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </NextUIProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
