import './App.css';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Layouts from './Layouts/index'
import PrivateOutlet from "./Routes/PrivateOutlet";
import Login from './Pages/Login/Login';
// import PublicPa from './Pages/PublicPages/PublicPa';

export default function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<PublicPa />} /> */}
        <Route path="/" element={<Navigate to='/admin' replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<PrivateOutlet />}>
          <Route path="*" element={<Layouts />} />
        </Route>
        <Route path="" element={<Login />} />
      </Routes>
    </>
  );
}