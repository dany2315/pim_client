import { useContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layaout from "./Layaout";
import Produits from "./components/Produits";
import Fournisseurs from "./components/Fournisseurs";
import NewFournisseur from "./components/NewFournisseur";
import { AuthContext } from "./context/authContext";
import DeletePop from "./components/DeletePop";
import Bar from "./Bar";

const App = () => {
  
  const { isAuthenticated } = useContext(AuthContext);

useEffect(()=>{
verifToken()
},[])

const verifToken = async() =>{
 const token = localStorage.getItem("tokNCS")
 
}


  return (
    <Routes>
          <Route path="/" element={isAuthenticated?<Layaout />:<Navigate to="login"/>}>
            <Route index element={<Fournisseurs />} />
            <Route path="rechercher" element={<Produits />} />
            <Route path="newFournisseur" element={<NewFournisseur />} >
              <Route path="delete" element={<DeletePop />} />
            </Route>
          </Route>
          <Route path="bar" element={<Bar />} />
          <Route path="login" element={isAuthenticated?<Navigate to="/"/>:<Login />} />
          <Route path="register" element={isAuthenticated?<Navigate to="/"/>:<Register />} />
    </Routes>
  );
};

export default App;
