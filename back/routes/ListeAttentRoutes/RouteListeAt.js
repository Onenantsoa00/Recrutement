import express from "express";
import ListeAtCont from "../../controller/ListeAttentController/ListeAtCont.js";
import authenticationToken from '../../authWebToken.js';

const router = express.Router();

router.get('/getStatus',authenticationToken, ListeAtCont.getStatus)

router.get('/getListeAttente',authenticationToken, ListeAtCont.getListeAttente)

router.delete('/deleteListeAttente/:id',authenticationToken, ListeAtCont.deleteList)

export default router