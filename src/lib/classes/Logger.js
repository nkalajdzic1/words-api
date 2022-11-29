export class Logger {
  static info = (val) => console.log(`[info]: ${val}`);

  static error = (val) => console.error(`[error]: ${val}`);

  static warning = (val) => console.warn(`[warning]: ${val}`);

  static debug = (val) => console.debug(`[debug]: ${val}`);
}
