import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from './auth/Login.jsx';
import LayoutUser from './user/components/layout/LayoutUser.jsx';
import LayoutAdmin from './admin/components/layout/LayoutAdmin.jsx';
import Portal from './admin/portal/Portal.jsx';
import MasterData from './user/master-data/MasterData.jsx';
import MasterDataAdmin from './admin/master-data/MasterDataAdmin.jsx';
import PaguAdmin from './admin/pagu/PaguAdmin.jsx';

const router = createBrowserRouter([

  // Halaman Login
  {
    path: "/",
    element: <Login />,
    loader: async () => {
      if (localStorage.token && localStorage.role !== "admin") {
        return redirect("/master-data");
      }

      if (localStorage.token && localStorage.role === "admin") {
        return redirect("/portal-admin");
      }
      return null;
    },
  },

  // Halaman Portal Admin
  {
    path: "/portal-admin",
    element: <Portal />,
    loader: async () => {
      if (localStorage.token && localStorage.role !== "admin") {
        return redirect("/master-data");
      }
      return null;
    },
  },

  // Login Sebagai User
  {
    element: <LayoutUser />,
    loader: async () => {
      if (!localStorage.token) {
        return redirect("/");
      }
      
      if (localStorage.role === "admin") {
        return redirect("/portal-admin");
      }
      return null;
    },
    children: [
      {
        path: "/master-data",
        element: <MasterData/>,
      },
    ],
  },

  // Login Sebagai Admin
  {
    element: <LayoutAdmin />,
    loader: async () => {
      if (!localStorage.token) {
        return redirect("/");
      }

      if (localStorage.role !== "admin")  {
        return redirect("/master-data");
      }
      return null;
    },
    children: [
      // {
      //   path: "/portal-admin",
      //   element: <Portal />,
      // },
      {
        path: "/master-data-admin",
        element: <MasterDataAdmin />,
      },
      {
        path: "/pagu-admin",
        element: <PaguAdmin />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
)
