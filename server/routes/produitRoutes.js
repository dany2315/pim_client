import express  from "express";
import { getAllProduits } from "../controller/produitController.js"

const router = express.Router();

//http://localhost:5000/api

router.get('/',getAllProduits);



export default router