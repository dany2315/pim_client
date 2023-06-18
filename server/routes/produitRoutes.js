import express  from "express";
import { getProduits } from "../controller/produitController.js"

const router = express.Router();

//http://localhost:5000/api/produits

router.get('/:reference',getProduits);



export default router