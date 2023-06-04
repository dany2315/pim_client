import mongoose from "mongoose";
import createDynamicModel from "../models/modelFournisseur.js";
import ListFourn from "../models/modelListFourn.js";

export const getFournisseurs = async (req, res) => {
  try {
    
  } catch (error) {}
};

export const reSaveFournisseur = async (req,res)=>{

try {
  
} catch (error) {
  
}
};

export const saveFournisseur = async (req, res) => {
  const { collectionName, data , updatedKeyNames} = req.body;

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
      await ListFourn.deleteMany();

      // Récupérer les noms de toutes les collections et filtrer pour recuperer que du schema Fournisseur
      const collections = await mongoose.connection.db
        .listCollections()
        .toArray();
      const filteredCollections = collections.filter((collection) => {
        return (
          collection.name !== "user" && collection.name !== "listecollections"
        );
      });

      const listes = await Promise.all(
        filteredCollections.map(async (collection) => {
          const name = collection.name;

          const count = await mongoose.connection.db
            .collection(name)
            .countDocuments();
          const document = await mongoose.connection.db
            .collection(name)
            .findOne({});

          const fieldNames =
            document !== null && typeof document === "object"
              ? Object.keys(document)
              : [];
          

          if (fieldNames.length > 0) {
            const fourn = {
              collectionName: name,
              documentCount: count,
              fieldNames: fieldNames,
              updatedKeyNames:updatedKeyNames
            };

            return fourn;
          }
          null;
          
        })
      );


      await ListFourn.insertMany(listes);

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
