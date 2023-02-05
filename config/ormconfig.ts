import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'pgsql',
  port: 5432,
  username: 'user',
  password: 'r00tr00t',
  database: 'db',
  entities: ['src/**/**.entity.{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data source initialized.');
  })
  .catch((err) => {
    console.log(err.message);
  });
