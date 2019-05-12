import { ClientOpts } from 'redis';

export const config: ClientOpts = {
  url: process.env.REDIS_URL || 'redis://localhost:6379',
};
