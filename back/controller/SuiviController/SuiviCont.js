import db from '../../config/db.js';
const insertInSuivi = async (req, res) => {
    try{
        const { id_clt, id_post} = req.body;
        if(!id_clt || !id_post){
            return res.status(400).send({
                success: false,
                message: 'Please provide all the required fields'
            });
        }
        await db.query(`INSERT INTO suivri (id_clt, id_post) VALUES ($1,$2)`, [id_clt, id_post]);
        res.status(200).send({
            success: true,
            message: 'Suivi added successfully'
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

const getSuivi = async(req, res) => {
    try{
        const result = await db.query(`
            SELECT
            client.id AS client_id,
            suivri.id,
            post.nom_post,
            client.nom_clt,
            client.contact,
            post.fin_cand,
            etapes.nom_etape
            FROM
            suivri
            INNER JOIN client ON suivri.id_clt = client.id
            INNER JOIN post ON suivri.id_post = post.id
            INNER JOIN etapes ON client.id_etape = etapes.id;
        `)
        const data = result.rows;
        if(!data){
            return res.status(404).send({
                success: false,
                message: 'No suivi found'
            })
        }
        res.status(200).send({
            success: true,
            data: data
        })
        
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

const showOneSuivi = async(req, res) => {
    try {
        const idSuivi = req.params.id
        if(!idSuivi){
            return res.status(404).send({
                success: false,
                message: 'No suivi ID provided'
            })
        }
        const {rows: data} = await db.query(`
            SELECT
            client.id AS client_id,
            post.nom_post,
            client.nom_clt,
            client.contact,
            post.fin_cand,
            etapes.nom_etape,
            etapes.id AS etapes_id
            FROM
            suivri
            INNER JOIN client ON suivri.id_clt = client.id
            INNER JOIN post ON suivri.id_post = post.id
            INNER JOIN etapes ON client.id_etape = etapes.id
            WHERE suivri.id = $1;`,[idSuivi])

            if(data.length === 0){
                return res.status(404).send({
                    success: false,
                    message: 'No suivi found with this id'
                })
            }
            res.status(200).send({
                success: true,
                message: 'Suivi successfully fetched',
                data: data[0]
            })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

const updateSuivi = async(req, res) =>{
    try {
        const idRoute = req.params.id;
        const { idSuivi,id_etape } = req.body;

        console.log("//////:", idRoute, idSuivi,id_etape);
        

        if (!idSuivi || !id_etape) {
            return res.status(400).send({
                success: false,
                message: 'ID de suivi ou nom d\'étape manquant'
            });
        }

        const result = await db.query(`
            UPDATE client
            SET id_etape = $1
            WHERE id = $2   ;
        `, [id_etape, idSuivi]);

        if (result === 0) {
            return res.status(404).send({
                success: false,
                message: 'Suivi non trouvé'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Suivi mis à jour avec succès',
            data: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Erreur interne du serveur'
        });
    }
}

const showOneDataClient = async(req, res) => {
    try{
        const idClient = req.params.id
        if(!idClient){
            return res.status(404).send({
                success: false,
                message: 'No client ID provided'
            })
       }
       const result = await db.query('Select client.*, etapes.nom_etape from client INNER JOIN etapes ON client.id_etape = etapes.id where client.id = $1', [idClient])

       if(result.rowCount === 0) {
        return result.status(400).send({
            success: false,
            message: 'No client found with this id'
        })
       }
       res.status(200).send({
           success: true,
           message: 'Client successfully fetched',
           data: result.rows[0]
       })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

const deleteSuivi = async(req, res) => {
    try{
        const idSuiviDelete = req.params.id
        if(!idSuiviDelete){
            return res.status(400).send({
                success: false,
                message: 'No suivi ID provided'
            })
        }

        const suiviDelete = await db.query(`Delete from suivri where id = $1`,[idSuiviDelete])
        if(suiviDelete === 0){
            return res.status(404).send({
                success: false,
                message: 'No suivi found with this id'
            })
        }
        
        res.status(200).send({
            success: true,
            message: 'Suivi deleted successfully'
        })
    }
    catch(error){
        return[
            res.status(500).send({
                success: false,
                message: 'Error deleting suivi',
                error: error.message
            })
        ]
    }
}
export default {insertInSuivi, getSuivi, showOneSuivi, updateSuivi, showOneDataClient, deleteSuivi}