import { Pool } from "pg";

export const db = new Pool({
    connectionString: "postgresql://neondb_owner:npg_loDzaL08AUSg@ep-rough-art-a401d977-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});

db.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión a la base de datos exitosa.');
    }
});