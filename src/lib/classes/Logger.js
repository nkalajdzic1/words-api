export class Logger {
  static info = (val) => console.log(`[info]: ${val}`);

  static error = (val) => console.error(`[error]: ${val}`);

  static logFullError = (error) => {
    console.error(`[error]: ${error.message}`);
    console.log(`[error name]: ${error.name}`);
    console.error(`[stack trace]: ${error.stack}`);
  };

  static warning = (val) => console.warn(`[warning]: ${val}`);

  static debug = (val) => console.debug(`[debug]: ${val}`);
}
