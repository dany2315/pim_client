import mongoose from "mongoose";


    const listShema = new mongoose.Schema({
        
          collectionName: String,
          fieldNames: [String],
        },
      );

    


const ListFourn = mongoose.model('listeCollection',listShema)


export default ListFourn