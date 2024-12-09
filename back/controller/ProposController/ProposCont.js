import db from '../../config/db.js';
const createProps = async(req, res) => {
    try {
        const {nom_post, criteres, exp_att, cert_nec, age_req, fin_cand} = req.body;

        if (!nom_post || !criteres || !exp_att || !cert_nec || !age_req || !fin_cand) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all the required fields'
            });
        }

        const result = await db.query(
            `INSERT INTO post (nom_post, criteres, exp_att, cert_nec, age_req, fin_cand) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [nom_post, criteres, exp_att, cert_nec, age_req, fin_cand]
        );
        const data = result.rows[0]; // Utilisez rows pour accéder au résultat inséré

        res.status(201).send({
            success: true,
            message: 'Post created successfully',
            data
        });
    } catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error creating the post',
            error: err
        });
    }
}

const getProposInClientRequest = async(req, res) =>{
    try{
        const result = await db.query("SELECT * FROM post");
        const data = result.rows; // Accédez à la propriété rows

        if (data.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No posts found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Posts successfully fetched',
            data,
            total: data.length
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error getting posts',
            error: err
        });
    }
}
const getProposById = async(req, res) => {
    try {
        const proposById = req.params.id;
        if (!proposById) {
            return res.status(404).send({ 
                success: false,
                message: 'No Propos with this id'
            });
        }
        
        const result = await db.query(`SELECT * FROM post WHERE id = $1`, [proposById]);
        const data = result.rows; // Accédez à rows

        if (data.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No post found with this id'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Post successfully fetched',
            data
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


export default {createProps, getProposInClientRequest, getProposById}