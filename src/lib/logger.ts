export class Logger {
  log(className: string, methodName: string, message: string, data?: object) {
    const dataString = data ? `:\n${JSON.stringify(data)}` : '';
    console.log(`[INFO][${className}:${methodName} ${message} ${dataString}`);
  }

  error(className: string, methodName: string, message: Error | string) {
    console.log(`[ERROR][${className}:${methodName}] ${message}`);
  }
}
