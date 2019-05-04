import { ILoggingStrategy, Severity } from '../interfaces/ILoggingStrategy';

export class ConsoleLogging implements ILoggingStrategy {
  public log(severity: Severity, msg: string) {
    console[severity](msg);
  }
}
