import mongoose from "mongoose";
import ListFourn from "../models/modelListFourn.js";

export const getProduits = async (req,res) =>{
  const ref = req.params.reference; 
  
    try {
      console.log("NUMERO DE REFERENCE TAPER: ",ref);

      const Fournisseurs  = await ListFourn.find({ fieldNames: { $ne: [] } });

      const listeProduits = await Promise.all(Fournisseurs.map(async(Fournisseur)=>{
        const nameFourn = Fournisseur.collectionName
        const maCollection = mongoose.connection.collection(nameFourn);
        const produit = await maCollection.findOne({reference:ref})
        console.log("produit",produit)
       
        return {nameFourn:nameFourn , produit:produit}
      }))
      const produitsNonNuls = listeProduits.filter((item) => item.produit !== null);
      //console.log(req);
      
      console.log("liste des produit des fournisseur avec le nom du fourn : ",produitsNonNuls);

      res.status(200).send(produitsNonNuls);
    } catch (error) {
      console.log("Erreur lors recuperation des produit des fournisseur avec le nom du fourn : ",error);
       res.status(500).send(error);
    }

}

export default {getProduits}