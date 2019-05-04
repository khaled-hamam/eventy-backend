export type Severity = 'info' | 'debug' | 'warn' | 'error';

export interface ILoggingStrategy {
  log(severity: Severity, msg: string);
}
