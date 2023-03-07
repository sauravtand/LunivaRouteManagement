import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Helpers/AuthHandler";

export default function PrivateOutlet() {
    const auth = useAuth();
    return auth ? <Outlet /> : <Navigate to="/login" />;
  }