import { ILoggingStrategy } from './interfaces/ILoggingStrategy';
import { LoggerConfig } from './interfaces/LoggerConfig';
import { ConsoleLogging } from './strategies/ConsoleLogging';

export class Logger {
  private static _instance: Logger;
  private strategy: ILoggingStrategy;

  public static get instance(): Logger {
    if (this._instance === undefined) {
      this._instance = new Logger();
    }
    return this._instance;
  }

  public configure(config: LoggerConfig) {
    Object.assign(this, {
      strategy: new ConsoleLogging(),
      ...config,
    });
  }

  public debug(msg: string) {
    this.strategy.log('debug', this.format(msg));
  }

  public warn(msg: string) {
    this.strategy.log('warn', this.format(msg));
  }

  public error(msg: string) {
    this.strategy.log('error', this.format(msg));
  }

  public info(msg: string) {
    this.strategy.log('info', this.format(msg));
  }

  private format(msg: string): string {
    return msg;
  }
}
