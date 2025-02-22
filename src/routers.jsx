import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "./admin/layouts/AdminLayout.jsx";
import DashboardPage from "./admin/Dashboard/DashboardPage.jsx";
import OrderPage from "./admin/Order/OrderPage.jsx";
import OrderDetailPage from "./admin/Order/OrderDetailPage.jsx";
import OrderEditPage from "./admin/Order/OrderEditPage.jsx";
import UserPage from "./admin/Users/UserPage.jsx";
import UserAddPage from "./admin/Users/UserAddPage.jsx";
import UserEditPage from "./admin/Users/UserEditPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "orders", element: <OrderPage /> },
      { path: "orders/detail/:id", element: <OrderDetailPage /> },
      { path: "orders/edit/:id", element: <OrderEditPage /> },
      { path: "users", element: <UserPage /> },
      { path: "users/add", element: <UserAddPage /> },
      { path: "users/edit/:id", element: <UserEditPage /> },
    ],
  },
]);
