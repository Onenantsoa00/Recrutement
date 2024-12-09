import db from '../../config/db.js';

const createClients = async (req, res) => {
    try {
        const { id_post, nom_clt, prenom_clt, email, contact } = req.body;

        console.log(nom_clt);
        console.log(nom_clt, prenom_clt, email, contact);

        if (!nom_clt || !prenom_clt || !email || !contact) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all the required fields'
            });
        }

        // Insertion dans la table client avec RETURNING id
        const result = await db.query(
            `INSERT INTO client(nom_clt, prenom_clt, email, contact) VALUES ($1, $2, $3, $4) RETURNING id`,
            [nom_clt, prenom_clt, email, contact]
        );

        // Récupération de l'id du client inséré
        const clientId = result.rows[0].id;

        console.log('---------------', clientId);

        // Insertion dans la table postuler
        const postulerResult = await db.query(
            `INSERT INTO postuler (id_post, id_clt) VALUES ($1, $2)`,
            [id_post, clientId]
        );

        console.log('---------------', postulerResult);

        res.status(200).send({
            success: true,
            message: 'Client created successfully',
            clientId // Retourner l'ID du client pour confirmation
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error creating the client or postuler',
            error
        });
    }
};

export default { createClients };
