export const config = {
  appName: 'movie-service',
  log: {
    level: 'debug'
  },
  awsConfig: {
    region: 'us-east-1',
    retryDelayOptions: {base: 100}
  }
};
