import express  from "express";
import produitRoutes from "./produitRoutes.js"

const router = express.Router();

//http://localhost:5000/api

router.use('/',produitRoutes);
router.post('auth',)


export default router


