import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
  type: 'mysql',
  url: process.env.MYSQL_URI || 'mysql://root:root@localhost:3306/eventy',
  database: process.env.MYSQL_DB || 'eventy',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
  entities: ['src/db/typeorm/entity/*.ts'],
};
