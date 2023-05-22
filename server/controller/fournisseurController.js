import mongoose from "mongoose";
import { Schema } from "mongoose";

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

  // Créer un schéma Mongoose dynamique en fonction du nom de la collection et des donnée
  const schemaFields = {};
  keys.forEach((key) => {
    schemaFields[key] = {
      type: Schema.Types.Mixed, // Type générique pour stocker n'importe quelle valeur
    };
  });

  const dynamicSchema = new Schema(schemaFields);
  const dynamicModel = mongoose.model(collectionName, dynamicSchema)


  try {

    // Supprimer les anciennes données de la collection
    await dynamicModel.deleteMany();

    // Insérer les nouvelles données dans la collection
    await dynamicModel.create(data);

    console.log("Données sauvegardées dans la collection :", collectionName);
    res.sendStatus(200);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des données :", error);
    res.sendStatus(500);
  }
};

export default { saveFournisseur };
