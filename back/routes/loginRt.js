import express from 'express';
import loginCont from '../controller/loginCont.js';
import authenticationToken from '../authWebToken.js';

//router object
const router = express.Router();

//routes

//login
router.post('/login',loginCont.login)

//show data with id
router.get('/login/:id',authenticationToken ,loginCont.getAdministrationById )

//create admin with POST
router.post('/admin', loginCont.signup)

//Update admin
router.put('/adminupdate/:id' ,authenticationToken , loginCont.updateAdmin)

//Delete admin
router.delete('/admindelete/:id',authenticationToken , loginCont.deleteAdmin)

export default router