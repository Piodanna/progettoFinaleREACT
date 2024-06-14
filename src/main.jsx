import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./Components/Layouts/MainLayout/MainLayout.jsx";
import { StoreProvider } from "./Components/State/User/StoreProvider.jsx";
import { Registration } from "./Components/Pages/Registration/Registration.jsx";
import { Login } from "./Components/Pages/Login/Login.jsx";
import { Home } from "./Components/Pages/Home/Home.jsx";
import { NewCorso } from "./Components/Pages/Corsi/NewCorso.jsx";
import { Protected } from "./Protected/Protected.jsx";
import { Corsi } from "./Components/Pages/Corsi/Corsi.jsx";
import { ToastContainer, toast } from "react-toastify"; // Importa la funzione toast
import "react-toastify/dist/ReactToastify.css"; // Importa i CSS di react-toastify

const router = createBrowserRouter([
  {
    element: (
      <StoreProvider>
        <MainLayout />
      </StoreProvider>
    ),
    children: [
      {
        path: "/",
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "registration",
            element: <Registration />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "logged/",
            children: [
              {
                path: "corsi",
                element: (
                  <Protected>
                    <Corsi />
                  </Protected>
                ),
              },
              {
                path: "newCorso",
                element: (
                  <Protected>
                    <NewCorso />
                  </Protected>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
