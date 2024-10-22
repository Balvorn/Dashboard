import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/12" />,
  },
  {
    element: <App />,
    path: "/:userId",
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);