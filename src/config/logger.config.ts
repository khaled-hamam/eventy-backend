import { LoggerConfig } from '@utils/logger/interfaces/LoggerConfig';
import { ConsoleLogging } from '@utils/logger/strategies/ConsoleLogging';

export const config: LoggerConfig = {
  strategy: new ConsoleLogging(),
};
