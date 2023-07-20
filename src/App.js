import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layaout from "./Layaout";
import Produits from "./components/Produits";
import Fournisseurs from "./components/Fournisseurs";
import NewFournisseur from "./components/NewFournisseur";
import { AuthContext } from "./context/authContext";

const App = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);

  return (
    <Routes>
          <Route path="/" element={isAuthenticated?<Layaout />:<Navigate to="login"/>}>
            <Route index element={<Fournisseurs />} />
            <Route path="rechercher" element={<Produits />} />
            <Route path="newFournisseur" element={<NewFournisseur />} />
            
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default App;
