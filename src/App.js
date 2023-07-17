import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layaout from "./Layaout";
import Produits from "./components/Produits";
import Fournisseurs from "./components/Fournisseurs";
import Fournisseur from "./components/Fournisseurs/Fournisseur";
import NewFournisseur from "./components/NewFournisseur"


const App = () => {
  return (
  
 
    <Routes> 
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register/>}/>
      <Route path="/" element={<Layaout />}>
        <Route index element= {<Fournisseurs />}/>
        <Route path="rechercher" element={<Produits />}/>
        <Route path="fournisseur" element={<Fournisseur />} />
        <Route path="newFournisseur" element={<NewFournisseur/>}/>
      </Route>
       
    </Routes>
  );
};

export default App;
