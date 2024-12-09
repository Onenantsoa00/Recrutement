import express from "express";
import propsCount from "../../controller/ProposController/ProposCont.js"
import authenticationToken from '../../authWebToken.js';

const router = express.Router();

//Create a new Propos
router.post('/createProps',authenticationToken, propsCount.createProps)
router.get('/getProposInClient',authenticationToken, propsCount.getProposInClientRequest)
router.get('/createClient/:id',authenticationToken, propsCount.getProposById);
export default router