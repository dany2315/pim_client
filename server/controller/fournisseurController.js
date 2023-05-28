import mongoose from "mongoose";
import createDynamicModel from "../models/modelFournisseur.js";
import ListFourn from "../models/modelListFourn.js";

export const getFournisseurs = async (req, res) => {
  try {
  } catch (error) {}
};




export const saveFournisseur = async (req, res) => {
  const { collectionName, data } = req.body;

  const keys = data.reduce((keys, obj) => {
    Object.keys(obj).forEach((key) => {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    });
    return keys;
  }, []);

  // Ceci est le shema dynamicModel avec la fonction createDynamiqueModel pour avoir
  const Fournisseur = createDynamicModel(collectionName, keys);



  const createListFourn = async () => {
    try {
      //supprimer la collection listFourn
      ListFourn.deleteMany();
      // Récupérer les noms de toutes les collections et filtrer pour recuperer que du schema Fournisseur
      const collectionNames = await mongoose.connection.db
        .listCollections()
        .toArray();
        const schemaNames = mongoose.schemaNames();
        console.log("liste de shema :",schemaNames);
      const fournisseurCollections = collectionNames.filter((collection) => {
        // Vérifier si le nom du model commence est "Fournisseur"
        const modelName = mongoose.model(collection.name).modelName;
        return modelName === Fournisseur.modelName;
      });
  
      //fonction map pour recuperer de chaque collection les donne
      // Agréger les données pour chaque collection
      const collectionData = await Promise.all(
        fournisseurCollections.map(async (collection) => {
          const { name: collectionName } = collection;
  
          // Récupérer le nombre d'objets dans la collection
          const documentCount = await Fournisseur.countDocuments({});
  
          // Récupérer les noms de champs de la collection
          const fieldNames = Object.keys(Fournisseur.schema.paths);
  
          return {
            collectionName,
            documentCount,
            fieldNames,
          };
        })
      );
  
      // Créer une instance de CollectionGroup avec les données agrégées
      const listeCollection = new ListFourn({
        collections: collectionData,
      });
  
      // Enregistrer la collectionGroup dans la base de données
      await listeCollection.save();
  
      console.log("listeCollection créée avec succès", collectionData);
    } catch (error) {
      console.error(
        "Erreur lors de la sauvegarde de la listeCollection :",
        error
      );
    }
  };

  try {
    // Supprimer les anciennes données de la collection
    await Fournisseur.deleteMany();

    // Insérer les nouvelles données dans la collection
    await Fournisseur.create(data);
    //recreer la collection listFourn
    await createListFourn();

    console.log("Données sauvegardées dans la collection :", collectionName);
    res.sendStatus(200);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de fournisseurs new :", error);
    res.sendStatus(500);
  }
};

export default { saveFournisseur, getFournisseurs };
