import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({ path: '.env.local' });

export default new DataSource({
    type: 'postgres',
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    username: 'root',
    password: 'root',
    database: 'postgres',
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/database/migrations/*.ts'],
    migrationsTableName: 'migrations',
});
