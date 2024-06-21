import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Login from './page/login/login.jsx';
import Product from './page/Product.jsx';
import Customer from './page/Customer.jsx';
import Staff from './page/Staff.jsx';
import News from './page/News.jsx';
import MainLayout from './layout/Index.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout>
      <App/>
    </MainLayout>
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/product",
    element: <MainLayout>
      <Product/>
    </MainLayout>
  },
  {
    path: "/staff",
    element: <MainLayout>
      <Staff/>
    </MainLayout>
  },
  {
    path: "/news",
    element: <MainLayout>
      <News/>
    </MainLayout>
  },
  {
    path: "/customer",
    element: <MainLayout>
      <Customer/>
    </MainLayout>
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
