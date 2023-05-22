import express  from "express";
import {saveFournisseur} from "../controller/fournisseurController.js"
const router = express.Router();

//http://localhost:5000/api/fournisseur

router.post('/',saveFournisseur)

export default router