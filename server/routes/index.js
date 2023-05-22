import express, { Router }  from "express";
import produitRoutes from "./produitRoutes.js";
import fournisseurRoutes from "./fournisseurRoutes.js"

const router = express.Router();

//http://localhost:5000/api

router.use('/',produitRoutes);
router.use('/fournisseur',fournisseurRoutes)
router.post('auth',)


export default router


