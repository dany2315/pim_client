import express  from "express";
import {saveFournisseur,getFournisseurs} from "../controller/fournisseurController.js"
const router = express.Router();

//http://localhost:5000/api/fournisseur
router.get('/',getFournisseurs)
router.post('/new',saveFournisseur)

export default router