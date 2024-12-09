import express from "express";
import ClientCont from "../../controller/ProposController/ClientCont.js";
import authenticationToken from '../../authWebToken.js';

const router = express.Router();

//create client
router.post('/createClient',authenticationToken ,ClientCont.createClients);

export default router