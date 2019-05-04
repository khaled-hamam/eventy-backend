import { ILoggingStrategy, Severity } from '../interfaces/ILoggingStrategy';

export class FileLogging implements ILoggingStrategy {
  log(severity: Severity, msg: string) {}
}
