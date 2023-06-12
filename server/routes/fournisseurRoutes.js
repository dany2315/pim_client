import express  from "express";
import {getFournisseurs,getPlein,createFournisseur,createListFourn,reSaveFournisseur ,deleteContenu} from "../controller/fournisseurController.js"
const router = express.Router();

//http://localhost:5000/api/fournisseur
router.get('/',getFournisseurs);
router.get('/:id',getPlein);
router.post('/new',createFournisseur); // Appel CREE fournisseur dans la db
router.post('/newFourn',createListFourn); //Appel CREE fourn dans listFourn
router.post('/resave',reSaveFournisseur); //Appel CREE fourn dans listFourn
router.post('/deleteId',deleteContenu);

export default router