import express from "express";
import HomeCont from "../../controller/HomeController/HomeCont.js"
import authenticationToken from '../../authWebToken.js';

const router = express.Router();

router.get('/dashboard',authenticationToken, HomeCont.nombreClient)
router.get('/dashdoardListPost', authenticationToken, HomeCont.listePost)

export default router