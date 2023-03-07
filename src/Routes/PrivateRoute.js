import { Navigate } from "react-router-dom";
import useAuth from "../Helpers/AuthHandler";

export default function PrivateRoute({ children }) {
    // {/* <Route
    //       path="/private-nested/"
    //       element={
    //         <PrivateRoute>
    //           <Layouts />
    //         </PrivateRoute>
    //       }
    //     /> */}
    const auth = useAuth();
    return auth ? children : <Navigate to="/login" />;
}