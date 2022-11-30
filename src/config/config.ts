const {
  STAGE,
  DATABASE_NAME,
  SECRETS_MANAGER_KEY,
  APPCONFIG_APP_ID,
  APPCONFIG_ENV_ID,
  APPCONFIG_CONFIG_PROFILE_ID,
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
  appConfigParameters: {
    applicationId: APPCONFIG_APP_ID,
    environmentId: APPCONFIG_ENV_ID,
    configurationProfileId: APPCONFIG_CONFIG_PROFILE_ID
  },
  databaseName: DATABASE_NAME,
  rdsSecretsKey: SECRETS_MANAGER_KEY
};
