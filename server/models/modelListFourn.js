import mongoose from "mongoose";


    const listShema = new mongoose.Schema({
        collections: [{
          collectionName: String,
          documentCount: Number,
          fieldNames: [String],
        }],
      });

    


const ListFourn = mongoose.model('listeCollection',listShema)


export default ListFourn