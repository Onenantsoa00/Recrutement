import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import pool from './config/db.js'; /* 
import mySqlPool from './config/db.js' */
import loginRt from './routes/loginRt.js'
import aboutRt from './routes/ProposRoutes/RoutePropos.js'
import clientRt from './routes/ProposRoutes/RouteClient.js'
import routeListeAt from './routes/ListeAttentRoutes/RouteListeAt.js'
import routeHome from './routes/HomeRoutes/RouteHome.js'
import routeSuivi from './routes/SuiviRoutes/RouteSuivi.js'
import cors from 'cors'

//configuration dotenv
dotenv.config();

//rest objet
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routesjs

app.use('/api/v1/administration', loginRt)
app.use('/api/v1/a_propos', aboutRt)
app.use('/api/v1/clients', clientRt)
app.use('/api/v1/listeAttent',routeListeAt)
app.use('/api/v1/home', routeHome)
app.use('/api/v1/suivi', routeSuivi)

/* app.get('/maka', (req, res) => {
    const data = ["nom", "prenom","email"]
    res.status(200).send(data)
})
 */

//port 
const PORT = process.env.PORT || 3000;

//condition d'ecoute
pool.query("SELECT 1")
    .then(() => {
        //mysql
    console.log('Connected to the database') ;
    //listen
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${process.env.PORT}`)
    })
})
    .catch((error) => {
        console.log(error)
})

