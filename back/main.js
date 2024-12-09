import { createConnection } from 'mysql2/promise';
const port = 8080 
const hostname = 'localhost';

async function main() {
    try {
        const connection = await createConnection({
            port : 3306,
            hostname : 'localhost',
            password : '00000000',
            database : 'recrutements'
        });

        const server = create

        server.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        })
    }
    catch(error){
        console.log(error)
    }
}

main();
