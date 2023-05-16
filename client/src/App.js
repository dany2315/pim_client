import { Route, Routes } from "react-router-dom";
import Layaout from "./Layaout";
import Produits from "./components/Produits";
import Fournisseurs from "./components/Fournisseurs";
import Fournisseur from "./components/Fournisseurs/Fournisseur";
import NewFournisseur from "./components/Fournisseurs/NewFournisseur"


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layaout />}>
        <Route index element={<Produits />} />
        <Route path="fournisseurs" element={<Fournisseurs />}/>
        <Route path="fournisseur" element={<Fournisseur />} />
        <Route path="newFournisseur" element={<NewFournisseur/>}/>
      </Route>
    </Routes>
  );
};

export default App;
