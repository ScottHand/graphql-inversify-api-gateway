const {
  STAGE,
  DATABASE_NAME,
  SECRETS_MANAGER_KEY
} = process.env;

export const config = {
  appName: 'movie-service',
  stage: STAGE,
  log: {
    level: 'debug'
  },
  awsConfig: {
    region: 'us-east-1',
    retryDelayOptions: {base: 100}
  },
  databaseName: DATABASE_NAME,
  rdsSecretsKey: SECRETS_MANAGER_KEY
};
