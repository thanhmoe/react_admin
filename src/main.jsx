import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './page/login/login.jsx';
import Product from './page/Product.jsx';
import Customer from './page/customer/Customer.jsx';
import CustomerDetail from './page/customer/CustomerDetail.jsx';
import Staff from './page/Staff.jsx';
import News from './page/News.jsx';
import Category from './page/categoty/category.jsx';
import CategoryDetail from './page/categoty/CategoryDetail.jsx';
import MainLayout from './layout/Index.jsx';

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
  }
  switch (type) {
    case 'success':
      toast.success(content, config);
      break;
    case 'warn':
      toast.warn(content, config);
      break;
    case 'error':
      toast.error(content, config);
      break;
    case 'info':
      toast.info(content, config);
      break;
    default:
      break;
  }
}



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout>
      <App />
    </MainLayout>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/product",
    element: <MainLayout>
      <Product />
    </MainLayout>
  },
  {
    path: "/staff",
    element: <MainLayout>
      <Staff />
    </MainLayout>
  },
  {
    path: "/news",
    element: <MainLayout>
      <News />
    </MainLayout>
  },
  {
    path: "/category",
    element: <MainLayout>
      <Category />
    </MainLayout>
  },
  {
    path: "/category/:categoryId",
    element: <MainLayout>
      <CategoryDetail />
    </MainLayout>
  },
  {
    path: "/customer",
    element: <MainLayout>
      <Customer />
    </MainLayout>
  },
  {
    path: "/customer/:customerId",
    element: <MainLayout>
      <CustomerDetail />
    </MainLayout>
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
