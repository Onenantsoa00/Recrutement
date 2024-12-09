import express from 'express';
import suiviCont from '../../controller/SuiviController/SuiviCont.js'
import authenticationToken from '../../authWebToken.js';

const routeur = express.Router();

routeur.post('/insertSuivi',authenticationToken,suiviCont.insertInSuivi)

routeur.get('/getSuivi',authenticationToken ,suiviCont.getSuivi)

routeur.get('/getOneSuivi/:id',authenticationToken, suiviCont.showOneSuivi)

routeur.put('/updateSuivi/:id',authenticationToken, suiviCont.updateSuivi)

routeur.get('/showOneClient/:id',authenticationToken,suiviCont.showOneDataClient)

routeur.delete('/deleteSuivi/:id',authenticationToken ,suiviCont.deleteSuivi)

export default routeur