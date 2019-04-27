import { createConnection, ConnectionOptions } from 'typeorm';
import { DatabaseAdapter } from '@db/interfaces/DatabaseAdapter';

export class TypeORMAdapter implements DatabaseAdapter {
  async connect(config: ConnectionOptions) {
    return await createConnection(config);
  }
}
