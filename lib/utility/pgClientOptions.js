/* 
    Questi dati sensibili vanno settati come variabili di ambiente. Su Vercel le variabili di ambiente
    sono criptate e possiamo andarle a leggere con questa sintassi:
    process.env.NOME_VARIABILE
*/
const client_user = process.env.DB_CLIENT_USER;
const client_host = process.env.DB_CLIENT_HOST;
const client_db = process.env.DB_CLIENT_DBNAME;
const client_password = process.env.DB_CLIENT_PASSWORD;
const client_port = process.env.DB_CLIENT_PORT;
const clientOpt = {
    user: client_user,
    password: client_password,
    host: client_host,
    port: client_port,
    database: client_db,
}
export default clientOpt;