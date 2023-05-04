import { useState } from "react";
import "./App.css";
import { getRef } from "./controllers/getRef";

const App = () => {
  const [reference, setreference] = useState("");
  const [produits, setproduits] = useState();

  const handleChange = (e) => {
    const ref = e.target.value;
    setreference(ref);
  };

  const handleClick = () => {
    const res = getRef(reference);
    const allProduits = res;
    setproduits(allProduits);
  };
  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          value={reference}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <button onClick={handleClick}>recherche</button>
      
        {produits?.map((produit,index)=>(
          <div key={index}>
            <div>{produit.firstName}</div>
            <div>{produit.lastName}</div>
            <div>{produit.age}</div>
            <div>{produit.numero}</div>

          </div>
        ))}
      
      </header>
    </div>
  );
};

export default App;
