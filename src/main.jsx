import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import RootLayout from "./layout/RootLayout/RootLayout";
import Home from "./components/Home/Home";
import AllProducts from "./components/AllProducts/AllProducts";
import AuthProvider from "./context/AuthProvider";
import ErrorPage from "./pages/Error/ErrorPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ProdDetails from "./components/ProdDetails/ProdDetails";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import MyProducts from "./components/MyProducts/MyProducts";
import MyBids from "./components/MyBids/MyBids";
import CreateProduct from "./components/CreateProduct/CreateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allProducts",
        Component: AllProducts,
      },
      {
        path: "/myProducts",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "/myBids",
        element: (
          <PrivateRoute>
            <MyBids></MyBids>
          </PrivateRoute>
        ),
      },
      {
        path: "/createProduct",
        element: (
          <PrivateRoute>
            <CreateProduct></CreateProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/register",
        Component: RegisterPage,
      },
      {
        path: "/productDetails/:id",
        loader: ({ params }) =>
          fetch(
            `https://smart-deals-server-seven-gamma.vercel.app/products/${params.id}`
          ),
        Component: ProdDetails,
      },
      {
        path: "/*",
        Component: ErrorPage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
