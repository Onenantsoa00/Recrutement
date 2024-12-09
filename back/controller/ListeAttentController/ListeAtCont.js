import db from "../../config/db.js";

const getStatus = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM etapes");
    const data = result.rows;
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No status found",
      });
    }
    res.status(200).send({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting status",
      error: error,
    });
  }
};

const getListeAttente = async (req, res) => {
  try {
    const result = await db.query(`
            SELECT
            client.id AS client_id,
            post.id AS post_id,
            postuler.id,
            post.nom_post,
            client.nom_clt,
            client.contact,
            post.fin_cand,
            etapes.nom_etape
            FROM
            postuler
            INNER JOIN client ON postuler.id_clt = client.id
            INNER JOIN post ON postuler.id_post = post.id
            INNER JOIN etapes ON client.id_etape = etapes.id;
        `);
    const data = result.rows; // Utilisez rows pour accéder au résultat

    console.log("°°°°°°°°°°°", data);
    /* SELECT
    postuler.id,
    post.nom_post,
    client.nom_clt,
    client.contact,
    post.fin_cand
FROM
    postuler
INNER JOIN client ON postuler.id_clt = client.id
INNER JOIN post ON postuler.id_post = post.id;
 */

    /* 

*/
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No list found",
      });
    }
    res.status(200).send({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting list",
      error: error,
    });
  }
};
const deleteList = async (req, res) => {
  try {
    const listId = req.params.id;

    if (!listId) {
      return res.status(400).send({
        success: false,
        message: "No list ID provided",
      });
    }

    // Utiliser $1 pour le paramètre dans PostgreSQL
    const result = await db.query("DELETE FROM postuler WHERE id = $1", [
      listId,
    ]);

    // Vérifier si une ligne a été supprimée
    if (result.rowCount === 0) {
      return res.status(404).send({
        success: false,
        message: "List not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "List deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error deleting list",
      error: error.message,
    });
  }
};

export default { getStatus, getListeAttente, deleteList };
