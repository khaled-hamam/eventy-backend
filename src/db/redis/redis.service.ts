import { Injectable } from '@nestjs/common';
import { RedisClient, createClient } from 'redis';
import { config } from '@config/redis.config';
import { promisify } from 'util';

@Injectable()
export class RedisService {
  private static _instance: RedisService;
  public static get instance() {
    if (this._instance === undefined) {
      this._instance = new RedisService();
    }
    return this._instance;
  }

  private _client: RedisClient;
  public get client() {
    return this._client;
  }

  public get defaults() {
    return {
      duration: 60 * 2,
    };
  }

  private constructor() {
    this._client = createClient(config);
    this._client.set = promisify(this._client.set).bind(this._client);
    this._client.get = promisify(this._client.get).bind(this._client);

    // TODO: LOG ON CONNECTION / ERROR
  }
}
