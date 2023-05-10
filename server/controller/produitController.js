
export const getAllProduits = (req,res) =>{
    try {
        console.log(req.body);
        const allProduits = req.body;
      res.status(200).send(allProduits);
    } catch (error) {
       res.status(500).send(error);
    }

}

export default {getAllProduits}