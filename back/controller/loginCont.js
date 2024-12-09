/* import db from '../config/db.js';

const getAdministration = async(rep, res) => {
    try {
        const [results] = await db.query("SELECT * FROM administration");
        if(!results){
            return res.status(404).send({ 
                success: false,     
                message: 'No administration found' 
            });
        }
        res.status(200).send({
            success: true,
            message: 'Administration  successfully',
            data: results,
            total : results.length
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ 
            message: "Error" ,
            success: false,
            error
        });
    }
};


const getAdministrationById = async(req, res) =>{
    try{
        const administrationId = req.params.id
        if(!administrationId){
            return res.status(400).send({ 
                success: false, 
                message: 'No administration ID provided' 
            });
        }
         //const results = await db.query('SELECT * FROM administration WHERE id = ' + administrationId) 

        const dt = await db.query(`SELECT * FROM administration WHERE id = ? `, [administrationId])
        if (!dt) {
            return dt.status(404).send({
                success : false,
                message: 'No administration found with that ID'
            })
        }
        res.status(200).send({
            success: true,
            message: 'Administration  successfully',
            data: dt[0]
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({ 
            message: "Error",
            success: false,
            error
        });
    }
}

//CREATE admin
const createAdmin = async(req, res) => {
    try{

        const { name , firstname , email, password} = req.body

        console.log( name , firstname , email , password )


        if(!name || !firstname ||!email ||!password){
            return res.status(500).send({ 
                success: false, 
                message: 'Please provide all the required fields' 
            });
        }
        const data = await db.query(`INSERT INTO administration (nom, prenom, email, pwd) VALUES ( ? , ? , ? , ? )`,[name, firstname, email, password])
        if (!data){
            return res.status(404).send({ 
                success: false, 
                message: 'not found' 
            });
        }
        res.status(200).send({
            success: true,
            message: 'Admin created successfully',
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({ 
            message: "Error",
            success: false,
            error
        });
    }
} 

//update admin
const updateAdmin = async(req, res) =>{
    try{
        const adminId = req.params.id;
        if (!adminId){
            return res.status(400).send({ 
                success: false, 
                message: 'No administration ID provided' 
            });
        }
        const{name, firstname, email, psw, id}= req.body

        const data = await db.query(`UPDATE administration SET nom = ?, prenom = ? , email = ?, pwd = ? WHERE id = ?`, [name, firstname, email, psw, id])
        if (!data) {
            return res.status(404).send({ 
                success: false, 
                message: 'No administration found with that ID' 
            });
        }
        res.status(200).send({
            success: true,
            message: 'Admin updated successfully',
            data
        }); 
    }
    catch(errors){
        console.log(errors);
        res.status(500).send({ 
            message: "Error",
            success: false,
            errors
        });
    }
}
const deleteadmin = async(req, res)=> {
    try{
        const adminid = req.params.id;
        if (!adminid){
            return res.status(400).send({ 
                success: false, 
                message: 'No administration ID provided' 
            });
        }
        await db.query(
            `DELETE FROM administration WHERE id = ? `, [adminid]
        );
        res.status(200).send({
            success: true,
            message: 'Admin deleted successfully',
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({ 
            message: "Error",
            success: false,
            error
        });
    }
}

export default {getAdministration, getAdministrationById, createAdmin, updateAdmin, deleteadmin} */

import db from '../config/db.js';
import { generateToken } from '../utils.js';
import bcrypt from 'bcrypt';
const saltRounds = 10; 

// Récupérer toutes les administrations

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier que l'email et le mot de passe sont fournis
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both email and password'
            });
        }

        // Récupérer l'utilisateur par email
        const { rows: results } = await db.query('SELECT email, pwd FROM administration WHERE email = $1', [email]);
        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Authentication failed: no user found'
            });
        }

        const admin = results[0];
        
        // Comparer le mot de passe fourni avec le mot de passe crypté
        const isPasswordValid = await bcrypt.compare(password, admin.pwd);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Authentication failed: invalid password'
            });
        }

        // Génération du token
        const token = generateToken({ email: admin.email }); // Passer un objet comme payload

        res.status(200).json({
            success: true,
            message: 'Authentication successful',
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Récupérer une administration par ID
const getAdministrationById = async (req, res) => {
    try {
        const administrationId = req.params.id;
        
        if (!administrationId) {
            return res.status(400).send({
                success: false,
                message: 'No administration ID provided'
            });
        }
        const { rows: dt } = await db.query('SELECT * FROM administration WHERE id = $1', [administrationId]);
        if (dt.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No administration found with that ID'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Administration successfully retrieved',
            data: dt[0],
            
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error retrieving administration',
            error: error.message
        });
    }
};

// Créer un nouvel administrateur

const signup = async (req, res) => {
    try {
        const data = req.body;
        const { name, firstname, email, password } = data;

        if (!name || !firstname || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all the required fields'
            });
        }

        // Crypter le mot de passe
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Enregistrer l'utilisateur avec le mot de passe crypté
        const token = generateToken(data);
        await db.query(`INSERT INTO administration (nom, prenom, email, pwd) VALUES ($1, $2, $3, $4)`, [name, firstname, email, hashedPassword]);

        res.json({
            success: true,
            message: 'Admin created successfully',
            token: token,
            status: 201
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error creating admin',
            error: error.message
        });
    }
};
// Mettre à jour un administrateur
const updateAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        if (!adminId) {
            return res.status(400).send({
                success: false,
                message: 'No administration ID provided'
            });
        }
        const { name, firstname, email, psw } = req.body;
        const { rowCount } = await db.query('UPDATE administration SET nom = $1, prenom = $2, email = $3, pwd = $4 WHERE id = $5', [name, firstname, email, psw, adminId]);
        if (rowCount === 0) {
            return res.status(404).send({
                success: false,
                message: 'No administration found with that ID'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Admin updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error updating admin',
            error: error.message
        });
    }
};

// Supprimer un administrateur
const deleteAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        if (!adminId) {
            return res.status(400).send({
                success: false,
                message: 'No administration ID provided'
            });
        }
        const { rowCount } = await db.query('DELETE FROM administration WHERE id = $1', [adminId]);
        if (rowCount === 0) {
            return res.status(404).send({
                success: false,
                message: 'No administration found with that ID'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Admin deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error deleting admin',
            error: error.message
        });
    }
};

export default { login, getAdministrationById, signup, updateAdmin, deleteAdmin };
