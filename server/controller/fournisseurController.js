import mongoose from "mongoose";
import createDynamicModel from "../models/modelFournisseur.js";
import ListFourn from "../models/modelListFourn.js";



export const getPlein =  (req,res)  =>{
  try {
    const {id} = req.query.id
 console.log(id);
    res.status(200).send(id);
    console.log("ma colloc : ",id);
  } catch (error) {
    console.error("Erreur lors de la récupération de plein :", err);
    res.status(500).send({
      message:
        "Une erreur s'est produite lors de la récupération de plein",
    });
  }
}
export const getFournisseurs = async (req, res) => {
  try {
    const fournisseurs = await ListFourn.find({ fieldNames: { $ne: [] } });
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.status(200).send(fournisseurs);
    console.log(fournisseurs);
  } catch (err) {
    console.error("Erreur lors de la récupération des fournisseurs :", err);
    res.status(500).send({
      message:
        "Une erreur s'est produite lors de la récupération des fournisseurs",
    });
  }
};

export const reSaveFournisseur = async (req, res) => {
  try {
    const {data,collectionName} = req.body
    const maCollection = mongoose.connection.collection(collectionName);
    maCollection.insertMany(data);

res.status(200)
  } catch (error) {
    console.error("Erreur lors de la resauvgarde du fournisseur avec nouveau fichier :", error);
    res.status(500).send({
      message: "Erreur lors de la resauvgarde du fournisseur avec nouveau fichier :",
    });
  }
};

export const createFournisseur = async (req, res) => {
  const { collectionName, data } = req.body;

  //fonction pour cree le resume du fournisseur dans la collection listecollections

  //recuperer les champs pour cree le fournisseur dans la Base de donne
  const keys = data.reduce((keys, obj) => {
    Object.keys(obj).forEach((key) => {
      if (!keys.includes(key)) {
        keys.push(key)
      }
    });
    return keys;
  }, []);

  // Ceci est le shema dynamicModel avec la fonction createDynamiqueModel pour avoir
  const Fournisseur = createDynamicModel(collectionName, keys);

  try {
    // Supprimer les anciennes données de la collection
    await Fournisseur.deleteMany();

    // Insérer les nouvelles données dans la collection
    await Fournisseur.create(data);  
    console.log("Données sauvegardées dans la collection :", collectionName);
    res.sendStatus(200);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de fournisseurs new :", error);
    res.status(500).send({
      message: "Erreur lors de la sauvegarde de fournisseurs new",
    });
  }
};


export   const createListFourn = async (req, res) => {
  const { collectionName, fieldNames } = req.body;
  try {
    const fourn = {
      collectionName: collectionName,
      fieldNames: fieldNames,
    };
    const listFourn = new ListFourn(fourn);

    await listFourn.save();
    console.log("le resume du fournisseur a ete cree avec succes :", fourn);
    res.sendStatus(200);
  } catch (error) {
    console.error(
      "Erreur lors de la sauvegarde du fournisseur dans la listeCollection :",
      error
    );
    res.status(500).send({
      message: "Erreur lors de la sauvegarde du fournisseur dans la listeCollection :",
    });
  }
};



export default { getFournisseurs ,getPlein ,createFournisseur, createListFourn };
