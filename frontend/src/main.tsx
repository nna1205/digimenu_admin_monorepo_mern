import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/root_layout/index.tsx";
import SignInPage from "./features/authentication/SignInPage.tsx";
import SignUpPage from "./features/authentication/SignUpPage.tsx";
import ProtectedLayout from "./layouts/protected_layout/index.tsx";
import MenuCategoryPage from "./features/menucategory/index.tsx";
import MenuItemPage from "./features/menuitem/index.tsx";
import OptionGroupPage from "./features/optiongroup/index.tsx";
import StoreDetailPage from "./features/store/index.tsx";
import OrderHistoryPage from "./features/orderhistory/index.tsx";
import OrderCurrentPage from "./features/ordercurrent/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/signin/*",
        element: <SignInPage />,
      },
      {
        path: "/signup/*",
        element: <SignUpPage />,
      },
      {
        element: <ProtectedLayout />,
        path: "dashboard/:id",
        children: [
          {
            path: "",
            element: <StoreDetailPage />,
          },
          {
            path: "current-order",
            element: <OrderCurrentPage />,
          },
          {
            path: "history-order",
            element: <OrderHistoryPage />,
          },
          {
            path: "menu-category",
            element: <MenuCategoryPage />,
          },
          {
            path: "menu-item",
            element: <MenuItemPage />,
          },
          {
            path: "option-group",
            element: <OptionGroupPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
