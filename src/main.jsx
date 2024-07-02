import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import MainLayout from "./layout/Index.jsx";
import App from "./App.jsx";

import Login from "./page/login/login.jsx";

import AddProduct from "./page/products/AddProduct.jsx";
import FilterableProductTable from "./page/products/FilterableProductTable.jsx";

import Categories from "./page/categories/Categories.jsx";
import CategoryDetail from "./page/categories/CategoryDetail.jsx";

import Customer from "./page/customers/Customer.jsx";
import CustomerDetail from "./page/customers/CustomerDetail.jsx";


//custom notification
export const notify = (type, content, position) => {
  const config = {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  switch (type) {
    case "success":
      toast.success(content, config);
      break;
    case "warn":
      toast.warn(content, config);
      break;
    case "error":
      toast.error(content, config);
      break;
    case "info":
      toast.info(content, config);
      break;
    default:
      break;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <App />
      </MainLayout>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/products",
    element: (
      <MainLayout>
        <FilterableProductTable />
      </MainLayout>
    ),
  },
  // {
  //   path: "/products/:id",
  //   element: (
  //     <MainLayout>
  //       <AddProduct />
  //     </MainLayout>
  //   ),
  // },
  {
    path: "/categories",
    element: (
      <MainLayout>
        <Categories />
      </MainLayout>
    ),
  },
  // {
  //   path: "/categories/:id",
  //   element: (
  //     <MainLayout>
  //       <CategoryDetail />
  //     </MainLayout>
  //   ),
  // },
  {
    path: "/customers",
    element: (
      <MainLayout>
        <Customer />
      </MainLayout>
    ),
  },
  // {
  //   path: "/customers/:id",
  //   element: (
  //     <MainLayout>
  //       <CustomerDetail />
  //     </MainLayout>
  //   ),
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
