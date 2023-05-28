import mongoose from "mongoose";
import { Schema } from "mongoose";

const createDynamicModel = (collectionName, keys) => {
    const schemaFields = {};
    keys.forEach((key) => {
      schemaFields[key] = {
        type: Schema.Types.Mixed,
      };
    });
  
    const dynamicSchema = new Schema(schemaFields);
    const dynamicModel = mongoose.model(collectionName, dynamicSchema);
  
    return dynamicModel;
  };
  export default createDynamicModel