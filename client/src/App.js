import { Route, Routes } from "react-router-dom";
import Layaout from "./Layaout";
import Produits from "./components/Produits";
import Fournisseurs from "./components/Fournisseurs";
import Fournisseur from "./components/Fournisseurs/Fournisseur";
import NewFournisseur from "./components/NewFournisseur"


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layaout />}>
        <Route index element={<Fournisseurs />} />
        <Route path="rechercher" element={<Produits />}/>
        <Route path="fournisseur" element={<Fournisseur />} />
      </Route>
    </Routes>
  );
};

export default App;
