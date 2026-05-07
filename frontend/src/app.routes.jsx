import { createBrowserRouter, Outlet } from "react-router"; // 1. Import Outlet
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Protected from "./features/auth/components/protected";
import Home from "./features/interview/Pages/Home";
import Interview from "./features/interview/Pages/interview";
import Navbar from "./features/interview/components/Navbar"; // 2. Import Navbar

// 3. Define a layout that includes the Navbar and the Outlet
const ProtectedLayout = () => (
    <Protected>
        <Navbar />
        {/* The Outlet is where the Home or Interview component will render */}
        <Outlet /> 
    </Protected>
);

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        // 4. Wrap Home and Interview inside the ProtectedLayout
        path: '/',
        element: <ProtectedLayout />, 
        children: [
            {
                index: true, // Matches the base path "/"
                element: <Home />
            },
            {
                path: "interview/:interviewId",
                element: <Interview />
            }
        ]
    }
]);