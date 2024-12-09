import db from '../../config/db.js'

const nombreClient = async(req, res) =>{
    try{
        const result = await db.query("SELECT * FROM client")
        const data = result.rows
        /* console.log(data.length) */
        if (!data){
            return res.status(404).send({
                success: false,
                message: 'No clients found',
            })
        }
        res.status(200).send({
            success: true,
            message: 'Clients successfully fetched',
            data: data,
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

const listePost = async(req, res) =>{
    try {
        const result = await db.query(`SELECT * FROM post`)
        const data = result.rows

        if(!data){
            return res.status(404).send({
                success: false,
                message: 'No posts found',
            })
        }
        res.status(200).send({
            success: true,
            message: 'Posts successfully fetched',
            data: data,
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


export default {nombreClient, listePost} 