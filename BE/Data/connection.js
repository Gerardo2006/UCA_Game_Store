import { Pool } from "pg";

export const db = new Pool({
    connectionString: "postgresql://neondb_owner:npg_8wLhgTHiZ4EG@ep-shy-hill-ad961y5o-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});

db.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión a la base de datos exitosa.');
    }
});